import React from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneFrame } from '../mobile/PhoneFrame';
import { 
  Bell, 
  Calendar, 
  Flame,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toIsoDate, getWeekDates } from '../../utils/timeGreeting';

export const StudentSchedule: React.FC<{ asStandalone?: boolean }> = ({ asStandalone = true }) => {
  const { 
    student, 
    tasks, 
    setViewMode, 
    selectTask, 
    notificationBadge,
    timeGreeting,
    currentDate,
    selectedCalendarDate,
    setSelectedCalendarDate,
    openCalendarModal
  } = useApp();

  const activeDate = selectedCalendarDate || currentDate;
  const selectedDateIso = toIsoDate(activeDate);
  const todayIso = toIsoDate(currentDate);
  const isSelectedToday = selectedDateIso === todayIso;

  const weekDays = getWeekDates(activeDate, currentDate);

  const selectedDayName = activeDate.toLocaleDateString([], { weekday: 'long' });

  const scheduleHeading = isSelectedToday
    ? `Today's schedule (${selectedDayName})`
    : `${selectedDayName}'s schedule`;

  // Filter tasks for selected date or fallback to default schedule
  const matchedTasks = tasks.filter((t) => {
    return t.dueDate === selectedDateIso || (isSelectedToday && t.dueDisplay?.toLowerCase().includes('today'));
  });

  const displayTasks = matchedTasks.length > 0 ? matchedTasks : tasks.slice(0, 3);

  const handleOpenTask = (taskId: string) => {
    selectTask(taskId);
    setViewMode('student-task');
  };

  const content = (
    <div className="flex-1 flex flex-col justify-start bg-[#020816] overflow-hidden min-h-0">
      {/* Top Bar: Profile avatar with neon ring, schedule header, notification bell */}
      <div className="px-3.5 pt-2 pb-2 flex items-center justify-between border-b border-cyan-400/25 bg-[#030A18]/95 shadow-[0_2px_12px_rgba(0,240,255,0.2)] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00F0FF] via-[#00A8FF] to-[#0055EE] text-slate-950 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(0,240,255,0.5)] ring-2 ring-cyan-300 shrink-0">
            J
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => openCalendarModal(currentDate)}
                className="text-[9.5px] text-cyan-300 font-black bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-500/50 px-2 py-0.2 rounded-full transition cursor-pointer flex items-center gap-1 shadow-[0_0_6px_rgba(0,240,255,0.25)]"
                title="Open calendar"
              >
                <Calendar className="w-2.5 h-2.5 text-[#00F0FF]" />
                <span>{timeGreeting.dateDisplay}</span>
              </button>
            </div>
            <h2 className="text-sm font-extrabold text-white leading-tight mt-0.5 font-display flex items-center gap-1">
              <span>{student.name.split(' ')[0]}'s Schedule</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
            </h2>
          </div>
        </div>

        <div className="relative">
          <button className="w-7.5 h-7.5 rounded-full bg-slate-800/90 border border-slate-700/70 hover:border-cyan-400/60 flex items-center justify-center text-slate-300 shadow-2xs hover:bg-cyan-950/60 hover:text-cyan-300 transition cursor-pointer">
            <Bell className="w-3.5 h-3.5" />
          </button>
          {notificationBadge > 0 && (
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-[#00F0FF] ring-2 ring-slate-900 shadow-[0_0_6px_#00F0FF]"></span>
          )}
        </div>
      </div>

      {/* Week Calendar Strip */}
      <div className="px-3.5 py-1.5 bg-[#05132B]/90 border-b border-slate-800/80 shrink-0">
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((day) => {
            const isSelected = day.full === selectedDateIso;
            return (
              <button
                key={day.full}
                type="button"
                onClick={() => setSelectedCalendarDate(day.date)}
                className={`py-1 px-0.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Schedule Section */}
      <div className="px-3.5 py-2 flex-1 flex flex-col justify-start overflow-hidden min-h-0">
        <div className="flex items-center justify-between mb-2 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="text-[11px] font-black text-white uppercase tracking-wider truncate">
              {scheduleHeading}
            </h3>
            {isSelectedToday && (
              <span className="text-[9px] font-black text-cyan-300 bg-cyan-950/90 px-1.5 py-0.2 rounded-full border border-cyan-500/70 shadow-[0_0_6px_rgba(0,240,255,0.3)] shrink-0">
                Today
              </span>
            )}
          </div>
          <span className="text-[10px] font-black text-slate-950 flex items-center gap-1 shrink-0 bg-gradient-to-r from-[#00F0FF] to-[#0077FF] px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.4)] border border-cyan-200/60">
            <Flame className="w-3 h-3 text-amber-950 fill-amber-950" /> {student.streakDays}d streak
          </span>
        </div>

        {/* Timeline Tasks: 3 compact tasks fitting on screen */}
        <div className="space-y-2 flex-1 overflow-hidden">
          {displayTasks.map((task, i) => {
            const isDone = task.status === 'completed';
            const scheduledTime = task.dueTime || (i === 0 ? '15:30' : i === 1 ? '16:00' : i === 2 ? '16:30' : '17:00');
            const tag = isDone ? 'Done ✓' : task.status === 'in_progress' ? 'Due soon' : 'Up next';
            const tagColor = isDone 
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-[0_0_6px_rgba(16,185,129,0.25)]' 
              : task.status === 'in_progress'
              ? 'bg-cyan-950/80 text-cyan-300 border-cyan-500/70 shadow-[0_0_8px_rgba(0,240,255,0.3)]'
              : 'bg-sky-950/80 text-sky-300 border-sky-500/60 shadow-[0_0_6px_rgba(14,165,233,0.25)]';

            return (
              <div
                key={task.id}
                onClick={() => handleOpenTask(task.id)}
                className="bg-[#05132B]/90 p-2.5 rounded-xl border border-slate-800/80 hover:border-cyan-400 hover:shadow-[0_0_14px_rgba(0,240,255,0.3)] shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-between gap-2.5 group overflow-hidden min-w-0 relative"
              >
                {/* Neon Cyan Left Accent Strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.status === 'in_progress' ? 'bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]' : isDone ? 'bg-emerald-500' : 'bg-slate-700 group-hover:bg-[#00F0FF]'}`} />

                <div className="flex items-center gap-2 min-w-0 flex-1 pl-1">
                  {/* Time Indicator */}
                  <div className="w-10 text-[11px] font-mono font-black text-[#00F0FF] text-left shrink-0">
                    {scheduledTime}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-extrabold text-white truncate group-hover:text-cyan-300 transition">
                      {task.title.split('—')[0].trim()}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.2 flex items-center gap-1 truncate">
                      <span className="font-semibold text-slate-300">{task.subject}</span>
                      <span>·</span>
                      <span>{task.durationMinutes || 20}m</span>
                      <span>·</span>
                      <span className="font-extrabold text-amber-400 font-mono">+{task.points} pts</span>
                    </div>
                  </div>
                </div>

                {/* Status pill on right */}
                <div className="shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-[10.5px] font-black border ${tagColor} whitespace-nowrap`}>
                    {tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (!asStandalone) {
    return content;
  }

  return <PhoneFrame screenTitle="Student Dashboard (Jamie's phone)">{content}</PhoneFrame>;
};
