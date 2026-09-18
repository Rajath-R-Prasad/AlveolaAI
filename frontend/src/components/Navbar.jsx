import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { healthCheck } from "../utils/api";

export default function Navbar() {
  const [modelOnline, setModelOnline] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    healthCheck()
      .then((d) => setModelOnline(d.model_loaded))
      .catch(() => setModelOnline(false));
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    ["Why It Matters", "why"],
    ["Symptoms", "symptoms"],
    ["How It Works", "how"],
    ["FAQ", "faq"],
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between
                    px-4 sm:px-6 lg:px-12 bg-bg/90 backdrop-blur-2xl border-b border-border">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 sm:gap-2.5 no-underline flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center
                        text-base animate-halo">🫁</div>
        <span className="font-serif text-base sm:text-lg font-bold text-cream tracking-tight">AlveolaAI</span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8">
        {navLinks.map(([label, id]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="text-xs lg:text-sm text-muted transition-colors hover:text-coral bg-transparent border-none cursor-pointer whitespace-nowrap"
          >
            {label}
          </button>
        ))}
        <Link to="/analyze" className="btn-coral text-xs lg:text-sm py-2 px-4 lg:py-2.5 lg:px-6 no-underline whitespace-nowrap">
          Analyse X-ray →
        </Link>
      </div>

      {/* Right controls: Model status & Mobile Menu Button */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Model status */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted font-medium">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
            modelOnline === null
              ? "bg-amber-400 animate-pulse"
              : modelOnline
              ? "bg-sage animate-halo"
              : "bg-coral"
          }`} />
          <span className="hidden sm:inline">
            {modelOnline === null ? "CONNECTING…" : modelOnline ? "MODEL ONLINE" : "MODEL OFFLINE"}
          </span>
          <span className="sm:hidden">
            {modelOnline === null ? "CONN…" : modelOnline ? "ONLINE" : "OFFLINE"}
          </span>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg bg-surf/80 border border-border text-cream hover:text-coral transition-colors flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-bg/98 backdrop-blur-2xl border-b border-border shadow-2xl px-6 py-6 flex flex-col gap-4 animate-fadeIn z-50">
          {navLinks.map(([label, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left text-base font-semibold text-cream hover:text-coral py-2 border-b border-border/40 bg-transparent border-none cursor-pointer transition-colors"
            >
              {label}
            </button>
          ))}
          <Link
            to="/analyze"
            onClick={() => setMenuOpen(false)}
            className="btn-coral text-center justify-center text-sm py-3 mt-2 no-underline"
          >
            Analyse X-ray →
          </Link>
        </div>
      )}
    </nav>
  );
}

