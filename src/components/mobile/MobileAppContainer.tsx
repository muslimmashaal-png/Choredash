import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MobileHeader } from './MobileHeader';
import { StudentSchedule } from '../views/StudentSchedule';
import { StudentTaskDetail } from '../views/StudentTaskDetail';
import { ParentDashboard } from '../views/ParentDashboard';
import { ParentHomeworkEditor } from '../views/ParentHomeworkEditor';
import { ProgressAndSettings } from '../views/ProgressAndSettings';
import { FamilyOnboarding } from '../views/FamilyOnboarding';
import { DualLiveSyncView } from '../views/DualLiveSyncView';
import { AuthScreen } from '../auth/AuthScreen';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone,
  Maximize2,
} from 'lucide-react';

export const MobileAppContainer: React.FC = () => {
  const { 
    viewMode, 
    setViewMode, 
    activeDevice,
    timeGreeting,
    isAuthenticated,
  } = useApp();

  const [showPhoneCase, setShowPhoneCase] = useState<boolean>(true);

  // If user selected dual sync mode specifically
  if (viewMode === 'dual-sync') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900">
        <div className="bg-slate-950 px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs text-slate-300">
          <button
            onClick={() => setViewMode(activeDevice === 'student-device' ? 'student-schedule' : 'parent-dashboard')}
            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
          >
            ← Back to Phone View
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse"></span>
            <span className="font-semibold text-slate-300">Dual Device Real-Time Sync</span>
          </div>
        </div>
        <DualLiveSyncView />
      </div>
    );
  }

  return (
    <div className="h-[100dvh] max-h-[100dvh] w-full bg-[#020816] flex flex-col items-center justify-between p-1 sm:p-1.5 sm:py-2 relative overflow-hidden select-none">
      {/* Ambient neon backdrop directly reflecting the logo glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[750px] bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.14)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-12 right-12 w-64 h-64 bg-[radial-gradient(ellipse_at_center,rgba(0,102,255,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Bar Outside the Program: neatly positions controls without overlapping phone screen */}
      <div className="w-full max-w-[440px] flex items-center justify-between px-2 py-1 shrink-0 z-50">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF] animate-pulse"></span>
          <span className="text-[11px] font-bold text-slate-300 tracking-wide uppercase font-mono">
            StudyFlow · Mobile
          </span>
        </div>

        {/* External Button: Outside the program so you can put on / take off the phone black outline */}
        <button
          type="button"
          onClick={() => setShowPhoneCase(prev => !prev)}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 hover:bg-neutral-900 text-neutral-100 border border-neutral-700/80 shadow-[0_4px_16px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-200 cursor-pointer group active:scale-95 shrink-0"
          title={showPhoneCase ? "Click to take off the black phone outline" : "Click to put on the black phone outline"}
          aria-label="Toggle black phone outline"
        >
          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${showPhoneCase ? 'bg-cyan-400 shadow-[0_0_6px_#00F0FF]' : 'bg-neutral-600'}`} />
          {showPhoneCase ? (
            <Smartphone className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400 group-hover:scale-110 transition-transform" />
          )}
          <span className="text-[11px] font-semibold tracking-wide">
            {showPhoneCase ? 'Black Outline: ON' : 'Black Outline: OFF'}
          </span>
          <span className="text-[10px] text-cyan-400 font-medium pl-1.5 border-l border-neutral-800">
            {showPhoneCase ? 'Take Off' : 'Put On'}
          </span>
        </button>
      </div>

      {/* Centered Phone Wrapper: Taller phone frame taking full height with modern elongated aspect ratio */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0 py-0.5">
        <div 
          className={`relative w-full flex flex-col transition-all duration-300 ${
            showPhoneCase
              ? 'max-w-[395px] h-full sm:h-[min(890px,calc(100dvh-46px))] max-h-full bg-black sm:rounded-[50px] p-0 sm:p-2 shadow-[0_20px_60px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.08)] border-[3.5px] border-black ring-1 ring-neutral-900 flex-col'
              : 'max-w-[420px] h-full sm:h-[min(890px,calc(100dvh-46px))] max-h-full bg-transparent p-0 shadow-none ring-0 sm:rounded-2xl sm:border sm:border-black/70 sm:shadow-2xl overflow-hidden'
          }`}
        >
          {/* Physical Black Case Buttons - positioned gracefully along taller frame */}
          {showPhoneCase && (
            <>
              {/* Left side black buttons */}
              <div className="hidden sm:block absolute -left-[6px] top-28 w-[4px] h-7 bg-[#1c1c1e] border border-black rounded-l-md pointer-events-none"></div>
              <div className="hidden sm:block absolute -left-[6px] top-40 w-[4px] h-12 bg-[#1c1c1e] border border-black rounded-l-md pointer-events-none"></div>
              <div className="hidden sm:block absolute -left-[6px] top-56 w-[4px] h-12 bg-[#1c1c1e] border border-black rounded-l-md pointer-events-none"></div>
              {/* Right side black power button */}
              <div className="hidden sm:block absolute -right-[6px] top-36 w-[4px] h-16 bg-[#1c1c1e] border border-black rounded-r-md pointer-events-none"></div>
            </>
          )}
          
          {/* Inner Screen */}
          <div 
            className={`relative w-full h-full overflow-hidden flex flex-col flex-1 min-h-0 transition-all duration-300 ${
              showPhoneCase ? 'sm:rounded-[38px]' : 'sm:rounded-2xl'
            } bg-[#020816]`}
          >
            
            {/* Phone Status Bar: camera cutout is inside status bar, only shown when phone case is active */}
            {showPhoneCase && (
              <div className="px-4 h-7 flex items-center justify-between text-[10.5px] font-semibold select-none z-30 shrink-0 border-b bg-[#020816] text-slate-300 border-slate-800/80">
                <span className="font-bold tracking-tight text-[10.5px] w-12 text-left whitespace-nowrap text-slate-200">{timeGreeting.timeDisplay}</span>

                {/* Sleek Dynamic Island / Camera Cutout */}
                <div className="w-14 h-3 bg-black rounded-full flex items-center justify-between px-2 shadow-xs pointer-events-none shrink-0 border border-slate-800/60">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-800"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-800/60"></div>
                </div>

                <div className="flex items-center gap-1.5 w-12 justify-end text-slate-400">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <Battery className="w-3 h-3" />
                </div>
              </div>
            )}

            {/* Conditional Auth Screen vs Main App Views */}
            {!isAuthenticated || viewMode === 'login' ? (
              <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
                <AuthScreen />
              </div>
            ) : (
              <>
                {/* Mobile Header: Starts right below status bar (or at top when case is off) */}
                <MobileHeader />

                {/* Phone Viewport: Fits everything neatly with zero scrolling */}
                <div className="flex-1 overflow-hidden relative flex flex-col min-h-0">
                  {viewMode === 'student-schedule' && <StudentSchedule asStandalone={false} />}
                  {viewMode === 'student-task' && <StudentTaskDetail asStandalone={false} />}
                  {viewMode === 'parent-dashboard' && <ParentDashboard isMobile={true} />}
                  {viewMode === 'parent-editor' && <ParentHomeworkEditor isMobile={true} />}
                  {viewMode === 'progress-settings' && <ProgressAndSettings isMobile={true} />}
                  {viewMode === 'account-onboarding' && <FamilyOnboarding asStandalone={false} />}
                </div>
              </>
            )}
          </div>

          {/* Bottom Home Indicator - only shown when phone case is active */}
          {showPhoneCase && (
            <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-slate-400/40 rounded-full z-40 pointer-events-none"></div>
          )}
        </div>
      </div>
    </div>
  );
};
