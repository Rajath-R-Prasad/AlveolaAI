export default function BreathingLung() {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-coral/10 animate-breathe"
          style={{
            inset: -i * 20,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${2 + i * 0.6}s`,
          }}
        />
      ))}
      <svg
        viewBox="0 0 300 300"
        className="w-64 h-64 sm:w-80 sm:h-80 animate-breathe drop-shadow-[0_0_32px_rgba(232,97,74,0.25)]"
      >
        <defs>
          <radialGradient id="lg" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#e8614a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e8614a" stopOpacity="0.05" />
          </radialGradient>
          <radialGradient id="lh" cx="30%" cy="30%" r="80%">
            <stop offset="0%"   stopColor="#f0a842" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f0a842" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {/* Left lung */}
        <path d="M100 80C60 80 30 110 28 155C26 200 40 250 75 262C95 268 110 255 115 235C120 215 110 195 108 175C106 155 112 140 115 125C118 110 118 95 100 80Z"
          fill="url(#lg)" stroke="rgba(232,97,74,0.5)" strokeWidth="1.5" filter="url(#glow)" />
        {/* Right lung */}
        <path d="M200 80C240 80 270 110 272 155C274 200 260 250 225 262C205 268 190 255 185 235C180 215 190 195 192 175C194 155 188 140 185 125C182 110 182 95 200 80Z"
          fill="url(#lh)" stroke="rgba(240,168,66,0.5)" strokeWidth="1.5" filter="url(#glow)" />
        {/* Trachea & bronchi */}
        <path d="M150 40L150 82C150 82 130 85 115 90M150 82C150 82 170 85 185 90"
          fill="none" stroke="rgba(240,232,212,0.5)" strokeWidth="3" strokeLinecap="round" />
        <path d="M115 90C100 100 92 110 88 125M88 125C85 135 82 148 80 160M88 125C92 132 95 140 96 150"
          fill="none" stroke="rgba(232,97,74,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M185 90C200 100 208 110 212 125M212 125C215 135 218 148 220 160M212 125C208 132 205 140 204 150"
          fill="none" stroke="rgba(240,168,66,0.35)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Alveoli – left */}
        {[[65,175],[72,195],[85,215],[95,230],[60,215]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5"
            fill="rgba(232,97,74,0.2)" stroke="rgba(232,97,74,0.4)" strokeWidth="1" />
        ))}
        {/* Alveoli – right */}
        {[[235,175],[228,195],[215,215],[205,230],[240,215]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="5"
            fill="rgba(240,168,66,0.2)" stroke="rgba(240,168,66,0.4)" strokeWidth="1" />
        ))}
        {/* ECG heartbeat line */}
        <path d="M40 150L100 150L112 130L124 170L136 145L148 155L160 145L172 170L184 130L196 150L260 150"
          fill="none" stroke="rgba(232,97,74,0.6)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

