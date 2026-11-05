import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Bell, Plus, LogOut } from 'lucide-react';
import { ChoreDashLogo } from '../common/ChoreDashLogo';

export const MobileHeader: React.FC = () => {
  const { 
    student, 
    activeDevice,
    notificationBadge, 
    setViewMode, 
    switchDevice,
    logout
  } = useApp();

  const isStudentDevice = activeDevice === 'student-device';

  return (
    <header className="sticky top-0 z-30 bg-[#030A18]/95 backdrop-blur-md border-b border-cyan-400/30 px-3 py-1.5 shadow-[0_2px_12px_-2px_rgba(0,240,255,0.2)] shrink-0">
      <div className="flex items-center justify-between gap-1.5">
        {/* Brand Lockup with neon aura & fast view role switcher */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="shrink-0 relative">
            <div className="absolute -inset-1 bg-cyan-400/20 rounded-xl blur-xs pointer-events-none" />
            <div className="relative">
              <ChoreDashLogo variant="horizontal" size="xs" showSubtitle={false} />
            </div>
          </div>

          {/* Quick Role Pill: Student (Jamie) vs Parent (Alex) */}
          <button
            onClick={() => switchDevice(isStudentDevice ? 'carer-device' : 'student-device')}
            className={`hidden xs:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border transition cursor-pointer shrink-0 ${
              isStudentDevice 
                ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50 shadow-[0_0_8px_rgba(0,240,255,0.3)]' 
                : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:text-cyan-300 hover:border-cyan-500/40'
            }`}
            title="Toggle between Student and Carer view"
          >
            <span>{isStudentDevice ? '🎒 Student' : '👤 Parent'}</span>
            <span className="text-[8.5px] text-cyan-400">⇄</span>
          </button>
        </div>

        {/* Right Section: Points for student, + Set for carer */}
        <div className="flex items-center gap-1.5 shrink-0">
          {isStudentDevice ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => switchDevice('carer-device')}
                className="xs:hidden px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-slate-300 hover:text-cyan-300 font-bold"
                title="Switch to Carer mode"
              >
                Parent
              </button>
              <div className="flex items-center gap-1 bg-gradient-to-r from-[#020816] to-[#05132B] border border-cyan-400/70 px-2 py-0.5 rounded-full text-[11px] font-black text-[#00F0FF] font-mono shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <Sparkles className="w-3 h-3 text-[#00F0FF] fill-[#00F0FF]" />
                <span className="tracking-tight">{student.points} pts</span>
              </div>
              <button
                onClick={logout}
                className="w-6.5 h-6.5 rounded-full bg-slate-800/90 border border-slate-700/60 hover:bg-rose-950/60 hover:text-rose-400 hover:border-rose-500/50 flex items-center justify-center text-slate-300 transition cursor-pointer"
                title="Sign out / switch account"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => switchDevice('student-device')}
                className="xs:hidden px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-[10px] text-cyan-300 font-bold"
                title="Switch to Student mode"
              >
                Student
              </button>
              {/* Primary Carer CTA: + Set Homework (Electric Logo Gradient) */}
              <button
                onClick={() => setViewMode('parent-editor')}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#00D0FF] to-[#0080FF] hover:brightness-110 text-slate-950 font-black text-[10.5px] shadow-[0_0_12px_rgba(0,240,255,0.45)] ring-1 ring-cyan-300 transition active:scale-95 cursor-pointer shrink-0"
                title="Set homework for Jamie"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>+ Set</span>
              </button>

              <div className="relative">
                <button 
                  onClick={() => setViewMode('progress-settings')}
                  className="w-6.5 h-6.5 rounded-full bg-slate-800/90 border border-slate-700/60 hover:bg-cyan-950/60 hover:text-cyan-300 hover:border-cyan-400/60 flex items-center justify-center text-slate-300 transition cursor-pointer"
                  title="View rhythm and notifications"
                >
                  <Bell className="w-3 h-3" />
                </button>
                {notificationBadge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00F0FF] ring-1.5 ring-slate-900 shadow-[0_0_4px_#00F0FF]"></span>
                )}
              </div>

              <button
                onClick={logout}
                className="w-6.5 h-6.5 rounded-full bg-slate-800/90 border border-slate-700/60 hover:bg-rose-950/60 hover:text-rose-400 hover:border-rose-500/50 flex items-center justify-center text-slate-300 transition cursor-pointer"
                title="Sign out / switch account"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
