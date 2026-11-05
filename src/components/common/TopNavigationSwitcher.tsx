import React from 'react';
import { useApp } from '../../context/AppContext';
import { ViewMode } from '../../types';
import { 
  LayoutDashboard, 
  PenSquare, 
  Smartphone, 
  CheckSquare, 
  BarChart3, 
  UserPlus, 
  Columns,
  RefreshCw,
  Sparkles
} from 'lucide-react';

import { ChoreDashLogo } from './ChoreDashLogo';

export const TopNavigationSwitcher: React.FC = () => {
  const { viewMode, setViewMode, student, crossDeviceSync, setCrossDeviceSync, resetToDemoData } = useApp();

  const screens: { id: ViewMode; label: string; icon: React.ReactNode; tag?: string }[] = [
    { id: 'parent-dashboard', label: 'Parent Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'parent-editor', label: 'Homework Editor', icon: <PenSquare className="w-4 h-4" /> },
    { id: 'student-schedule', label: 'Student Schedule', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'student-task', label: 'Student Task View', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'progress-settings', label: 'Progress & Settings', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'account-onboarding', label: 'Family Pairing', icon: <UserPlus className="w-4 h-4" /> },
    { id: 'dual-sync', label: 'Dual Live View', icon: <Columns className="w-4 h-4" />, tag: 'Live Sync' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A] border-b border-slate-800 text-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto">
        {/* Brand logo & tagline */}
        <div className="flex items-center gap-3 shrink-0">
          <ChoreDashLogo variant="horizontal" size="sm" showSubtitle={false} theme="dark" />
          <span className="hidden lg:inline text-xs text-slate-400 border-l border-slate-700 pl-3">
            Prototype Showcase · 6 Screen Experience
          </span>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shrink-0">
          {screens.map((screen) => {
            const isActive = viewMode === screen.id;
            return (
              <button
                key={screen.id}
                onClick={() => setViewMode(screen.id)}
                className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
                title={`Switch to ${screen.label}`}
              >
                {screen.icon}
                <span className="hidden sm:inline">{screen.label}</span>
                {screen.tag && (
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-bold px-1.5 py-0.2 rounded uppercase">
                    {screen.tag}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right quick stats & reset */}
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              Jamie: <strong className="text-emerald-300">{student.points} pts</strong>
            </span>
          </div>

          <button
            onClick={() => setCrossDeviceSync(!crossDeviceSync)}
            className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded border text-[11px] transition cursor-pointer ${
              crossDeviceSync
                ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle cross-device real-time sync simulation"
          >
            <span>Sync:</span>
            <span className="font-semibold">{crossDeviceSync ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={resetToDemoData}
            className="flex items-center gap-1 text-slate-400 hover:text-white hover:bg-slate-800 px-2 py-1 rounded transition text-xs cursor-pointer"
            title="Reset data to initial state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
