import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Award, 
  BarChart2, 
  Settings, 
  Sparkles,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

import { ChoreDashLogo } from './ChoreDashLogo';

export const Sidebar: React.FC<{ activeTab?: string; onSelectTab?: (tab: string) => void }> = ({
  activeTab = 'overview',
  onSelectTab,
}) => {
  const { viewMode, setViewMode, parent, openCarerPrizesModal } = useApp();

  const handleNavClick = (id: string) => {
    if (onSelectTab) onSelectTab(id);

    if (id === 'overview') {
      setViewMode('parent-dashboard');
    } else if (id === 'homework') {
      setViewMode('parent-dashboard');
    } else if (id === 'rewards') {
      openCarerPrizesModal('prizes');
    } else if (id === 'progress') {
      setViewMode('progress-settings');
    } else if (id === 'settings') {
      setViewMode('progress-settings');
    } else if (id === 'schedule') {
      setViewMode('student-schedule');
    }
  };

  const currentActive = viewMode === 'progress-settings' ? 'progress' : activeTab;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'homework', label: 'Homework', icon: FileText },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'progress', label: 'Progress', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 bg-[#111827] text-slate-300 flex flex-col shrink-0 min-h-[calc(100vh-45px)] border-r border-slate-800/80">
      {/* Brand Header */}
      <div className="p-5 pb-4 flex items-center justify-between border-b border-slate-800/60">
        <ChoreDashLogo variant="horizontal" size="sm" showSubtitle={false} theme="dark" />
      </div>

      {/* Workspace category label */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
          Family Workspace
        </p>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentActive === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-teal-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-teal-400" />}
            </button>
          );
        })}
      </nav>

      {/* User Profile Card */}
      <div className="p-3 m-3 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-slate-800">
            AM
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">{parent.name}</div>
            <div className="text-[11px] text-slate-400 truncate">{parent.role}</div>
          </div>
        </div>
        <button className="text-slate-500 hover:text-slate-300 p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
