import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { DashboardTopBar } from '../common/DashboardTopBar';
import { 
  Plus, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  MoreHorizontal, 
  ChevronLeft,
  ChevronRight, 
  MessageSquare, 
  FileCheck, 
  Check, 
  Eye, 
  Edit2, 
  Trash2, 
  Coins, 
  Gift,
  LayoutDashboard,
  BarChart3,
  Settings,
  Award
} from 'lucide-react';
import { HomeworkTask, TaskStatus } from '../../types';
import { getWeekDates, toIsoDate } from '../../utils/timeGreeting';

export const ParentDashboard: React.FC<{ isMobile?: boolean }> = ({ isMobile = true }) => {
  const { 
    tasks, 
    student, 
    rewards,
    searchQuery, 
    viewStyle, 
    setViewStyle, 
    setViewMode, 
    selectTask, 
    updateTaskStatus,
    deleteTask,
    parent,
    timeGreeting,
    currentDate,
    selectedCalendarDate,
    setSelectedCalendarDate,
    openCalendarModal,
  } = useApp();

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Tasks list (filtered only if search query is entered)
  const filteredTasks = tasks.filter((t) => {
    if (searchQuery) {
      const matchText = (t.title + ' ' + t.subject + ' ' + t.instructions).toLowerCase();
      if (!matchText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(0,240,255,0.25)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse"></span>
            In progress
          </span>
        );
      case 'not_started':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-slate-800/90 text-slate-300 border border-slate-700/80">
            Not started
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-rose-950/80 text-rose-300 border border-rose-500/60">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Overdue
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/60">
            <FileCheck className="w-3 h-3 text-emerald-400" />
            Submitted
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-semibold bg-emerald-900/50 text-emerald-300 border border-emerald-400/60 shadow-[0_0_6px_rgba(16,185,129,0.25)]">
            <Check className="w-3 h-3 text-emerald-400" />
            Completed
          </span>
        );
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Maths':
        return 'text-cyan-300 bg-cyan-950/80 border-cyan-500/50';
      case 'Science':
        return 'text-emerald-300 bg-emerald-950/80 border-emerald-500/50';
      case 'English':
        return 'text-amber-300 bg-amber-950/80 border-amber-500/50';
      case 'Languages':
        return 'text-purple-300 bg-purple-950/80 border-purple-500/50';
      case 'History':
        return 'text-rose-300 bg-rose-950/80 border-rose-500/50';
      default:
        return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  const handleOpenTask = (task: HomeworkTask) => {
    selectTask(task.id);
    setViewMode('parent-editor');
  };

  const handleEditTask = (task: HomeworkTask) => {
    selectTask(task.id);
    setViewMode('parent-editor');
  };

  // Calendar State & Calculations for Home Screen
  const activeDate = selectedCalendarDate || currentDate;
  const activeDateIso = toIsoDate(activeDate);

  const weekDays = getWeekDates(activeDate, currentDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthYear = `${monthNames[activeDate.getMonth()]} ${activeDate.getFullYear()}`;
  const isCurrentWeekToday = weekDays.some((d) => d.isToday);

  const handlePrevWeek = () => {
    const prev = new Date(activeDate);
    prev.setDate(prev.getDate() - 7);
    setSelectedCalendarDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(activeDate);
    next.setDate(next.getDate() + 7);
    setSelectedCalendarDate(next);
  };

  const handleJumpToday = () => {
    setSelectedCalendarDate(currentDate);
  };

  // Map tasks to dates for calendar indicators
  const taskCountByDate = tasks.reduce<Record<string, number>>((acc, t) => {
    if (t.dueDate) {
      acc[t.dueDate] = (acc[t.dueDate] || 0) + 1;
    }
    return acc;
  }, {});

  const mainDashboardContent = (
    <main className="p-2 space-y-1.5 flex-1 flex flex-col justify-start overflow-hidden bg-[#020816]">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-1.5 px-0.5 pt-0.5 shrink-0">
        <div>
          <h1 className="text-xs sm:text-sm font-black tracking-tight text-white font-display flex items-center gap-1.5">
            <span>{parent.name.split(' ')[0]} · {student.name.split(' ')[0]}'s week</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
          </h1>
          <p className="text-[9.5px] text-slate-400">
            Homework tasks, schedule & due dates
          </p>
        </div>

        {/* Date badge with calendar trigger */}
        <button
          onClick={() => openCalendarModal(currentDate)}
          className="inline-flex items-center gap-1 text-[9.5px] font-black text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/50 px-2 py-0.5 rounded-full transition cursor-pointer shadow-[0_0_8px_rgba(0,240,255,0.25)] shrink-0"
          title="Open Family Calendar Modal"
        >
          <Calendar className="w-2.5 h-2.5 text-[#00F0FF]" />
          <span>{timeGreeting.dateDisplay}</span>
        </button>
      </div>

      {/* Home Screen Interactive Calendar Strip */}
      <div className="w-full bg-[#05132B]/90 rounded-xl border border-slate-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.35)] p-1.5 sm:p-2 shrink-0">
        <div className="flex items-center justify-between gap-1 mb-1 px-0.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span className="text-[11.5px] sm:text-xs font-black text-white font-display">
              {currentMonthYear}
            </span>
            {isCurrentWeekToday && (
              <span className="text-[8.5px] font-black text-cyan-300 bg-cyan-950/80 px-1.5 py-0.2 rounded-full border border-cyan-500/60 shadow-2xs">
                This week
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevWeek}
              className="w-5 h-5 rounded-md bg-slate-800/90 border border-slate-700/60 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition cursor-pointer"
              title="Previous week"
            >
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={handleJumpToday}
              className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-slate-800/90 border border-slate-700/60 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
              title="Jump to today"
            >
              Today
            </button>
            <button
              onClick={handleNextWeek}
              className="w-5 h-5 rounded-md bg-slate-800/90 border border-slate-700/60 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition cursor-pointer"
              title="Next week"
            >
              <ChevronRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => openCalendarModal(activeDate)}
              className="text-[9px] font-bold text-cyan-400 hover:text-cyan-300 pl-1 border-l border-slate-700/80 transition cursor-pointer flex items-center gap-0.5"
              title="Full Month View"
            >
              <span>Month</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>

        {/* 7 Days of the Week */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const isSelected = day.full === activeDateIso;
            const taskCount = taskCountByDate[day.full] || 0;
            
            return (
              <button
                key={day.full}
                type="button"
                onClick={() => setSelectedCalendarDate(day.date)}
                className={`py-1 px-0.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#00F0FF] to-[#0077FF] text-slate-950 font-black shadow-[0_0_10px_rgba(0,240,255,0.5)] ring-1 ring-white/70'
                    : day.isToday
                    ? 'bg-cyan-950/80 text-cyan-200 border border-cyan-400/80 font-bold shadow-[0_0_6px_rgba(0,240,255,0.25)]'
                    : 'bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 border border-slate-700/50'
                }`}
              >
                <span className={`text-[8.5px] uppercase tracking-wider ${isSelected ? 'text-slate-950 font-black' : 'text-slate-400 font-semibold'}`}>
                  {day.day}
                </span>
                <span className={`text-[11px] font-bold leading-tight mt-0.5 ${isSelected ? 'text-slate-950 font-black' : 'text-slate-100'}`}>
                  {day.num}
                </span>
                <div className="h-1 flex items-center justify-center gap-0.5 mt-0.5">
                  {taskCount > 0 ? (
                    <span className={`w-1 h-1 rounded-full ${isSelected ? 'bg-slate-950' : 'bg-cyan-400 animate-pulse'}`} />
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Set Homework Action Banner for Parent (Compact, Logo Neon Styling) */}
      <div 
        onClick={() => setViewMode('parent-editor')}
        className="bg-gradient-to-r from-[#020816] via-[#051838] to-[#020D26] hover:brightness-110 text-white rounded-xl p-1.5 shadow-xs border border-cyan-400/40 flex items-center justify-between gap-2 cursor-pointer transition active:scale-99 group relative overflow-hidden shrink-0"
      >
        <div className="flex items-center gap-2 min-w-0 relative z-10">
          <div className="w-6.5 h-6.5 rounded-lg bg-gradient-to-tr from-[#00F0FF] to-[#0066FF] flex items-center justify-center text-slate-950 shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.5)]">
            <Plus className="w-3.5 h-3.5 stroke-[3.5]" />
          </div>
          <div className="min-w-0">
            <h3 className="text-[11.5px] font-black font-display truncate flex items-center gap-1">
              <span>Set Homework for {student.name.split(' ')[0]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]"></span>
            </h3>
            <p className="text-[9px] text-cyan-100/70 truncate">
              Assign worksheets, questions & deadlines
            </p>
          </div>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('parent-editor');
          }}
          className="relative z-10 px-2 py-1 bg-gradient-to-r from-[#00F0FF] to-[#0080FF] hover:brightness-110 text-slate-950 font-black text-[9.5px] rounded-lg shadow-xs shrink-0 transition flex items-center gap-0.5 cursor-pointer ring-1 ring-white/60"
        >
          <span>+ Set</span>
          <ChevronRight className="w-3 h-3 stroke-[3]" />
        </button>
      </div>

      {/* Homework Status (Full Width - Dark Glass Styling) */}
      <div className="w-full bg-[#05132B]/90 rounded-xl border border-slate-800/80 shadow-[0_4px_16px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col flex-1 min-h-0">
          {/* Header with Title & View Switcher */}
          <div className="px-2.5 py-1.5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between gap-1.5 shrink-0">
            <div>
              <h2 className="text-xs font-bold text-white tracking-tight">
                Homework status
              </h2>
              <p className="text-[9px] text-slate-400">
                Synced in real-time
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setViewMode('parent-editor')}
                className="px-2 py-0.5 text-[10px] font-bold text-slate-950 bg-gradient-to-r from-[#00F0FF] to-[#00A8FF] hover:brightness-110 rounded-md shadow-2xs flex items-center gap-0.5 transition cursor-pointer"
                title="Set new homework"
              >
                <Plus className="w-2.5 h-2.5 stroke-[2.5]" />
                <span>+ Set</span>
              </button>

              {/* List / Board Switcher */}
              <div className="bg-slate-800/80 p-0.5 rounded-md flex items-center border border-slate-700/60">
                <button
                  onClick={() => setViewStyle('list')}
                  className={`px-1.5 py-0.5 text-[10px] rounded transition cursor-pointer ${
                    viewStyle === 'list' 
                      ? 'bg-[#00F0FF] text-slate-950 font-black shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewStyle('board')}
                  className={`px-1.5 py-0.5 text-[10px] rounded transition cursor-pointer ${
                    viewStyle === 'board' 
                      ? 'bg-[#00F0FF] text-slate-950 font-black shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Board
                </button>
              </div>
            </div>
          </div>

          {/* List View Mode */}
          {viewStyle === 'list' ? (
            <div className="divide-y divide-slate-800/70 flex-1 flex flex-col justify-start overflow-hidden">
              {filteredTasks.length === 0 ? (
                <div className="p-3 text-center text-slate-400 text-xs flex flex-col items-center justify-center flex-1">
                  <p>No tasks set yet.</p>
                  <button
                    onClick={() => setViewMode('parent-editor')}
                    className="mt-2 text-cyan-400 hover:text-cyan-300 font-bold inline-flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Click here to set homework</span>
                  </button>
                </div>
              ) : (
                <>
                  {filteredTasks.slice(0, 3).map((task) => (
                    <div
                      key={task.id}
                      className="px-2.5 py-2 sm:py-2.5 hover:bg-slate-800/40 transition flex items-center justify-between gap-2 group shrink-0"
                    >
                      {/* Task Title & Details */}
                      <div 
                        onClick={() => handleOpenTask(task)}
                        className="flex items-start gap-1.5 flex-1 min-w-0 cursor-pointer"
                      >
                        <div className={`mt-0.5 px-1 py-0.2 rounded text-[9px] font-bold border ${getSubjectColor(task.subject)} shrink-0`}>
                          {task.subject}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1">
                            <h3 className="text-[11.5px] font-bold text-slate-100 truncate group-hover:text-cyan-300 transition">
                              {task.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-1 text-[9.5px] text-slate-400 mt-0.2">
                            <span>{task.category}</span>
                            <span>·</span>
                            <span>{task.dueDisplay}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status & Points */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        {getStatusBadge(task.status)}
                        <span className="text-[10px] font-bold text-amber-400 font-mono tabular-nums bg-amber-950/70 px-1 py-0.2 rounded border border-amber-500/40 shadow-[0_0_6px_rgba(245,158,11,0.2)]">
                          +{task.points}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* If fewer than 3 tasks exist, provide a sleek dark slot instead of empty void */}
                  {filteredTasks.length < 3 && (
                    <div 
                      onClick={() => setViewMode('parent-editor')}
                      className="mx-2.5 my-2 p-2 rounded-lg border border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-950/40 hover:bg-cyan-950/20 text-slate-400 hover:text-cyan-300 transition flex items-center justify-center gap-1.5 cursor-pointer text-[10.5px] font-medium shrink-0"
                    >
                      <Plus className="w-3 h-3 text-cyan-400" />
                      <span>+ Add another homework task for {student.name.split(' ')[0]}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            /* Board View Mode */
            <div className="p-2 space-y-1 bg-slate-950/40 flex-1 flex flex-col justify-around overflow-hidden">
              {['not_started', 'in_progress', 'completed'].map((col) => {
                const colTasks = tasks.filter((t) => 
                  col === 'not_started' ? (t.status === 'not_started' || t.status === 'overdue') :
                  col === 'in_progress' ? t.status === 'in_progress' :
                  (t.status === 'completed' || t.status === 'submitted')
                );
                const colTitle = col === 'not_started' ? 'To Do' : col === 'in_progress' ? 'In Progress' : 'Done';
                return (
                  <div key={col} className="space-y-0.5 shrink-0">
                    <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between px-1">
                      <span>{colTitle}</span>
                      <span>{colTasks.length}</span>
                    </div>
                    {colTasks.slice(0, 1).map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleOpenTask(t)}
                        className="bg-slate-800/90 p-1 rounded-lg border border-slate-700/70 shadow-xs hover:border-cyan-500/50 transition cursor-pointer flex items-center justify-between"
                      >
                        <div className="min-w-0 flex-1">
                          <span className={`text-[8px] px-1 py-0.2 rounded font-bold border ${getSubjectColor(t.subject)}`}>{t.subject}</span>
                          <div className="text-[10.5px] font-bold text-slate-100 truncate mt-0.5">{t.title}</div>
                        </div>
                        <span className="text-[10px] font-bold text-amber-400 shrink-0 ml-1">+{t.points} pts</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}

          {/* Card Footer */}
          <div className="px-2.5 py-1 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 shrink-0">
            <span>Showing {Math.min(filteredTasks.length, 3)} {Math.min(filteredTasks.length, 3) === 1 ? 'task' : 'tasks'}</span>
            <button
              onClick={() => setViewMode('parent-editor')}
              className="font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-0.5 cursor-pointer"
            >
              <span>Add homework</span>
              <ChevronRight className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </main>
  );

  if (isMobile) {
    return mainDashboardContent;
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6F5]">
      <Sidebar activeTab="overview" />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardTopBar />
        {mainDashboardContent}
      </div>
    </div>
  );
};

