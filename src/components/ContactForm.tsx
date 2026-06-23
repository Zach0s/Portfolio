"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Une erreur est survenue.");
        setStatus("error");
      } else {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }
    } catch {
      setErrorMsg("Impossible de contacter le serveur. Réessayez plus tard.");
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl text-sm transition-all outline-none focus:ring-2 focus:ring-[var(--accent)] placeholder:text-[var(--muted)]";
  const inputStyle = {
    background: "var(--accent-subtle)",
    border: "1px solid var(--glass-border)",
    color: "var(--fg)",
  } as React.CSSProperties;

  return (
    <section id="contact" className="py-20 px-6" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block mb-3">Contactez-moi</h2>
          <p className="text-base" style={{ color: "var(--muted)" }}>
            Une question, une opportunité ?{" "}
            <a
              href="mailto:zacharie.rodde@gmail.com"
              style={{ color: "var(--accent)" }}
              className="hover:underline font-medium"
            >
              zacharie.rodde@gmail.com
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="glass rounded-2xl p-8 max-w-lg mx-auto"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg"
                style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-bold text-xl mb-1" style={{ color: "var(--fg)" }}>
                Message envoyé !
              </p>
              <p className="text-sm mb-5" style={{ color: "var(--muted)" }}>
                Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-medium hover:underline cursor-pointer"
                style={{ color: "var(--accent)" }}
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    Nom
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold" style={{ color: "var(--fg)" }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  style={inputStyle}
                />
              </div>

              {status === "error" && (
                <p
                  className="text-sm px-4 py-2.5 rounded-xl"
                  style={{ color: "#dc2626", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)" }}
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 cursor-pointer shadow-lg mt-1"
                style={{ background: "linear-gradient(135deg, var(--accent), var(--accent2))" }}
              >
                {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
