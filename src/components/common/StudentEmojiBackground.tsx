import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export type EmojiVibe = 'cosmic' | 'focus' | 'genius' | 'streak';

interface FloatingEmojiItem {
  id: string;
  emoji: string;
  label: string;
  top: string;
  left: string;
  size: string;
  animClass: string;
  delay: string;
  opacity: string;
  glow: string;
}

const EMOJI_SETS: Record<EmojiVibe, { name: string; icon: string; items: FloatingEmojiItem[] }> = {
  cosmic: {
    name: 'Cosmic Quest',
    icon: '🚀',
    items: [
      { id: '1', emoji: '🚀', label: 'Rocket', top: '12%', left: '8%', size: 'text-2xl sm:text-3xl', animClass: 'animate-emoji-float-1', delay: '0s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-cyan-500/25 to-blue-500/20' },
      { id: '2', emoji: '🪐', label: 'Planet', top: '22%', left: '82%', size: 'text-2xl', animClass: 'animate-emoji-float-2', delay: '1.2s', opacity: 'opacity-35 hover:opacity-90', glow: 'from-purple-500/25 to-pink-500/20' },
      { id: '3', emoji: '✨', label: 'Sparkles', top: '38%', left: '14%', size: 'text-xl', animClass: 'animate-emoji-float-3', delay: '0.6s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-cyan-400/30 to-amber-300/20' },
      { id: '4', emoji: '🌟', label: 'Star', top: '54%', left: '86%', size: 'text-2xl', animClass: 'animate-emoji-float-1', delay: '2.5s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-amber-400/30 to-yellow-300/20' },
      { id: '5', emoji: '💡', label: 'Lightbulb', top: '68%', left: '6%', size: 'text-xl sm:text-2xl', animClass: 'animate-emoji-float-2', delay: '3.1s', opacity: 'opacity-35 hover:opacity-90', glow: 'from-yellow-400/30 to-amber-500/20' },
      { id: '6', emoji: '🎯', label: 'Target', top: '82%', left: '78%', size: 'text-2xl', animClass: 'animate-emoji-float-3', delay: '1.8s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-rose-500/25 to-orange-500/20' },
      { id: '7', emoji: '⚡', label: 'Zap', top: '88%', left: '20%', size: 'text-lg sm:text-xl', animClass: 'animate-emoji-float-1', delay: '4.2s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-cyan-400/30 to-blue-400/20' },
    ]
  },
  focus: {
    name: 'Super Focus',
    icon: '⚡',
    items: [
      { id: 'f1', emoji: '⚡', label: 'Lightning', top: '10%', left: '12%', size: 'text-2xl sm:text-3xl', animClass: 'animate-emoji-float-2', delay: '0s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-cyan-400/35 to-blue-500/25' },
      { id: 'f2', emoji: '🎯', label: 'Bullseye', top: '24%', left: '80%', size: 'text-2xl', animClass: 'animate-emoji-float-1', delay: '1s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-rose-500/30 to-orange-400/25' },
      { id: 'f3', emoji: '⏱️', label: 'Timer', top: '42%', left: '8%', size: 'text-xl', animClass: 'animate-emoji-float-3', delay: '2s', opacity: 'opacity-35 hover:opacity-85', glow: 'from-sky-400/30 to-indigo-500/20' },
      { id: 'f4', emoji: '📚', label: 'Books', top: '60%', left: '84%', size: 'text-2xl', animClass: 'animate-emoji-float-2', delay: '0.5s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-emerald-400/30 to-teal-500/20' },
      { id: 'f5', emoji: '🏆', label: 'Trophy', top: '74%', left: '15%', size: 'text-2xl', animClass: 'animate-emoji-float-1', delay: '3.5s', opacity: 'opacity-40 hover:opacity-95', glow: 'from-amber-400/35 to-orange-500/25' },
      { id: 'f6', emoji: '✨', label: 'Sparkle', top: '88%', left: '72%', size: 'text-xl', animClass: 'animate-emoji-float-3', delay: '1.7s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-cyan-300/30 to-blue-400/20' },
    ]
  },
  genius: {
    name: 'Brain Galaxy',
    icon: '🧠',
    items: [
      { id: 'g1', emoji: '🧠', label: 'Brain', top: '14%', left: '10%', size: 'text-2xl sm:text-3xl', animClass: 'animate-emoji-float-1', delay: '0s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-pink-500/30 to-purple-500/25' },
      { id: 'g2', emoji: '💡', label: 'Idea', top: '26%', left: '84%', size: 'text-2xl', animClass: 'animate-emoji-float-3', delay: '1.5s', opacity: 'opacity-45 hover:opacity-90', glow: 'from-yellow-400/35 to-amber-500/25' },
      { id: 'g3', emoji: '🎨', label: 'Palette', top: '46%', left: '12%', size: 'text-xl', animClass: 'animate-emoji-float-2', delay: '2.4s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-rose-400/30 to-violet-500/20' },
      { id: 'g4', emoji: '🔬', label: 'Microscope', top: '62%', left: '82%', size: 'text-2xl', animClass: 'animate-emoji-float-1', delay: '0.8s', opacity: 'opacity-35 hover:opacity-85', glow: 'from-teal-400/30 to-emerald-500/20' },
      { id: 'g5', emoji: '🎓', label: 'Graduation', top: '78%', left: '10%', size: 'text-2xl', animClass: 'animate-emoji-float-3', delay: '3s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-blue-400/30 to-cyan-500/20' },
      { id: 'g6', emoji: '🌟', label: 'Star', top: '86%', left: '78%', size: 'text-xl', animClass: 'animate-emoji-float-2', delay: '1.2s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-amber-400/35 to-yellow-300/20' },
    ]
  },
  streak: {
    name: 'Streak Master',
    icon: '🔥',
    items: [
      { id: 's1', emoji: '🔥', label: 'Fire', top: '12%', left: '14%', size: 'text-2xl sm:text-3xl', animClass: 'animate-emoji-float-1', delay: '0s', opacity: 'opacity-50 hover:opacity-100', glow: 'from-orange-500/40 to-amber-500/30' },
      { id: 's2', emoji: '💎', label: 'Diamond', top: '28%', left: '82%', size: 'text-2xl', animClass: 'animate-emoji-float-2', delay: '1s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-cyan-400/35 to-blue-500/25' },
      { id: 's3', emoji: '🏆', label: 'Trophy', top: '44%', left: '8%', size: 'text-xl sm:text-2xl', animClass: 'animate-emoji-float-3', delay: '2.2s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-amber-400/35 to-orange-400/25' },
      { id: 's4', emoji: '⚡', label: 'Energy', top: '64%', left: '85%', size: 'text-2xl', animClass: 'animate-emoji-float-1', delay: '1.8s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-yellow-400/35 to-cyan-400/25' },
      { id: 's5', emoji: '🎉', label: 'Party', top: '76%', left: '12%', size: 'text-2xl', animClass: 'animate-emoji-float-2', delay: '3.2s', opacity: 'opacity-40 hover:opacity-90', glow: 'from-pink-500/30 to-purple-500/20' },
      { id: 's6', emoji: '🚀', label: 'Rocket', top: '88%', left: '74%', size: 'text-xl', animClass: 'animate-emoji-float-3', delay: '0.4s', opacity: 'opacity-45 hover:opacity-95', glow: 'from-cyan-500/35 to-blue-500/25' },
    ]
  }
};

