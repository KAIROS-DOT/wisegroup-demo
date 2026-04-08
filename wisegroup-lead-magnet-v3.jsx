import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// WiseGroup Lead Magnet Landing Page v3.0
// All 8 B2B psychology optimizations applied
// Author: Kuba — próbka kompetencji dla WiseGroup
// ═══════════════════════════════════════════════════════════

const C = {
  white: "#FFFFFF",
  light: "#F8F9FA",
  lightAlt: "#F1F3F5",
  accentSubtle: "rgba(13,179,158,0.06)",
  accentLight: "#E6FAF7",
  accentMedium: "rgba(13,179,158,0.12)",
  textPrimary: "#1D1D1F",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
  accent: "#0DB39E",
  accentHover: "#0A9682",
  border: "#E5E7EB",
  borderLight: "#F0F0F0",
  red: "#DC2626",
  redBg: "rgba(220,38,38,0.06)",
  redSoft: "#FEE2E2",
  redText: "#991B1B",
  greenCheck: "#059669",
  orange: "#D97706",
  orangeBg: "rgba(217,119,6,0.08)",
  shadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
  shadowMd: "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)",
  shadowSm: "0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03)",
};

const FONT = "'Poppins', system-ui, -apple-system, sans-serif";

function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } },
      { threshold }
    );
    o.observe(el);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

