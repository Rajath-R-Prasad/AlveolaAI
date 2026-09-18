import { useNavigate } from "react-router-dom";
import BreathingLung from "../components/BreathingLung";
import StatCounter from "../components/StatCounter";
import FAQ from "../components/FAQ";

const STATS = [
  { num: 2_500_000, suffix: "", label: "Children die from pneumonia each year", color: "text-coral", source: "WHO, 2023" },
  { num: 14, suffix: "", label: "Children die every minute", color: "text-amber", source: "UNICEF" },
  { num: 880, suffix: "M", label: "Cases reported globally each year", color: "text-sage", source: "Lancet, 2022" },
  { num: 45, suffix: "%", label: "Of under-5 deaths caused by pneumonia", color: "text-coral", source: "WHO" },
];

const SYMPTOMS = [
  { icon: "🌡️", title: "High Fever", body: "Temperature above 38.5 °C (101 °F). May appear suddenly or develop over 1–2 days. In infants, even a mild fever can signal danger and requires immediate assessment.", accent: "border-l-coral" },
  { icon: "😮‍💨", title: "Rapid Breathing", body: "Faster than 60 breaths/min in infants, 50/min in toddlers, 40/min in older children. Nostrils flare visibly with each breath.", accent: "border-l-coral" },
  { icon: "💙", title: "Bluish Lips / Nails", body: "Cyanosis — lips, fingertips, or the skin around the mouth turns blue or grey — indicates critically low oxygen. Emergency sign. Call emergency services immediately.", accent: "border-l-amber" },
  { icon: "🫁", title: "Chest Indrawing", body: "Skin sucks inward between ribs or below the sternum with each breath. The body is working extremely hard to get air in — a sign of severe distress.", accent: "border-l-amber" },
  { icon: "😴", title: "Unusual Lethargy", body: "Child is unusually sleepy, limp, difficult to wake, or unresponsive. Combined with fever and breathing difficulty, this is a red-flag emergency.", accent: "border-l-sage" },
  { icon: "🤢", title: "Poor Feeding / Vomiting", body: "Infants refuse the breast or bottle. Older children vomit repeatedly or complain of stomach pain alongside respiratory symptoms.", accent: "border-l-sage" },
];

const HOW = [
  { n: "01", icon: "⬆", title: "Upload", desc: "Drag-drop a chest X-ray. JPEG, PNG, or DICOM.", color: "text-coral" },
  { n: "02", icon: "⚙", title: "Preprocess", desc: "Auto-normalise contrast and resize to 1024×1024.", color: "text-amber" },
  { n: "03", icon: "🔍", title: "Detect", desc: "YOLOv8 locates opacity regions with bounding boxes.", color: "text-sage" },
  { n: "04", icon: "🔥", title: "Explain", desc: "Grad-CAM heatmap reveals the pixels driving each prediction.", color: "text-coral" },
  { n: "05", icon: "📄", title: "Report", desc: "Severity grade + downloadable clinical PDF in one click.", color: "text-amber" },
];