export const StudentEmojiBackground: React.FC<{ 
  showControls?: boolean;
  className?: string;
}> = ({ showControls = true, className = '' }) => {
  const [activeVibe, setActiveVibe] = useState<EmojiVibe>('cosmic');
  const [poppedId, setPoppedId] = useState<string | null>(null);
  const [burstParticle, setBurstParticle] = useState<{ x: number; y: number; emoji: string } | null>(null);

  const currentTheme = EMOJI_SETS[activeVibe];

  const handleEmojiClick = (item: FloatingEmojiItem, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setPoppedId(item.id);
    
    // Spawn tiny celebration burst
    const rect = e.currentTarget.getBoundingClientRect();
    setBurstParticle({
      x: rect.left + rect.width / 2,
      y: rect.top,
      emoji: item.emoji
    });

    setTimeout(() => {
      setPoppedId(null);
    }, 450);

    setTimeout(() => {
      setBurstParticle(null);
    }, 900);
  };

  return (
    <div 
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Celestial Glows behind emojis */}
      <div className="absolute -top-16 left-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl animate-emoji-pulse-aura pointer-events-none" />
      <div className="absolute top-1/2 -right-16 w-80 h-80 rounded-full bg-gradient-to-bl from-purple-500/10 via-cyan-500/5 to-transparent blur-3xl animate-emoji-pulse-aura pointer-events-none [animation-delay:3s]" />
      <div className="absolute -bottom-16 left-1/3 w-64 h-64 rounded-full bg-gradient-to-tr from-amber-500/10 via-cyan-500/5 to-transparent blur-3xl animate-emoji-pulse-aura pointer-events-none [animation-delay:1.5s]" />

      {/* Floating Emojis */}
      {currentTheme.items.map((item) => {
        const isPopped = poppedId === item.id;
        return (
          <div
            key={item.id}
            style={{
              top: item.top,
              left: item.left,
              animationDelay: item.delay,
            }}
            className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ${item.animClass} ${isPopped ? 'animate-emoji-pop scale-125 z-20' : 'z-0'}`}
          >
            {/* Subtle glow aura */}
            <div className={`absolute -inset-2.5 rounded-full bg-gradient-to-tr ${item.glow} blur-md opacity-40 pointer-events-none`} />

            <button
              type="button"
              onClick={(e) => handleEmojiClick(item, e)}
              className={`relative cursor-pointer transition-all duration-300 transform active:scale-130 ${item.size} ${item.opacity} drop-shadow-[0_2px_8px_rgba(0,240,255,0.35)]`}
              title={`Tap to boost vibe: ${item.label}`}
              aria-label={`Interactive background emoji: ${item.label}`}
            >
              {item.emoji}
            </button>
          </div>
        );
      })}

      {/* Burst Particle effect when clicked */}
      {burstParticle && (
        <div 
          className="fixed pointer-events-none z-50 animate-out fade-out slide-out-to-top-6 duration-700 text-lg flex items-center gap-1 font-bold text-cyan-300 drop-shadow-[0_0_8px_#00F0FF]"
          style={{ top: burstParticle.y - 20, left: burstParticle.x - 24 }}
        >
          <span>{burstParticle.emoji}</span>
          <span className="text-[10px] text-amber-300 font-mono tracking-tight">+5 focus!</span>
        </div>
      )}

      {/* Subtle Student Vibe Selector (Non-intrusive bottom/corner pill) */}
      {showControls && (
        <div className="absolute top-2 right-2 pointer-events-auto z-20">
          <div className="flex items-center gap-1 bg-[#05132B]/90 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-cyan-500/30 shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
            <span className="text-[9px] font-bold text-cyan-300 flex items-center gap-0.5 px-0.5">
              <Sparkles className="w-2.5 h-2.5 text-[#00F0FF]" />
              <span className="hidden xs:inline">Vibe:</span>
            </span>
            {(['cosmic', 'focus', 'genius', 'streak'] as EmojiVibe[]).map((vibeKey) => {
              const vibe = EMOJI_SETS[vibeKey];
              const isActive = activeVibe === vibeKey;
              return (
                <button
                  key={vibeKey}
                  type="button"
                  onClick={() => setActiveVibe(vibeKey)}
                  className={`text-[11px] px-1.5 py-0.2 rounded-full transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-[#00F0FF] to-[#0080FF] text-slate-950 font-black shadow-[0_0_8px_rgba(0,240,255,0.6)] scale-105' 
                      : 'hover:bg-slate-800 text-slate-400 hover:text-white opacity-70 hover:opacity-100'
                  }`}
                  title={`${vibe.name} emoji theme`}
                >
                  {vibe.icon}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
