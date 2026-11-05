import React from 'react';

export const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;

  const particles = Array.from({ length: 48 }).map((_, i) => {
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 0.5;
    const size = 6 + Math.random() * 8;
    const colors = [
      '#10B981', // emerald
      '#F97316', // orange
      '#06B6D4', // cyan
      '#8B5CF6', // purple
      '#F59E0B', // amber
      '#EC4899', // pink
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm';

    return (
      <div
        key={i}
        className={`absolute animate-bounce ${shape}`}
        style={{
          left: `${left}%`,
          top: `-20px`,
          width: `${size}px`,
          height: `${size * (Math.random() > 0.5 ? 1 : 2)}px`,
          backgroundColor: color,
          animation: `fall 2.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
          animationDelay: `${animationDelay}s`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
      />
    );
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style>{`
        @keyframes fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(0.8);
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(105vh) rotate(720deg) scale(1);
          }
        }
      `}</style>
      {particles}
    </div>
  );
};
