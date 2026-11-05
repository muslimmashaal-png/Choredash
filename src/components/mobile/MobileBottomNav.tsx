import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  CheckSquare, 
  Award, 
  Users, 
  LayoutDashboard, 
  Plus, 
  BarChart3, 
  Settings 
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { viewMode, setViewMode, activeRole, student, openCarerPrizesModal } = useApp();

  if (activeRole === 'student') {
    return (
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-[#030A18]/95 backdrop-blur-md border-t border-cyan-400/30 py-1.5 px-4 max-w-md mx-auto shadow-[0_-4px_20px_-2px_rgba(0,240,255,0.25)]">
        <div className="flex items-center justify-around">
          {/* 1. Today Schedule (Screen 5) */}
          <button
            onClick={() => setViewMode('student-schedule')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer relative ${
              viewMode === 'student-schedule'
                ? 'text-[#00F0FF] font-black scale-105'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Calendar className={`w-5 h-5 stroke-[2.3] ${viewMode === 'student-schedule' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
            <span className="text-[10px]">Today</span>
            {viewMode === 'student-schedule' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] -mb-1"></span>
            )}
          </button>

          {/* 2. Tasks / Fractions Worksheet (Screen 4) */}
          <button
            onClick={() => setViewMode('student-task')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer relative ${
              viewMode === 'student-task'
                ? 'text-[#00F0FF] font-black scale-105'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <CheckSquare className={`w-5 h-5 stroke-[2.3] ${viewMode === 'student-task' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
            <span className="text-[10px]">Task</span>
            {viewMode === 'student-task' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] -mb-1"></span>
            )}
          </button>

          {/* 3. Rewards & Shop */}
          <button
            onClick={() => setViewMode('progress-settings')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer relative ${
              viewMode === 'progress-settings'
                ? 'text-amber-400 font-black scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Award className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute -top-1 -right-2 text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black px-1 rounded-full shadow-[0_0_8px_rgba(255,140,0,0.5)]">
                {student.points}
              </span>
            </div>
            <span className="text-[10px]">Rewards</span>
            {viewMode === 'progress-settings' && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B] -mb-1"></span>
            )}
          </button>

          {/* 4. Family & Code (Screen 1) */}
          <button
            onClick={() => setViewMode('account-onboarding')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition cursor-pointer relative ${
              viewMode === 'account-onboarding'
                ? 'text-[#00F0FF] font-black scale-105'
                : 'text-slate-400 hover:text-cyan-300'
            }`}
          >
            <Users className={`w-5 h-5 stroke-[2.3] ${viewMode === 'account-onboarding' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
            <span className="text-[10px]">Family</span>
            {viewMode === 'account-onboarding' && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF] -mb-1"></span>
            )}
          </button>
        </div>
      </nav>
    );
  }

  // Parent Role Navigation (With glowing neon logo colors)
  return (
    <nav className="absolute bottom-0 inset-x-0 z-30 bg-[#030A18]/95 backdrop-blur-md border-t border-cyan-400/30 py-1 px-1.5 shadow-[0_-4px_20px_-2px_rgba(0,240,255,0.25)]">
      <div className="flex items-center justify-between">
        {/* 1. Overview / Dashboard (Screen 2) */}
        <button
          onClick={() => setViewMode('parent-dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1 rounded-xl transition cursor-pointer min-w-0 ${
            viewMode === 'parent-dashboard'
              ? 'text-[#00F0FF] font-black scale-105'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <LayoutDashboard className={`w-4.5 h-4.5 stroke-[2.3] ${viewMode === 'parent-dashboard' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
          <span className="text-[9.5px] leading-tight truncate">Overview</span>
          {viewMode === 'parent-dashboard' && (
            <span className="w-1 h-1 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
          )}
        </button>



        {/* 3. Quick Set Homework Button (Center Action - Glowing Neon Logo Gradient) */}
        <button
          onClick={() => setViewMode('parent-editor')}
          className="relative -top-2 flex flex-col items-center group cursor-pointer shrink-0 px-1"
          title="Set homework for Jamie"
        >
          <div className={`w-11 h-11 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#00A8FF] to-[#0055EE] text-slate-950 flex items-center justify-center shadow-[0_0_18px_rgba(0,240,255,0.65)] hover:shadow-[0_0_24px_rgba(0,240,255,0.85)] hover:scale-105 transition-all active:scale-95 ring-3 ring-[#030A18] group-hover:ring-cyan-400/60 ${
            viewMode === 'parent-editor' ? 'ring-cyan-300' : ''
          }`}>
            <Plus className="w-5 h-5 stroke-[3.5] text-slate-950" />
          </div>
          <span className="text-[9.5px] font-black text-cyan-300 mt-0.5 whitespace-nowrap">Set Homework</span>
        </button>

        {/* 4. Progress / Rhythm (Screen 6) */}
        <button
          onClick={() => setViewMode('progress-settings')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1 rounded-xl transition cursor-pointer min-w-0 ${
            viewMode === 'progress-settings'
              ? 'text-[#00F0FF] font-black scale-105'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <BarChart3 className={`w-4.5 h-4.5 stroke-[2.3] ${viewMode === 'progress-settings' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
          <span className="text-[9.5px] leading-tight truncate">Progress</span>
          {viewMode === 'progress-settings' && (
            <span className="w-1 h-1 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
          )}
        </button>

        {/* 5. Family Settings (Screen 1 & 6) */}
        <button
          onClick={() => setViewMode('account-onboarding')}
          className={`flex flex-col items-center gap-0.5 py-1 px-1 rounded-xl transition cursor-pointer min-w-0 ${
            viewMode === 'account-onboarding'
              ? 'text-[#00F0FF] font-black scale-105'
              : 'text-slate-400 hover:text-cyan-300'
          }`}
        >
          <Settings className={`w-4.5 h-4.5 stroke-[2.3] ${viewMode === 'account-onboarding' ? 'text-[#00F0FF] drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]' : ''}`} />
          <span className="text-[9.5px] leading-tight text-center truncate">Family</span>
          {viewMode === 'account-onboarding' && (
            <span className="w-1 h-1 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
          )}
        </button>
      </div>
    </nav>
  );
};
