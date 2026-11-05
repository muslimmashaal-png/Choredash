import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  getMonthCalendarGrid, 
  toIsoDate, 
  formatTwoDigits 
} from '../../utils/timeGreeting';

export const FamilyCalendarModal: React.FC = () => {
  const { 
    calendarModalOpen, 
    setCalendarModalOpen, 
    selectedCalendarDate, 
    setSelectedCalendarDate,
    currentDate,
    timeGreeting,
    tasks,
    activeRole,
    setViewMode,
    selectTask
  } = useApp();

  const [viewYear, setViewYear] = useState(() => selectedCalendarDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => selectedCalendarDate.getMonth());

  if (!calendarModalOpen) return null;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleJumpToToday = () => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedCalendarDate(today);
  };

  const handleSelectDay = (date: Date) => {
    setSelectedCalendarDate(date);
    setViewYear(date.getFullYear());
    setViewMonth(date.getMonth());
  };

  const grid = getMonthCalendarGrid(viewYear, viewMonth, currentDate, selectedCalendarDate);

  const selectedIso = toIsoDate(selectedCalendarDate);
  const todayIso = toIsoDate(currentDate);

  // Check tasks due on selected date
  const tasksForSelectedDate = tasks.filter((t) => {
    // Match explicit dueDate or if selected is today and task dueDisplay says today
    return t.dueDate === selectedIso || (selectedIso === todayIso && t.dueDisplay?.toLowerCase().includes('today'));
  });

  const isSelectedToday = selectedIso === todayIso;

  const selectedDayFormatted = selectedCalendarDate.toLocaleDateString([], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-[#030A18] w-full max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl border border-cyan-500/30 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-250 text-white">
        
        {/* Header with Real Live Clock */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/30 flex items-center justify-between bg-gradient-to-r from-[#020816] via-[#051838] to-[#020D26] text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold font-display tracking-tight text-white flex items-center gap-1.5">
                  <span>Family Calendar</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
                </h2>
              </div>
              <p className="text-[11px] text-cyan-200/90 flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span className="font-semibold text-white">{timeGreeting.dateDisplay}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setCalendarModalOpen(false)}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer border border-slate-700/60"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Calendar Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-[#020816]">
          
          {/* Month / Year Navigator Bar */}
          <div className="flex items-center justify-between bg-[#05132B] border border-slate-800/80 rounded-2xl p-2 px-3">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition cursor-pointer"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white font-display">
                {monthNames[viewMonth]} {viewYear}
              </span>
              <button
                onClick={handleJumpToToday}
                className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/60 px-2 py-0.5 rounded-full transition cursor-pointer shadow-xs"
              >
                Today
              </button>
            </div>

            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-300 transition cursor-pointer"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday Header */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div 
                key={day} 
                className={`text-[11px] font-bold py-1 ${idx >= 5 ? 'text-amber-400' : 'text-slate-400'}`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Monthly Grid */}
          <div className="grid grid-cols-7 gap-1">
            {grid.map((cell, idx) => {
              const hasTasks = tasks.some((t) => t.dueDate === cell.isoDate || (cell.isToday && t.dueDisplay?.toLowerCase().includes('today')));
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectDay(cell.date)}
                  className={`h-11 rounded-xl flex flex-col items-center justify-center relative transition cursor-pointer ${
                    cell.isSelected
                      ? 'bg-gradient-to-b from-[#00F0FF] to-[#0077FF] text-slate-950 font-black shadow-[0_0_10px_rgba(0,240,255,0.5)] ring-1 ring-white/70 scale-102 z-10'
                      : cell.isToday
                      ? 'bg-cyan-950/80 text-cyan-200 font-extrabold border-2 border-cyan-400'
                      : cell.isCurrentMonth
                      ? 'text-slate-200 hover:bg-slate-800/80 font-semibold bg-slate-900/60'
                      : 'text-slate-600 hover:bg-slate-900/30'
                  }`}
                >
                  <span className="text-xs">{cell.dayNumber}</span>
                  
                  {/* Task indicator dots */}
                  {hasTasks && (
                    <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      cell.isSelected ? 'bg-slate-950' : cell.isToday ? 'bg-cyan-300' : 'bg-[#00F0FF]'
                    }`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Summary & Tasks */}
          <div className="bg-[#05132B] border border-slate-800/90 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {isSelectedToday ? "Today's Agenda" : "Selected Date"}
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white mt-0.5">
                  {selectedDayFormatted}
                </div>
              </div>

              {activeRole === 'parent' ? (
                <button
                  onClick={() => {
                    setCalendarModalOpen(false);
                    setViewMode('parent-editor');
                  }}
                  className="px-2.5 py-1 bg-gradient-to-r from-[#00F0FF] to-[#0080FF] hover:brightness-110 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>Set Task</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setCalendarModalOpen(false);
                    setViewMode('student-schedule');
                  }}
                  className="px-2.5 py-1 bg-gradient-to-r from-[#00F0FF] to-[#0080FF] hover:brightness-110 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>Open Day</span>
                  <ArrowRight className="w-3 h-3 stroke-[3]" />
                </button>
              )}
            </div>

            {/* List of Tasks for this day */}
            <div className="space-y-1.5 pt-1">
              {tasksForSelectedDate.length === 0 ? (
                <div className="text-center py-3 text-xs text-slate-400 bg-slate-900/60 rounded-xl border border-slate-800/70">
                  No homework due on this date.
                </div>
              ) : (
                tasksForSelectedDate.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => {
                      selectTask(task.id);
                      setCalendarModalOpen(false);
                      setViewMode(activeRole === 'student' ? 'student-task' : 'parent-dashboard');
                    }}
                    className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-cyan-400 shadow-2xs flex items-center justify-between gap-2 cursor-pointer transition group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded border border-cyan-500/50">
                          {task.subject}
                        </span>
                        <h4 className="text-xs font-bold text-slate-100 truncate group-hover:text-cyan-300 transition">
                          {task.title}
                        </h4>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-slate-400" /> {task.dueTime}
                        </span>
                        <span>·</span>
                        <span className="text-amber-400 font-bold">+{task.points} pts</span>
                      </div>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${
                      task.status === 'completed'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60'
                        : 'bg-amber-950/80 text-amber-300 border-amber-500/60'
                    }`}>
                      {task.status === 'completed' ? 'Done ✓' : 'Due'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Real-time synced across Jamie & Alex
          </span>
          <button
            onClick={() => setCalendarModalOpen(false)}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer border border-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
