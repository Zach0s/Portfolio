// Compteurs à durée de vie pour l'anti-spam du formulaire de contact.
// Les instances serverless ne partagent pas leur mémoire : en production on passe par
// Upstash Redis (REST), et la mémoire locale ne sert que de repli (dev, Redis absent ou en panne).

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

type Entry = { value: number; expiresAt: number };
const memory = new Map<string, Entry>();

function memoryGet(key: string) {
  const entry = memory.get(key);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    memory.delete(key);
    return null;
  }
  return entry;
}

function sweepMemory() {
  if (memory.size < 1000) return;
  const now = Date.now();
  for (const [key, entry] of memory) if (entry.expiresAt <= now) memory.delete(key);
}

async function redis(commands: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const results = (await res.json()) as { result?: unknown; error?: string }[];
  return results.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

async function withFallback<T>(remote: () => Promise<T>, local: () => T): Promise<T> {
  if (REDIS_URL && REDIS_TOKEN) {
    try {
      return await remote();
    } catch (err) {
      console.error("[contact] Redis indisponible, repli en mémoire :", err);
    }
  }
  sweepMemory();
  return local();
}

/** Incrémente un compteur qui expire `ttlSeconds` après sa création, et renvoie sa valeur. */
export function increment(key: string, ttlSeconds: number) {
  return withFallback(
    async () => {
      const [, count] = await redis([
        ["SET", key, 0, "EX", ttlSeconds, "NX"],
        ["INCR", key],
      ]);
      return Number(count);
    },
    () => {
      const entry = memoryGet(key);
      if (entry) return ++entry.value;
      memory.set(key, { value: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
      return 1;
    },
  );
}

/** Pose la clé si elle n'existe pas encore. Renvoie false si elle existait déjà. */
export function setIfAbsent(key: string, ttlSeconds: number) {
  return withFallback(
    async () => {
      const [result] = await redis([["SET", key, 1, "EX", ttlSeconds, "NX"]]);
      return result === "OK";
    },
    () => {
      if (memoryGet(key)) return false;
      memory.set(key, { value: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
      return true;
    },
  );
}

/** Pose la clé pour `ttlSeconds`, en écrasant une éventuelle valeur précédente. */
export function set(key: string, ttlSeconds: number) {
  return withFallback(
    async () => {
      await redis([["SET", key, 1, "EX", ttlSeconds]]);
    },
    () => {
      memory.set(key, { value: 1, expiresAt: Date.now() + ttlSeconds * 1000 });
    },
  );
}

export function exists(key: string) {
  return withFallback(
    async () => {
      const [result] = await redis([["EXISTS", key]]);
      return Number(result) > 0;
    },
    () => memoryGet(key) !== null,
  );
}

/** Supprime la clé (par ex. pour libérer une empreinte quand l'envoi a échoué). */
export function remove(key: string) {
  return withFallback(
    async () => {
      await redis([["DEL", key]]);
    },
    () => {
      memory.delete(key);
    },
  );
}
