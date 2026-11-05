import React from 'react';
import { useApp } from '../../context/AppContext';
import { ParentDashboard } from './ParentDashboard';
import { StudentSchedule } from './StudentSchedule';
import { 
  Sparkles, 
  ArrowRightLeft, 
  Smartphone, 
  ShieldCheck, 
  Wifi, 
  Signal, 
  Battery, 
  Gift, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';

export const DualLiveSyncView: React.FC = () => {
  const { 
    student, 
    parent, 
    tasks, 
    rewards, 
    openCarerPrizesModal,
    timeGreeting
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-white text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-teal-400 font-bold border border-slate-700">
            <ArrowRightLeft className="w-3.5 h-3.5 animate-pulse" />
            <span>Separate Physical Devices Sync</span>
          </div>
          <span className="text-slate-300 hidden md:inline">
            Demonstrating strict device separation: Carer Alex & Student Jamie each have their own phone.
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-400 font-mono font-bold text-[11px]">
            Connected via Code: {student.familyCode}
          </span>
        </div>
      </div>

      {/* Main Dual Phone Stage */}
      <div className="flex-1 p-4 lg:p-8 flex flex-col xl:flex-row items-center justify-center gap-8 overflow-y-auto">
        
        {/* Device 1: Alex's Carer Phone */}
        <div className="flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-orange-400">
            <ShieldCheck className="w-4 h-4 text-orange-500" />
            <span>Device 1: Alex's Carer Phone</span>
            <span className="text-[10px] text-slate-500 font-normal">(Parent / Carer)</span>
          </div>

          {/* Realistic Phone 1 Frame */}
          <div className="relative w-full max-w-[390px] h-[820px] max-h-[calc(100vh-140px)] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col overflow-hidden">
            <div className="relative w-full h-full bg-[#F6F8F7] rounded-[40px] overflow-hidden flex flex-col flex-1">
              
              {/* Phone Status Bar (Contains Dynamic Island / Camera cutout) */}
              <div className="h-9 px-5 flex items-center justify-between text-slate-800 text-[11px] font-semibold select-none z-20 shrink-0 bg-white/95 border-b border-slate-100">
                <span className="font-bold tracking-tight text-[11px] w-14 text-left whitespace-nowrap">{timeGreeting.timeDisplay}</span>
                
                {/* Compact Camera cutout */}
                <div className="w-16 h-4 bg-black rounded-full flex items-center justify-between px-2 shadow-xs pointer-events-none shrink-0">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800/60"></div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700 w-12 justify-end">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Phone 1 Screen Header */}
              <div className="px-4 py-2 bg-white/95 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-none">Alex's Phone</h4>
                    <span className="text-[10px] text-orange-600 font-medium">Carer Management</span>
                  </div>
                </div>

                <button
                  onClick={() => openCarerPrizesModal('points')}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-[10px] shadow-xs cursor-pointer"
                >
                  <Gift className="w-2.5 h-2.5" />
                  <span>Prizes & Pts</span>
                </button>
              </div>

              {/* Scrollable Parent Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
                <ParentDashboard isMobile={true} />
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/40 rounded-full z-30 pointer-events-none"></div>
          </div>
        </div>

        {/* Central Sync Connector Badge */}
        <div className="flex flex-col items-center justify-center gap-2 text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-teal-400 shadow-xl">
            <ArrowRightLeft className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-xs font-bold text-white tracking-wide">
            Live Cloud Sync
          </div>
          <div className="text-[11px] text-slate-400 max-w-[160px] leading-tight">
            Actions on Alex's phone sync immediately to Jamie's phone!
          </div>
        </div>

        {/* Device 2: Jamie's Student Phone */}
        <div className="flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-400">
            <Smartphone className="w-4 h-4 text-emerald-500" />
            <span>Device 2: Jamie's Student Phone</span>
            <span className="text-[10px] text-slate-500 font-normal">(Student Companion)</span>
          </div>

          {/* Realistic Phone 2 Frame */}
          <div className="relative w-full max-w-[390px] h-[820px] max-h-[calc(100vh-140px)] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col overflow-hidden">
            <div className="relative w-full h-full bg-[#F6F8F7] rounded-[40px] overflow-hidden flex flex-col flex-1">
              
              {/* Phone Status Bar (Contains Dynamic Island / Camera cutout) */}
              <div className="h-9 px-5 flex items-center justify-between text-slate-800 text-[11px] font-semibold select-none z-20 shrink-0 bg-white/95 border-b border-slate-100">
                <span className="font-bold tracking-tight text-[11px] w-14 text-left whitespace-nowrap">{timeGreeting.timeDisplay}</span>
                
                {/* Compact Camera cutout */}
                <div className="w-16 h-4 bg-black rounded-full flex items-center justify-between px-2 shadow-xs pointer-events-none shrink-0">
                  <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800/60"></div>
                </div>

                <div className="flex items-center gap-1.5 text-slate-700 w-12 justify-end">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Phone 2 Screen Header */}
              <div className="px-4 py-2 bg-white/95 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    J
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-none">Jamie's Phone</h4>
                    <span className="text-[10px] text-emerald-600 font-medium">Student Companion</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold text-orange-700">
                  <Sparkles className="w-2.5 h-2.5 text-orange-500 fill-orange-400" />
                  <span>{student.points} pts</span>
                </div>
              </div>

              {/* Scrollable Student Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
                <StudentSchedule asStandalone={false} />
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/40 rounded-full z-30 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
