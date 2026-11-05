import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PhoneFrame: React.FC<{ children: React.ReactNode; screenTitle?: string }> = ({
  children,
  screenTitle,
}) => {
  const { timeGreeting, currentDate, openCalendarModal } = useApp();

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 min-h-[calc(100vh-60px)]">
      {screenTitle && (
        <div className="text-center mb-2.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700/60 shadow-xs">
            {screenTitle}
          </span>
        </div>
      )}

      {/* Realistic Phone Bezel Frame */}
      <div className="relative w-full max-w-[390px] h-[830px] max-h-[calc(100vh-80px)] bg-slate-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-slate-800 flex flex-col overflow-hidden">
        {/* Inner Phone Screen Content */}
        <div className="relative w-full h-full bg-[#F6F8F7] rounded-[40px] overflow-hidden flex flex-col flex-1">
          {/* Status Bar with integrated sleek Camera Island (strictly isolated inside status bar) */}
          <div className="h-9 px-5 flex items-center justify-between text-slate-800 text-[11px] font-semibold select-none z-20 shrink-0 bg-white/95 border-b border-slate-100">
            <button
              onClick={() => openCalendarModal(currentDate)}
              className="font-bold tracking-tight text-[11px] w-14 text-left whitespace-nowrap hover:text-teal-700 transition cursor-pointer"
              title="Click to view full real-time calendar"
            >
              {timeGreeting.timeDisplay}
            </button>
            
            {/* Compact Dynamic Island / Camera Notch (64px width, completely clear of text) */}
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

          {/* Scrollable View Content: safely starts below status bar */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>
        </div>

        {/* Home indicator bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-400/40 rounded-full z-30 pointer-events-none"></div>
      </div>
    </div>
  );
};
