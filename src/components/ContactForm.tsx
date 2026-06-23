"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

  const inputStyle = {
    background: "var(--bg)",
    border: "1px solid var(--card-border)",
    color: "var(--fg)",
    outline: "none",
  } as React.CSSProperties;

  return (
    <section id="contact" className="py-16 px-6 max-w-5xl mx-auto" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: "var(--fg)" }} className="text-3xl font-bold mb-2">
          Contactez-moi
        </h2>
        <p style={{ color: "var(--muted)" }} className="text-sm mb-8">
          Répondez-moi par email à{" "}
          <a
            href="mailto:zacharie.rodde@gmail.com"
            style={{ color: "var(--accent)" }}
            className="hover:underline"
          >
            zacharie.rodde@gmail.com
          </a>
          , ou utilisez le formulaire ci-dessous.
        </p>

        <div
          style={{
            background: "var(--card)",
            border: "1px solid var(--card-border)",
            boxShadow: "var(--shadow)",
          }}
          className="rounded-2xl p-8 max-w-xl"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div
                style={{ color: "#16a34a", background: "#f0fdf4", border: "1px solid #bbf7d0" }}
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p style={{ color: "var(--fg)" }} className="font-semibold text-lg mb-1">
                Message envoyé !
              </p>
              <p style={{ color: "var(--muted)" }} className="text-sm">
                Je vous répondrai dans les plus brefs délais.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{ color: "var(--accent)" }}
                className="mt-4 text-sm hover:underline cursor-pointer"
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label style={{ color: "var(--fg)" }} className="text-sm font-medium">
                    Nom
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    style={inputStyle}
                    className="px-3 py-2.5 rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--accent)] placeholder:text-[var(--muted)]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label style={{ color: "var(--fg)" }} className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                    style={inputStyle}
                    className="px-3 py-2.5 rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--accent)] placeholder:text-[var(--muted)]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label style={{ color: "var(--fg)" }} className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                  required
                  rows={5}
                  style={inputStyle}
                  className="px-3 py-2.5 rounded-lg text-sm transition-all focus:ring-2 focus:ring-[var(--accent)] resize-none placeholder:text-[var(--muted)]"
                />
              </div>

              {status === "error" && (
                <p
                  style={{ color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca" }}
                  className="text-sm px-3 py-2 rounded-lg"
                >
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{ background: "var(--accent)", color: "#fff" }}
                className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 cursor-pointer"
              >
                {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}
