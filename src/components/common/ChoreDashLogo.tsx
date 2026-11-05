import React from 'react';

interface ChoreDashLogoProps {
  variant?: 'icon' | 'horizontal' | 'full';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
  theme?: 'light' | 'dark';
}

export const ChoreDashLogo: React.FC<ChoreDashLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
  theme = 'light',
}) => {
  // Dimensions map for the icon part - comfortably prominent and substantial
  const iconSizes = {
    xs: 'w-7 h-7',
    sm: 'w-11 h-11',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-base sm:text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  const subtitleSizes = {
    xs: 'text-[9px]',
    sm: 'text-[10px] sm:text-[11px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  // Reusable SVG Emblem Element (matches uploaded ChoreDash logo with maximized artwork viewBox)
  const Emblem = (
    <div
      className={`relative ${iconSizes[size]} rounded-[22%] bg-gradient-to-br from-[#020816] via-[#05132B] to-[#020713] p-[4%] shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/35 flex items-center justify-center shrink-0 overflow-hidden group`}
    >
      {/* Outer Ambient Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,180,255,0.4)_0%,rgba(0,80,200,0.15)_50%,transparent_100%)] pointer-events-none" />

      {/* High-fidelity Vector Artwork of the Motion "D" + Globe + Check */}
      {/* viewBox tightly framed to 98 78 350 350 so the graphic fills the emblem container prominently */}
      <svg
        viewBox="98 78 350 350"
        className="w-full h-full relative z-10 drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoSwoosh" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="35%" stopColor="#00D0FF" />
            <stop offset="70%" stopColor="#0080FF" />
            <stop offset="100%" stopColor="#0055EE" />
          </linearGradient>

          <radialGradient id="logoGlobe" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#00A8FF" />
            <stop offset="60%" stopColor="#0050C8" />
            <stop offset="100%" stopColor="#002570" />
          </radialGradient>

          <linearGradient id="logoRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F5FF" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>

          <linearGradient id="logoWhite" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D9EEF9" />
          </linearGradient>
        </defs>

        {/* Top Speed Line & Large Outer Loop */}
        <path
          d="M 160 96 L 320 96 A 96 96 0 0 1 416 192 A 96 96 0 0 1 385 260 L 260 410 A 12 12 0 0 1 245 400 L 360 262 A 72 72 0 0 0 320 120 L 160 120 A 12 12 0 0 1 160 96 Z"
          fill="url(#logoSwoosh)"
        />

        {/* Middle Speed Line & Mid Loop */}
        <path
          d="M 130 148 L 305 148 A 58 58 0 0 1 363 206 A 58 58 0 0 1 346 248 L 272 336 A 11 11 0 0 1 258 327 L 326 245 A 36 36 0 0 0 305 172 L 130 172 A 12 12 0 0 1 130 148 Z"
          fill="url(#logoSwoosh)"
        />

        {/* Bottom Short Speed Bar */}
        <rect x="156" y="196" width="138" height="24" rx="12" fill="url(#logoSwoosh)" />

        {/* Bottom Right White Aerodynamic Accent */}
        <path
          d="M 296 392 C 336 384 368 360 382 328 C 362 380 320 406 296 392 Z"
          fill="url(#logoWhite)"
        />

        {/* Central-Left Globe Badge with Outer Neon Ring */}
        <circle cx="192" cy="316" r="62" fill="none" stroke="url(#logoRing)" strokeWidth="12" />
        <circle cx="192" cy="316" r="54" fill="url(#logoGlobe)" />

        {/* Continents Pattern */}
        <g fill="#001844" opacity="0.65">
          <path d="M 185 272 C 195 276 200 285 198 295 C 196 305 204 315 202 328 C 200 340 188 355 180 358 C 176 348 180 338 178 328 C 175 315 180 300 176 290 Z" />
          <path d="M 152 284 C 160 286 166 296 162 306 C 158 314 162 325 158 338 C 152 344 146 338 148 328 C 150 316 144 306 148 295 Z" />
          <path d="M 222 282 C 230 288 238 296 236 308 C 232 316 238 326 234 336 C 228 340 224 332 226 322 Z" />
        </g>

        {/* Crisp White Central Checkmark */}
        <path
          d="M 166 314 L 184 332 A 3 3 0 0 0 188 332 L 216 298 A 3 3 0 0 1 221 298 L 226 302 A 3 3 0 0 1 226 307 L 190 350 A 3 3 0 0 1 185 350 L 158 322 A 3 3 0 0 1 158 317 L 162 313 A 3 3 0 0 1 166 314 Z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>{Emblem}</div>;
  }

  const isDark = theme === 'dark';

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center gap-2.5 ${className}`}>
        {Emblem}
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-display font-black ${isDark ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
            Chore
          </span>
          <span
            className={`font-display font-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 bg-clip-text text-transparent ${textSizes[size]}`}
          >
            Dash
          </span>
        </div>
        {showSubtitle && (
          <span className={`${subtitleSizes[size]} font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'} tracking-wide`}>
            Family Routine & Homework
          </span>
        )}
      </div>
    );
  }

  // Default: 'horizontal' lockup
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      {Emblem}
      <div className="flex flex-col justify-center">
        <div className="flex items-center tracking-tight leading-none">
          <span className={`font-display font-black ${isDark ? 'text-white' : 'text-slate-900'} ${textSizes[size]}`}>
            Chore
          </span>
          <span
            className={`font-display font-black bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 bg-clip-text text-transparent ${textSizes[size]}`}
          >
            Dash
          </span>
        </div>
        {showSubtitle && (
          <span className={`${subtitleSizes[size]} ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold tracking-tight mt-0.5`}>
            Family Routine
          </span>
        )}
      </div>
    </div>
  );
};