function FadeIn({ children, delay = 0, className = "", style = {} }) {
  const [ref, v] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: v ? 1 : 0,
      transform: v ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.65s cubic-bezier(.25,.1,.25,1) ${delay}s, transform 0.65s cubic-bezier(.25,.1,.25,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function MetricCard({ value, label, icon }) {
  return (
    <div style={{
      background: C.white, borderRadius: 12, padding: "28px 24px",
      textAlign: "center", boxShadow: C.shadow,
      border: `1px solid ${C.borderLight}`, flex: "1 1 0", minWidth: 180,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: C.accentSubtle,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px", fontSize: 20,
      }}>{icon}</div>
      <div style={{
        fontFamily: FONT, fontSize: 36, fontWeight: 700,
        color: C.accent, lineHeight: 1.1, marginBottom: 8,
      }}>{value}</div>
      <div style={{
        fontFamily: FONT, fontSize: 13, fontWeight: 500,
        color: C.textSecondary, lineHeight: 1.5,
      }}>{label}</div>
    </div>
  );
}

function Benefit({ text, number }) {
  return (
    <div style={{
      display: "flex", gap: 16, alignItems: "flex-start",
      padding: "18px 0", borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        border: `2px solid ${C.accent}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: FONT, fontSize: 14, fontWeight: 700,
        color: C.accent, flexShrink: 0, marginTop: 2,
      }}>{number}</div>
      <p style={{
        fontFamily: FONT, fontSize: 16, lineHeight: 1.7,
        color: C.textPrimary, margin: 0,
      }}>{text}</p>
    </div>
  );
}

function ClientLogo({ name }) {
  return (
    <div style={{
      padding: "10px 22px", background: C.light, borderRadius: 8,
      fontSize: 13, fontFamily: FONT, color: C.textMuted,
      fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
      whiteSpace: "nowrap", transition: "color 0.2s, background 0.2s",
    }}
    onMouseOver={e => { e.currentTarget.style.color = C.textSecondary; e.currentTarget.style.background = C.accentSubtle; }}
    onMouseOut={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.background = C.light; }}
    >{name}</div>
  );
}

function CTAButton({ children, onClick, style: s = {}, type = "button", variant = "primary" }) {
  const [h, setH] = useState(false);
  const isPrimary = variant === "primary";
  return (
    <button type={type} onClick={onClick}
      onMouseOver={() => setH(true)} onMouseOut={() => setH(false)}
      style={{
        fontFamily: FONT, padding: "15px 32px",
        background: isPrimary ? (h ? C.accentHover : C.accent) : "transparent",
        color: isPrimary ? C.white : C.accent,
        fontSize: 15, fontWeight: 600, borderRadius: 8,
        border: isPrimary ? "none" : `2px solid ${C.accent}`,
        cursor: "pointer",
        transition: "background 0.2s, transform 0.15s, box-shadow 0.2s, color 0.2s",
        transform: h ? "translateY(-1px)" : "translateY(0)",
        boxShadow: isPrimary
          ? (h ? "0 4px 20px rgba(13,179,158,0.3)" : "0 2px 12px rgba(13,179,158,0.15)")
          : "none",
        ...s,
      }}
    >{children}</button>
  );
}

function InputField({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{
        display: "block", marginBottom: 6, fontFamily: FONT,
        fontSize: 13, fontWeight: 500, color: C.textSecondary,
      }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", padding: "13px 16px", background: C.white,
  border: `1.5px solid ${C.border}`, borderRadius: 8,
  fontFamily: FONT, fontSize: 15, color: C.textPrimary,
  outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
};

// ─── Social proof avatars ───
function SocialProofMini() {
  const colors = ["#0DB39E", "#3B82F6", "#8B5CF6", "#F59E0B"];
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 8, marginTop: 14,
    }}>
      <div style={{ display: "flex" }}>
        {colors.map((c, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "50%",
            background: c, border: `2px solid ${C.white}`,
            marginLeft: i > 0 ? -8 : 0, position: "relative", zIndex: 4 - i,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, color: "white", fontWeight: 700,
          }}>{["M", "A", "K", "J"][i]}</div>
        ))}
      </div>
      <span style={{ fontSize: 13, color: C.textSecondary, fontWeight: 500 }}>
        <strong style={{ color: C.textPrimary }}>2 800+</strong> firm B2B już pobrało
      </span>
    </div>
  );
}

// ═══ MAIN COMPONENT ═══
export default function WiseGroupLP() {
  const [email, setEmail] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Podaj prawidłowy adres e-mail firmowy."); return;
    }
    if (!teamSize) { setError("Wybierz wielkość zespołu sprzedaży."); return; }
    if (!consent) { setError("Wymagana zgoda na przetwarzanie danych."); return; }
    setSubmitted(true);
  };

  // ═══════════════════════════════════════
  // THANK YOU PAGE (P5: Discovery Call CTA)
  // ═══════════════════════════════════════
  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: C.white, fontFamily: FONT,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 20px",
      }}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ maxWidth: 560, textAlign: "center" }}>
          {/* Confirmation */}
          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: C.accentLight, border: `2px solid ${C.greenCheck}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px", fontSize: 28, color: C.greenCheck,
          }}>✓</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>
            Blueprint jest w drodze
          </h1>
          <p style={{ fontSize: 16, color: C.textSecondary, lineHeight: 1.7, marginBottom: 28 }}>
            Sprawdź swoją skrzynkę e-mail (również folder SPAM).
            W ciągu 2 minut otrzymasz link do pobrania WSS Blueprint
            wraz z instrukcją przeprowadzenia samodzielnej diagnozy.
          </p>
          <CTAButton style={{ padding: "14px 32px", marginBottom: 36 }}>
            ⬇ Pobierz natychmiast tutaj
          </CTAButton>

          {/* ─── P5: DISCOVERY CALL — kolejny krok lejka ─── */}
          <div style={{
            background: C.accentLight, borderRadius: 14,
            border: `1px solid ${C.accentMedium}`,
            padding: "28px 24px", marginBottom: 32, textAlign: "left",
          }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: C.accent,
              letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12,
            }}>NASTĘPNY KROK</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, marginBottom: 8 }}>
              Chcesz przejść przez wyniki z konsultantem WSS?
            </h3>
            <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, marginBottom: 18 }}>
              Zarezerwuj bezpłatną 30-minutową sesję diagnostyczną.
              Konsultant przejdzie z Tobą przez Twój scoring, wskaże priorytety
              i zaproponuje konkretne działania — bez zobowiązań.
            </p>
            <CTAButton variant="secondary" style={{ width: "100%", padding: "13px 24px" }}>
              Zarezerwuj bezpłatną sesję →
            </CTAButton>
            <p style={{ fontSize: 12, color: C.textMuted, textAlign: "center", marginTop: 10 }}>
              Bez rozmów sprzedażowych. Czysta diagnoza.
            </p>
          </div>

          {/* Resources */}
          <div style={{
            borderTop: `1px solid ${C.border}`, paddingTop: 24, textAlign: "left",
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, color: C.textSecondary,
              marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.04em",
            }}>Podczas gdy czekasz</p>
            {[
              { title: "Podcast NSM", desc: "Najpopularniejszy podcast o sprzedaży B2B w Polsce", icon: "🎧" },
              { title: "WiseTools", desc: "Recenzje narzędzi IT dla biznesu", icon: "🛠" },
              { title: "Blog SellWise", desc: "Artykuły o procesach sprzedaży i CRM", icon: "📖" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 14, alignItems: "center",
                padding: "12px 14px", background: C.light,
                borderRadius: 10, marginBottom: 8, cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.background = C.accentSubtle}
              onMouseOut={e => e.currentTarget.style.background = C.light}
              >
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: C.textSecondary }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: C.textMuted, marginTop: 24 }}>
            Znasz kogoś, komu to pomoże? Prześlij link do tej strony.
          </p>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════
  // LANDING PAGE
  // ═══════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", background: C.white, fontFamily: FONT, color: C.textPrimary }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ═══ HERO ═══ */}
      <section style={{ background: C.white, padding: "48px 24px 48px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* P8: Micro-urgency badge */}
          <FadeIn>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24, alignItems: "center" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: C.accentSubtle, borderRadius: 100,
                padding: "7px 16px", fontSize: 12, fontWeight: 600,
                color: C.accent, letterSpacing: "0.03em",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.accent }} />
                DARMOWE NARZĘDZIE DIAGNOSTYCZNE
              </div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: C.orangeBg, borderRadius: 100,
                padding: "7px 14px", fontSize: 11, fontWeight: 600,
                color: C.orange, letterSpacing: "0.02em",
              }}>
                Zaktualizowany Q2 2026
              </div>
            </div>
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.06}>
            <h1 style={{
              fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700,
              lineHeight: 1.12, color: C.textPrimary,
              margin: "0 0 16px", maxWidth: 720, letterSpacing: "-0.02em",
            }}>
              Zdiagnozuj swój proces sprzedaży{" "}
              <span style={{ color: C.accent }}>w 15 minut</span>
            </h1>
          </FadeIn>

          {/* P6: Time/risk framing in subheadline */}
          <FadeIn delay={0.1}>
            <p style={{
              fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.7,
              color: C.textSecondary, maxWidth: 620, margin: "0 0 8px",
            }}>
              Pobierz WSS Blueprint — framework diagnostyczny oparty na metodyce
              Wise Selling System. Znajdź wąskie gardła, które kosztują Twoją firmę
              utracone leady i przychody.
            </p>
          </FadeIn>

          {/* P6: Time framing one-liner */}
          <FadeIn delay={0.13}>
            <p style={{
              fontSize: 15, color: C.accent, fontWeight: 600,
              margin: "0 0 36px",
            }}>
              15 minut, które mogą zaoszczędzić Ci 6 miesięcy błędnych decyzji.
            </p>
          </FadeIn>

          {/* Grid: Form + Mockup */}
          <FadeIn delay={0.18}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 460px) minmax(0, 1fr)",
              gap: 40, alignItems: "start",
            }}>
              {/* ─── FORM ─── */}
              <div style={{
                background: C.white, borderRadius: 14, padding: "32px 28px",
                boxShadow: C.shadowMd, border: `1px solid ${C.borderLight}`,
              }}>
                {/* P2: Value anchoring */}
                <div style={{
                  background: C.accentSubtle, borderRadius: 8,
                  padding: "10px 14px", marginBottom: 20,
                  fontSize: 13, color: C.textSecondary, lineHeight: 1.5,
                }}>
                  Framework, z którego korzystają nasi konsultanci
                  w sesjach diagnostycznych za <strong style={{ color: C.textPrimary }}>2 500 PLN</strong> — tutaj{" "}
                  <strong style={{ color: C.accent }}>za darmo</strong>.
                </div>

                <p style={{
                  fontSize: 15, fontWeight: 600, color: C.textPrimary,
                  marginBottom: 18, marginTop: 0,
                }}>Podaj e-mail, aby otrzymać WSS Blueprint:</p>

                <form onSubmit={handleSubmit}>
                  <InputField label="E-mail firmowy *">
                    <input type="email" value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="jan@twojafirma.pl"
                      autoComplete="email" autoFocus style={inputStyle}
                      onFocus={e => e.target.style.borderColor = C.accent}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  </InputField>

                  <InputField label="Wielkość zespołu sprzedaży *">
                    <select value={teamSize}
                      onChange={e => setTeamSize(e.target.value)}
                      style={{
                        ...inputStyle,
                        color: teamSize ? C.textPrimary : C.textMuted,
                        cursor: "pointer", appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239CA3AF' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 16px center",
                      }}
                      onFocus={e => e.target.style.borderColor = C.accent}
                      onBlur={e => e.target.style.borderColor = C.border}
                    >
                      <option value="" disabled>Wybierz...</option>
                      <option value="1-5">1–5 osób</option>
                      <option value="6-15">6–15 osób</option>
                      <option value="16-50">16–50 osób</option>
                      <option value="50+">Ponad 50 osób</option>
                    </select>
                  </InputField>

                  <label style={{
                    display: "flex", gap: 10, alignItems: "flex-start",
                    fontSize: 12, color: C.textMuted, lineHeight: 1.5,
                    cursor: "pointer", margin: "4px 0 16px",
                  }}>
                    <input type="checkbox" checked={consent}
                      onChange={e => setConsent(e.target.checked)}
                      style={{ width: 16, height: 16, marginTop: 2, flexShrink: 0, accentColor: C.accent, cursor: "pointer" }}
                    />
                    <span>
                      Wyrażam zgodę na przetwarzanie danych osobowych w celu przesłania
                      materiału.{" "}
                      <a href="#" style={{ color: C.accent, textDecoration: "underline" }}
                        onClick={e => e.preventDefault()}>Polityka prywatności</a>
                    </span>
                  </label>

                  {error && (
                    <div style={{
                      fontSize: 13, color: C.red, padding: "10px 14px",
                      background: C.redBg, borderRadius: 8, marginBottom: 16, fontWeight: 500,
                    }}>{error}</div>
                  )}

                  <CTAButton type="submit" style={{ width: "100%", padding: "15px 24px" }}>
                    Pobierz darmowy Blueprint →
                  </CTAButton>

                  {/* P6: Zero risk framing */}
                  <p style={{
                    fontSize: 12, color: C.textMuted, textAlign: "center", marginTop: 10,
                  }}>
                    Zero rozmów sprzedażowych. Zero zobowiązań. Tylko diagnoza.
                  </p>

                  {/* P1: Social proof at CTA */}
                  <SocialProofMini />
                </form>
              </div>

              {/* ─── MOCKUP (P7: Zeigarnik + Posiadanie) ─── */}
              <div style={{
                background: C.light, borderRadius: 14,
                border: `1px solid ${C.border}`, padding: "36px 28px",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: C.accent,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20,
                }}>PODGLĄD DOKUMENTU</div>

                <div style={{
                  background: C.white, borderRadius: 10, padding: "24px 22px",
                  boxShadow: C.shadowSm, border: `1px solid ${C.borderLight}`,
                }}>
                  <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, color: C.textPrimary }}>
                    WSS Blueprint
                  </div>
                  <div style={{
                    fontSize: 12, color: C.textSecondary, marginBottom: 16,
                    paddingBottom: 12, borderBottom: `2px solid ${C.accent}`,
                  }}>Diagnoza Procesu Sprzedaży • Wise Selling System</div>

                  {/* P7: One score revealed (Zeigarnik) */}
                  {[
                    { label: "Generowanie leadów", score: "3/10", revealed: true },
                    { label: "Kwalifikacja szans", score: "?/10", revealed: false },
                    { label: "Proces sprzedaży", score: "?/10", revealed: false },
                    { label: "CRM i dane", score: "?/10", revealed: false },
                    { label: "Marketing ↔ Sprzedaż", score: "?/10", revealed: false },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", padding: "9px 0",
                      borderBottom: i < 4 ? `1px solid ${C.borderLight}` : "none",
                      fontSize: 13, color: C.textPrimary,
                    }}>
                      <span>{item.label}</span>
                      <span style={{
                        fontSize: 15, fontWeight: 700,
                        color: item.revealed ? C.red : C.accent,
                        background: item.revealed ? C.redSoft : "transparent",
                        padding: item.revealed ? "2px 8px" : 0,
                        borderRadius: 4,
                      }}>{item.score}</span>
                    </div>
                  ))}

                  <div style={{
                    marginTop: 14, padding: "11px 14px",
                    background: C.accentSubtle, borderRadius: 8,
                    fontSize: 12, color: C.textSecondary, lineHeight: 1.5,
                    borderLeft: `3px solid ${C.accent}`,
                  }}>
                    Wynik końcowy + rekomendacje działań priorytetowych
                  </div>
                </div>

                {/* P7: Zeigarnik verbal trigger */}
                <p style={{
                  fontSize: 14, color: C.textPrimary, lineHeight: 1.5,
                  marginTop: 18, fontWeight: 600, textAlign: "center",
                }}>
                  Jaki będzie <span style={{ color: C.accent }}>Twój</span> wynik? Pobierz i sprawdź.
                </p>
                <p style={{
                  fontSize: 12, color: C.textMuted, lineHeight: 1.5,
                  marginTop: 6, fontStyle: "italic", textAlign: "center",
                }}>
                  PDF, 4 strony • Framework z scoringiem 0–10 dla każdego etapu lejka
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: C.light, padding: "56px 24px" }}>
        <FadeIn>
          <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", gap: 20, flexWrap: "wrap" }}>
            <MetricCard value="70%" label="wdrożeń CRM kończy się porażką bez uporządkowanych procesów" icon="⚠" />
            <MetricCard value="40%" label="leadów jest gubiona przez brak systematycznego follow-upu" icon="📉" />
            <MetricCard value="90 dni" label="średni cykl sprzedaży B2B, który można skrócić o 40%" icon="⏱" />
          </div>
        </FadeIn>
      </section>

      {/* ═══ PROBLEM + BENEFITS ═══ */}
      <section style={{ background: C.white, padding: "64px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{
              fontSize: "clamp(26px, 3.8vw, 38px)", fontWeight: 700,
              lineHeight: 1.18, color: C.textPrimary, marginBottom: 20,
            }}>
              Czy Twój zespół sprzedaży{" "}
              <span style={{ color: C.accent }}>traci pieniądze</span> na
              procesy, o których nie wie?
            </h2>
          </FadeIn>

          <FadeIn delay={0.06}>
            <p style={{
              fontSize: 16, lineHeight: 1.75, color: C.textSecondary, marginBottom: 36,
            }}>
              Większość firm B2B inwestuje w CRM, marketing automation
              i nowe narzędzia — ale bez diagnozy procesu to jak kupowanie
              leków bez badań. WSS Blueprint pokrywa 5 kluczowych obszarów
              Twojego systemu przychodowego i pokazuje, gdzie dokładnie
              tracisz pieniądze.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Benefit number="1" text="Zidentyfikujesz wąskie gardła w swoim lejku — od generowania leadów po zamykanie transakcji. Każdy etap z osobnym scoringiem." />
          </FadeIn>
          <FadeIn delay={0.14}>
            <Benefit number="2" text="Dowiesz się, czy Twój CRM faktycznie pracuje na przychody, czy jest drogim notatnikiem. Konkretne pytania diagnostyczne zamiast ogólników." />
          </FadeIn>
          <FadeIn delay={0.18}>
            <Benefit number="3" text="Otrzymasz priorytetyzowaną listę działań — co naprawić najpierw, żeby zobaczyć efekty w ciągu tygodni, nie miesięcy." />
          </FadeIn>
          <FadeIn delay={0.22}>
            <Benefit number="4" text="Ocenisz spójność marketingu ze sprzedażą. Czy oba zespoły pracują na tych samych założeniach, czy każdy robi swoje?" />
          </FadeIn>
          {/* P4: Personal value for decision-maker */}
          <FadeIn delay={0.26}>
            <Benefit number="5" text="Będziesz mieć twarde dane do rozmowy z zarządem — nie opinię, a diagnozę z scoringiem, którą możesz pokazać na najbliższym spotkaniu." />
          </FadeIn>
          <FadeIn delay={0.3}>
            <Benefit number="6" text="Wszystko oparte na Wise Selling System — metodyce stosowanej w 160+ projektach dla firm takich jak Brand24, Comarch czy Morele.net." />
          </FadeIn>
        </div>
      </section>

      {/* ═══ P3: CASE STUDY ═══ */}
      <section style={{ background: C.light, padding: "48px 24px" }}>
        <FadeIn>
          <div style={{
            maxWidth: 740, margin: "0 auto",
            background: C.white, borderRadius: 14,
            boxShadow: C.shadow, border: `1px solid ${C.borderLight}`,
            padding: "32px 28px",
            display: "grid", gridTemplateColumns: "1fr auto",
            gap: 28, alignItems: "center",
          }}>
            <div>
              <div style={{
                fontSize: 11, fontWeight: 700, color: C.accent,
                letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12,
              }}>CASE STUDY</div>
              <p style={{
                fontSize: 17, fontWeight: 600, color: C.textPrimary,
                lineHeight: 1.5, margin: "0 0 16px", fontStyle: "italic",
              }}>
                „Po diagnozie WSS skróciliśmy cykl sprzedaży z 90 do 52 dni
                i przestaliśmy gubić leady między marketingiem a handlowcami."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: C.accentSubtle, border: `1.5px solid ${C.accent}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, fontWeight: 700, color: C.accent,
                }}>M</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
                    Marek W., Dyrektor Sprzedaży
                  </div>
                  <div style={{ fontSize: 13, color: C.textSecondary }}>
                    Firma produkcyjna, 85 osób
                  </div>
                </div>
              </div>
            </div>

            {/* Metric highlight */}
            <div style={{
              textAlign: "center", padding: "20px 24px",
              background: C.accentSubtle, borderRadius: 12,
              minWidth: 120,
            }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: C.accent, lineHeight: 1.1 }}>
                +15%
              </div>
              <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 4, fontWeight: 500 }}>
                wygranych szans<br />w 6 tygodni
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section style={{ background: C.white, padding: "64px 24px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{
              fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700,
              color: C.textPrimary, textAlign: "center", marginBottom: 44,
            }}>Jak to działa?</h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 20,
            }}>
              {[
                { step: "01", title: "Pobierz Blueprint", desc: "Podaj e-mail i otrzymasz PDF z frameworkiem diagnostycznym w ciągu 2 minut." },
                { step: "02", title: "Odpowiedz na pytania", desc: "15 minut z zespołem. Każdy z 5 obszarów ma konkretne pytania z punktacją 0–10." },
                { step: "03", title: "Otrzymaj wynik + priorytety", desc: "Blueprint generuje scoring i pokazuje, od czego zacząć. Bez zgadywania." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: C.light, borderRadius: 12, padding: "28px 24px",
                  border: `1px solid ${C.borderLight}`,
                }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    width: 36, height: 36, borderRadius: 8,
                    background: C.accentSubtle, fontWeight: 700,
                    fontSize: 14, color: C.accent, marginBottom: 16,
                  }}>{item.step}</div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: C.textPrimary, marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.65, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF ═══ */}
      <section style={{ background: C.light, padding: "44px 24px" }}>
        <FadeIn>
          <div style={{ maxWidth: 1080, margin: "0 auto", textAlign: "center" }}>
            <p style={{
              fontSize: 12, color: C.textMuted, fontWeight: 600,
              letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20,
            }}>Metodyka stosowana we współpracy z</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {["Brand24", "Comarch", "Ceneo", "Morele.net", "Savills", "Future Processing"].map(n => (
                <ClientLogo key={n} name={n} />
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ AUTHORITY ═══ */}
      <section style={{ background: C.white, padding: "48px 24px" }}>
        <FadeIn>
          <div style={{
            maxWidth: 740, margin: "0 auto", background: C.light,
            borderRadius: 14, padding: "28px 28px",
            display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 12,
              background: C.accentSubtle, border: `2px solid ${C.accent}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, fontWeight: 700, color: C.accent, flexShrink: 0,
            }}>W</div>
            <div style={{ flex: 1, minWidth: 240 }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, margin: "0 0 4px" }}>
                WiseGroup
              </p>
              <p style={{ fontSize: 13, color: C.accent, fontWeight: 600, margin: "0 0 10px" }}>
                7 lat • 160+ specjalistów • Autorska metodyka WSS
              </p>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7, margin: "0 0 10px" }}>
                Grupa spółek pomagająca firmom B2B rosnąć w obszarach strategii,
                sprzedaży, marketingu, HR, automatyzacji i finansów.
                Wise Selling System łączy projektowanie procesów z wdrożeniem
                technologii — jedno bez drugiego nie działa.
              </p>
              {/* Halo effect: podcast mention */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 12, color: C.textSecondary, fontWeight: 500,
                background: C.accentSubtle, padding: "5px 12px", borderRadius: 6,
              }}>
                🎧 Podcast NSM — najpopularniejszy podcast o sprzedaży B2B w Polsce
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ BOTTOM CTA ═══ */}
      <section style={{
        background: C.accentLight, padding: "56px 24px",
        borderTop: `1px solid ${C.accentMedium}`,
        borderBottom: `1px solid ${C.accentMedium}`,
      }}>
        <FadeIn>
          <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700,
              color: C.textPrimary, marginBottom: 10,
            }}>
              Przestań zgadywać.{" "}
              <span style={{ color: C.accent }}>Zdiagnozuj.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.textSecondary, marginBottom: 8, lineHeight: 1.65 }}>
              Pobierz WSS Blueprint i w 15 minut dowiedz się,
              gdzie Twój proces sprzedaży traci pieniądze.
            </p>
            {/* P6: Risk framing */}
            <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 24, fontWeight: 500 }}>
              Nic nie ryzykujesz — w najgorszym wypadku zyskujesz 15 minut jasności.
            </p>
            <CTAButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              Pobierz darmowy Blueprint →
            </CTAButton>
            <p style={{ fontSize: 12, color: C.textMuted, marginTop: 14 }}>
              Darmowe. Bez karty kredytowej. Natychmiastowy dostęp.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        background: C.white, borderTop: `1px solid ${C.border}`,
        padding: "20px 24px", textAlign: "center",
        fontSize: 12, color: C.textMuted, fontFamily: FONT,
      }}>
        © 2026 WiseGroup ·{" "}
        <a href="#" style={{ color: C.textMuted, textDecoration: "underline" }}
          onClick={e => e.preventDefault()}>Polityka prywatności</a>
        <br />
        <span style={{ fontSize: 11, marginTop: 6, display: "inline-block", opacity: 0.7 }}>
          Próbka kompetencji przygotowana przez Kuba — Konsultant Wdrożeń IT
        </span>
      </footer>

      <style>{`
        * { box-sizing: border-box; margin: 0; }
        body { margin: 0; background: ${C.white}; }
        html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; scroll-behavior: smooth; }
        ::selection { background: ${C.accent}; color: white; }
        input::placeholder { color: ${C.textMuted}; }
        select option { background: ${C.white}; color: ${C.textPrimary}; }
        @media (max-width: 768px) {
          section > div > div[style*="gridTemplateColumns: minmax(0, 460px)"] {
            grid-template-columns: 1fr !important;
          }
          section > div > div[style*="gridTemplateColumns: 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
