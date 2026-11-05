import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { DashboardTopBar } from '../common/DashboardTopBar';
import { 
  ArrowLeft, 
  Paperclip, 
  Bell, 
  Calendar, 
  Clock, 
  FileText, 
  Plus, 
  Trash2, 
  Check, 
  UserCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { SubjectType, TaskCategory, Attachment } from '../../types';

export const ParentHomeworkEditor: React.FC<{ isMobile?: boolean }> = ({ isMobile = true }) => {
  const { 
    tasks, 
    selectedTaskId, 
    student, 
    createTask, 
    updateTask, 
    setViewMode 
  } = useApp();

  // Check if editing existing or creating fresh
  const existingTask = tasks.find((t) => t.id === selectedTaskId);

  const [title, setTitle] = useState(existingTask?.title || 'Fractions worksheet — questions 1–12');
  const [subject, setSubject] = useState<SubjectType>(existingTask?.subject || 'Maths');
  const [category, setCategory] = useState<TaskCategory>(existingTask?.category || 'Worksheet');
  const [instructions, setInstructions] = useState(
    existingTask?.instructions || 'Show your working for each answer. Use the example on page 32 if you get stuck.'
  );
  const [dueDate, setDueDate] = useState(existingTask?.dueDate || '2026-10-01');
  const [dueTime, setDueTime] = useState(existingTask?.dueTime || '16:00');
  const [repeats, setRepeats] = useState(existingTask?.repeats || 'Every Thursday');
  const [repeatEndDate, setRepeatEndDate] = useState(existingTask?.repeatEndDate || '2026-12-17');
  const [points, setPoints] = useState(existingTask?.points || 15);
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [attachments, setAttachments] = useState<Attachment[]>(
    existingTask?.attachments && existingTask.attachments.length > 0
      ? existingTask.attachments
      : [
          {
            id: 'att-fractions',
            name: 'Fractions-week-4.pdf',
            size: '1.8 MB',
            type: 'pdf',
          },
        ]
  );
  const [isSavedMessage, setIsSavedMessage] = useState(false);

  // Sync if selectedTaskId changes
  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setSubject(existingTask.subject);
      setCategory(existingTask.category);
      setInstructions(existingTask.instructions);
      setDueDate(existingTask.dueDate);
      setDueTime(existingTask.dueTime);
      setRepeats(existingTask.repeats);
      setRepeatEndDate(existingTask.repeatEndDate || '2026-12-17');
      setPoints(existingTask.points);
      setAttachments(existingTask.attachments || []);
    }
  }, [selectedTaskId]);

  const handleSave = (isDraft: boolean = false) => {
    if (!title.trim()) return;

    if (existingTask) {
      updateTask({
        ...existingTask,
        title,
        subject,
        category,
        instructions,
        dueDate,
        dueTime,
        dueDisplay: 'Today, 4:00 PM',
        repeats,
        repeatEndDate,
        points,
        attachments,
      });
    } else {
      createTask({
        title,
        subject,
        category,
        instructions,
        dueDate,
        dueTime,
        dueDisplay: 'Today, 4:00 PM',
        repeats,
        repeatEndDate,
        points,
        attachments,
      });
    }

    setIsSavedMessage(true);
    setTimeout(() => {
      setIsSavedMessage(false);
      setViewMode('parent-dashboard');
    }, 700);
  };

  const handleAddSampleAttachment = () => {
    const newAtt: Attachment = {
      id: `att-${Date.now()}`,
      name: 'Worksheet-Supplement.pdf',
      size: '2.4 MB',
      type: 'pdf',
    };
    setAttachments((prev) => [...prev, newAtt]);
  };

  const handleRemoveAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const editorContent = (
    <main className={`${isMobile ? 'p-4 pb-28 space-y-4' : 'p-6 max-w-7xl w-full mx-auto space-y-6'}`}>
      {/* Breadcrumbs & Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('parent-dashboard')}
            className="hover:text-slate-800 flex items-center gap-1 cursor-pointer font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </button>
          <span>/</span>
          <span>Homework</span>
          <span>/</span>
          <span className="text-slate-800 font-semibold">New task</span>
        </div>

        {isSavedMessage && (
          <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full font-semibold border border-emerald-200 animate-in fade-in">
            ✓ Saved successfully!
          </span>
        )}
      </div>

      {/* Header Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
            Set up {student.name.split(' ')[0]}'s homework
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear deadlines, supportive notes, and helpful nudges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition shadow-2xs cursor-pointer"
          >
            Save draft
          </button>
          <button
            onClick={() => handleSave(false)}
            className="px-3.5 py-1.5 text-xs font-black text-slate-950 bg-gradient-to-r from-[#00F0FF] via-[#00A8FF] to-[#0055EE] hover:brightness-110 rounded-xl shadow-[0_0_14px_rgba(0,240,255,0.5)] ring-1 ring-cyan-200 transition cursor-pointer"
          >
            Assign homework
          </button>
        </div>
      </div>

      {/* Form Layout */}
      <div className={`grid gap-4 items-start ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
        {/* Left Column: Task Details & Schedule */}
        <div className={`${isMobile ? 'w-full' : 'lg:col-span-2'} space-y-4`}>
          {/* Card 1: Task details */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Task details</h2>
              <p className="text-xs text-slate-500">What does {student.name.split(' ')[0]} need to do?</p>
            </div>

            {/* Homework Title Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Homework title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fractions worksheet — questions 1–12"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition"
              />
            </div>

            {/* Subject & Category Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as SubjectType)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="Maths">Maths</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="Languages">Languages</option>
                  <option value="History">History</option>
                  <option value="Art">Art</option>
                  <option value="Computing">Computing</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TaskCategory)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition cursor-pointer"
                >
                  <option value="Worksheet">Worksheet</option>
                  <option value="Reading">Reading</option>
                  <option value="Project">Project</option>
                  <option value="Quiz">Quiz</option>
                  <option value="Memorisation">Memorisation</option>
                  <option value="Essay">Essay</option>
                  <option value="Exercise">Exercise</option>
                </select>
              </div>
            </div>

            {/* Notes and instructions */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Notes and instructions
                </label>
                <span className="text-[10px] text-slate-400">Clear steps</span>
              </div>
              <textarea
                rows={3}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Show your working for each answer. Use the example on page 32 if you get stuck."
                className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Card 2: Schedule and recurrence */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-5 space-y-4">
            <div className="border-b border-slate-100 pb-2.5">
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Schedule and recurrence</h2>
              <p className="text-xs text-slate-500">Set clear deadlines and helpful nudges</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  Deadline
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Due time
                </label>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Repeats
                </label>
                <select
                  value={repeats}
                  onChange={(e) => setRepeats(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                >
                  <option value="Does not repeat">Does not repeat</option>
                  <option value="Every Thursday">Every Thursday</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly on Friday">Weekly on Friday</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ends
                </label>
                <input
                  type="date"
                  value={repeatEndDate}
                  onChange={(e) => setRepeatEndDate(e.target.value)}
                  className="w-full px-2.5 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Assign to, Attachments, Reminders */}
        <div className="space-y-4">
          {/* Assign to */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Assign to</h3>
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-teal-50/70 border border-teal-200">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                  J
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{student.name}</div>
                  <div className="text-[10px] text-slate-500">{student.grade}</div>
                </div>
              </div>
              <Check className="w-4 h-4 text-teal-700" />
            </div>
          </div>

          {/* Attachments */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Attachments</h3>
              <Paperclip className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div
              onClick={handleAddSampleAttachment}
              className="p-3 border-2 border-dashed border-slate-200 hover:border-teal-400 bg-slate-50/50 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition"
            >
              <Plus className="w-4 h-4 text-teal-600 mb-0.5" />
              <span className="text-xs font-bold text-slate-800">Add photo or file</span>
              <span className="text-[10px] text-slate-400">PDF, image up to 25 MB</span>
            </div>

            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                  <div className="truncate font-semibold text-slate-800">{file.name}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveAttachment(file.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Reminders & Points */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-slate-500" />
                Reminders
              </h3>
              <button
                type="button"
                onClick={() => setRemindersEnabled(!remindersEnabled)}
                className={`w-8 h-4.5 flex items-center rounded-full p-0.5 transition cursor-pointer ${
                  remindersEnabled ? 'bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-3.5 h-3.5 rounded-full shadow-md transform transition ${
                    remindersEnabled ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {remindersEnabled && (
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-cyan-50/70 border border-cyan-200/60 text-[11px] text-cyan-950 font-semibold">
                  <Check className="w-3 h-3 text-[#0099DD]" />
                  <span>1 day before at 9:00 AM</span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-cyan-50/70 border border-cyan-200/60 text-[11px] text-cyan-950 font-semibold">
                  <Check className="w-3 h-3 text-[#0099DD]" />
                  <span>2 hours before</span>
                </div>
              </div>
            )}

            <div className="p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-[11px] text-amber-900">
              <p>Jamie will receive a gentle push notification before it's due.</p>
            </div>

            {/* Points adjustment */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Points reward:</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPoints(Math.max(5, points - 5))}
                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  -
                </button>
                <span className="font-bold text-amber-500 font-mono">+{points}</span>
                <button
                  type="button"
                  onClick={() => setPoints(points + 5)}
                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  +
                </button>
              </div>
            </div>

            {/* Bottom assign CTA button */}
            <button
              type="button"
              onClick={() => handleSave(false)}
              className="w-full py-2.5 bg-gradient-to-r from-[#00F0FF] via-[#00A8FF] to-[#0055EE] hover:brightness-110 text-slate-950 font-black rounded-xl text-xs shadow-[0_0_16px_rgba(0,240,255,0.45)] ring-1 ring-cyan-200 transition cursor-pointer"
            >
              Assign Homework Now
            </button>
          </div>
        </div>
      </div>
    </main>
  );

  if (isMobile) {
    return editorContent;
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6F5]">
      <Sidebar activeTab="homework" />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardTopBar />
        {editorContent}
      </div>
    </div>
  );
};