const FEATURES = [
  {
    tag: "Explainability",
    title: "Grad-CAM: AI That Shows Its Work",
    body: "Unlike black-box classifiers, every detection comes with a heatmap overlay. Radiologists can see exactly what the model 'sees' — building the trust needed for real clinical adoption.",
    icon: "🔥",
    accent: "border-l-coral",
    tagColor: "text-coral bg-coral/10 border-coral/25",
  },
  {
    tag: "Severity Intelligence",
    title: "Not Just Yes / No — A Graded Severity Score",
    body: "The system quantifies opacity area as a percentage and maps it to Mild / Moderate / Severe. That is the information clinicians actually need for triage — not a binary classification output.",
    icon: "📊",
    accent: "border-l-coral sm:border-l-0 sm:border-r-amber",
    tagColor: "text-amber bg-amber/10 border-amber/25",
  },
  {
    tag: "AI Treatment Guidance",
    title: "Gemini-Powered Care Recommendations",
    body: "For Mild and Moderate cases, Gemini generates parent-friendly care steps, warning signs to watch for, and when to seek emergency care — bridging the gap between detection and action.",
    icon: "💊",
    accent: "border-l-sage",
    tagColor: "text-sage bg-sage/10 border-sage/25",
  },
];

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="pt-16 w-full overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center px-4 sm:px-8 lg:px-16 py-12 sm:py-20 overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 70% at 60% 50%, rgba(232,97,74,.06) 0%, transparent 70%)" }}>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 19 + 7) % 100}%`,
                top: `${(i * 23 + 13) % 100}%`,
                width: 2 + (i % 4),
                height: 2 + (i % 4),
                background: ["#e8614a", "#f0a842", "#4bbfa0"][i % 3],
                opacity: 0.5,
                animation: `floatUp ${3 + (i % 4)}s ease-in infinite`,
                animationDelay: `${(i % 5) * 0.8}s`,
              }}
            />
          ))}
        </div>

        {/* Watermark */}
        <div className="hidden md:block absolute right-[-40px] top-1/2 -translate-y-1/2 font-serif font-black
                        text-[140px] md:text-[200px] lg:text-[280px] leading-none text-white/[0.018] pointer-events-none select-none whitespace-nowrap">
          LUNGS
        </div>

        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-25 sm:opacity-30 pointer-events-none transform scale-[0.8] sm:scale-[1.1] md:scale-[1.3] translate-y-10 sm:translate-y-20">
          <BreathingLung />
        </div>

        <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center z-10">
          {/* text */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 bg-coral/12 border border-coral/25
                            rounded-full px-3.5 sm:px-4 py-1.5 mb-6 sm:mb-8 animate-floatUp mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-coral animate-halo inline-block" />
              <span className="text-[11px] sm:text-xs font-bold text-coral uppercase tracking-widest">
                Early Detection Saves Lives
              </span>
            </div>

            <h1 className="font-serif text-[clamp(32px,5.5vw,72px)] font-black leading-[1.1] sm:leading-[1.05]
                           tracking-tight text-cream mb-6 animate-floatUp [animation-delay:.1s] mx-auto">
              AI That Reads&nbsp;Chest<br />
              <span className="text-coral italic">X-rays</span>&nbsp;Like a<br />
              Radiologist
            </h1>

            <p className="text-sm sm:text-base text-muted leading-relaxed max-w-[580px] mb-8 sm:mb-10
                          animate-floatUp [animation-delay:.2s] mx-auto px-2 sm:px-0">
              Pneumonia kills{" "}
              <strong className="text-cream">2.5 million children</strong> every year.
              Many deaths are preventable with faster, more accurate diagnosis.
              AlveolaAI detects the subtle lung opacities that tired eyes miss.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-floatUp [animation-delay:.3s] w-full max-w-md mx-auto sm:max-w-none">
              <button className="btn-coral w-full sm:w-auto justify-center" onClick={() => nav("/analyze")}>
                Upload an X-ray now →
              </button>
              <button className="btn-outline-coral w-full sm:w-auto justify-center"
                onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}>
                See the evidence
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-12 mt-10 sm:mt-14 max-w-lg mx-auto justify-center animate-floatUp [animation-delay:.4s]">
              {[["98–99%", "Detection Accuracy"], ["&lt;10s", "Time to Result"], ["3-tier", "Severity Scale"]].map(([n, l]) => (
                <div key={l} className="text-center">
                  <div className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-coral leading-none"
                    dangerouslySetInnerHTML={{ __html: n }} />
                  <div className="text-[10px] sm:text-xs text-muted mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────── */}
      <section id="why" className="bg-surf border-y border-border py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-tag text-coral bg-coral/10 border-coral/25 mb-4">
              The Scale of the Crisis
            </span>
            <h2 className="font-serif text-[clamp(26px,4vw,52px)] font-bold text-cream mt-4 mb-4">
              Numbers That Cannot Be Ignored
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed px-2 sm:px-0">
              Pneumonia is the world's leading infectious killer of children under 5.
              Preventable and treatable — when caught in time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-12 sm:mb-16">
            {STATS.map((s, i) => (
              <div key={i} className={`card card-lift p-5 sm:p-7 text-center ${i === 0 ? "border-coral/30" : ""}`}>
                <div className={`font-serif text-4xl sm:text-5xl font-black leading-none mb-2 ${s.color}`}>
                  <StatCounter target={s.num} suffix={s.suffix} />
                </div>
                <p className="text-sm font-semibold text-text mb-1 leading-snug">{s.label}</p>
                <p className="text-[10px] text-muted uppercase tracking-wider">Source: {s.source}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                icon: "👁", color: "text-coral", title: "Subtle Patterns Missed",
                body: "Early pneumonia causes ground-glass opacity and faint consolidation — visible on X-ray 6–12 hours before clinical deterioration but easily missed by fatigued radiologists reading hundreds of images per shift."
              },
              {
                icon: "⏱", color: "text-amber", title: "Speed Saves Children",
                body: "Each hour of delayed treatment increases mortality risk. AI triage prioritises high-probability cases for immediate review, cutting the critical time between scan acquisition and clinical decision."
              },
              {
                icon: "🌍", color: "text-sage", title: "Reaching Underserved Areas",
                body: "Rural clinics with limited specialist access can deploy AlveolaAI on modest hardware. A web-based second reader is available 24/7, without requiring a full-time radiologist on-site."
              },
            ].map((f) => (
              <div key={f.title} className="card card-lift p-6 sm:p-7">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{f.icon}</div>
                <h3 className={`font-serif text-lg font-bold mb-2 sm:mb-3 ${f.color}`}>{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYMPTOMS ──────────────────────────────────────────────────── */}
      <section id="symptoms" className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-12 sm:mb-16">
            <div>
              <span className="section-tag text-sage bg-sage/10 border-sage/25 mb-4">
                Know the Signs
              </span>
              <h2 className="font-serif text-[clamp(26px,4vw,52px)] font-bold text-cream mt-4 mb-4">
                Symptoms of Childhood Pneumonia
              </h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                Children — especially infants — may not be able to describe their discomfort.
                Know these warning signs. When multiple appear together, seek medical attention immediately.
              </p>
            </div>
            <div className="p-5 sm:p-7 rounded-2xl bg-coral/8 border-2 border-coral/25">
              <div className="text-3xl sm:text-4xl mb-3">🚨</div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-coral mb-3 sm:mb-4">
                Go to Emergency Immediately If:
              </h3>
              {["Lips or fingernails turn blue", "Child stops breathing momentarily",
                "Cannot be woken or is limp", "Breathing stops and restarts"].map((s, i) => (
                  <div key={i} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-text mb-2">
                    <span className="text-coral font-bold flex-shrink-0">→</span>{s}
                  </div>
                ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SYMPTOMS.map((s, i) => (
              <div key={i}
                className={`card card-lift p-5 sm:p-6 border-l-[3px] rounded-r-2xl rounded-l-none ${s.accent}`}>
                <div className="text-2xl sm:text-3xl mb-3">{s.icon}</div>
                <h3 className="font-serif text-base font-bold text-cream mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section id="how" className="bg-surf border-y border-border py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-[clamp(26px,4vw,52px)] font-bold text-cream mb-3">
              From X-ray to Insight in Under 10 Seconds
            </h2>
            <p className="text-sm sm:text-base text-muted">Five automated stages. No specialist required on-site.</p>
          </div>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            <div className="hidden lg:block absolute top-9 left-[8%] right-[8%] h-px z-0"
              style={{ background: "linear-gradient(90deg,#e8614a,#f0a842,#4bbfa0)", opacity: .3 }} />
            {HOW.map((s, i) => (
              <div key={i} className="card lg:bg-transparent lg:border-none p-5 lg:p-0 text-center relative z-10 flex flex-col items-center">
                <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full border border-border
                                flex items-center justify-center mx-auto mb-4 sm:mb-5 text-2xl sm:text-3xl
                                shadow-[0_8px_32px_rgba(232,97,74,.12)]"
                  style={{ background: `linear-gradient(135deg,rgba(232,97,74,.2),transparent)` }}>
                  {s.icon}
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${s.color}`}>
                  {s.n}
                </div>
                <div className="font-serif text-base font-bold text-cream mb-1.5 sm:mb-2">{s.title}</div>
                <p className="text-xs text-muted leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 BIG FEATURES ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-serif text-[clamp(26px,4vw,52px)] font-bold text-cream mb-3">
              What Makes AlveolaAI Different
            </h2>
            <p className="text-sm sm:text-base text-muted max-w-md mx-auto">
              Previous CNN classifiers only said &apos;yes or no&apos;. We show <em>where</em>, <em>how severe</em>, and <em>what to do</em>.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:gap-5">
            {FEATURES.map((f, i) => (
              <div key={i}
                className={`card card-lift p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 sm:gap-8
                  ${i % 2 === 0 ? "border-l-[4px]" : "border-l-[4px] md:border-l-0 md:border-r-[4px] md:flex-row-reverse"}
                  ${f.accent}`}>
                <div className="text-4xl sm:text-5xl lg:text-6xl flex-shrink-0">{f.icon}</div>
                <div className="flex-1">
                  <span className={`section-tag text-xs mb-2 sm:mb-3 inline-block ${f.tagColor}`}>{f.tag}</span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-cream mb-2 sm:mb-3 mt-1">{f.title}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xl">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section id="faq" className="bg-surf border-y border-border py-16 sm:py-24 px-4 sm:px-8 lg:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-[clamp(26px,4vw,48px)] font-bold text-cream mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-muted">Everything clinicians, researchers, and parents ask us.</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 text-center"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,97,74,.07) 0%, transparent 70%)" }}>
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🫁</div>
        <h2 className="font-serif text-[clamp(24px,4vw,56px)] font-bold text-cream mb-4 sm:mb-5 leading-tight">
          A child&apos;s life may depend on<br />
          <span className="text-coral">what an X-ray reveals.</span>
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
          Let AI be the second reader that never gets tired and never misses a subtle opacity.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto sm:max-w-none">
          <button className="btn-coral w-full sm:w-auto justify-center" onClick={() => nav("/analyze")}>
            Upload an X-ray now →
          </button>
          <button className="btn-ghost w-full sm:w-auto justify-center"
            onClick={() => document.getElementById("why")?.scrollIntoView({ behavior: "smooth" })}>
            Read the evidence
          </button>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer className="px-4 sm:px-8 lg:px-16 py-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <div className="font-serif text-base font-bold text-coral">🫁 AlveolaAI</div>
        <div className="text-xs text-muted max-w-md">
          Not a replacement for clinical judgement. Always consult a qualified physician.
        </div>
        <div className="text-xs text-muted">REVA University AI Hackathon · Team Code Yodhas</div>
      </footer>
    </div>
  );
}
