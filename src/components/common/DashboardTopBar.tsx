import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Plus, ChevronDown, Check, User } from 'lucide-react';

export const DashboardTopBar: React.FC = () => {
  const { parent, student, searchQuery, setSearchQuery, setViewMode } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Left title & date */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
          {parent.name.split(' ')[0]}'s Dashboard
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
        </h2>
        <p className="text-xs text-slate-500">
          Thursday, 1 October · <span className="text-slate-700 font-medium">{student.name.split(' ')[0]}'s next task: 4:00 PM</span>
        </p>
      </div>

      {/* Right controls: Search, Quick Add, Child Profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search homework..."
            className="w-48 sm:w-64 pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition"
          />
        </div>

        {/* Quick Add Homework Button */}
        <button
          onClick={() => setViewMode('parent-editor')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/70 rounded-xl transition cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 text-teal-700" />
          <span>Quick add task</span>
        </button>

        {/* Child Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 transition cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
              J
            </div>
            <span>{student.name.split(' ')[0]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 animate-in fade-in duration-150">
              <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Active Child
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-teal-50 text-teal-900 border border-teal-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                    J
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{student.name}</div>
                    <div className="text-[10px] text-slate-500">{student.grade}</div>
                  </div>
                </div>
                <Check className="w-4 h-4 text-teal-600" />
              </div>

              <div className="border-t border-slate-100 my-1 pt-1">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setViewMode('account-onboarding');
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>+ Link another child</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
