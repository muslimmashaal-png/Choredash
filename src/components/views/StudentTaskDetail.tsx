import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneFrame } from '../mobile/PhoneFrame';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Check, 
  MessageSquare, 
  Send, 
  Image, 
  Sparkles, 
  Download,
  Calendar,
  Award,
  User
} from 'lucide-react';

export const StudentTaskDetail: React.FC<{ asStandalone?: boolean }> = ({ asStandalone = true }) => {
  const { 
    tasks, 
    selectedTaskId, 
    student, 
    completeTaskAsStudent, 
    addComment, 
    updateQuestionProgress,
    setViewMode 
  } = useApp();

  const currentTask = tasks.find((t) => t.id === selectedTaskId) || tasks[0];
  const [commentText, setCommentText] = useState('');
  const [activeTab, setActiveTab] = useState<'task' | 'schedule' | 'rewards' | 'me'>('task');
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);

  const isCompleted = currentTask.status === 'completed';

  const handleToggleComplete = () => {
    completeTaskAsStudent(currentTask.id);
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(currentTask.id, commentText, 'Student');
    setCommentText('');
  };

  const content = (
    <div className="flex-1 flex flex-col justify-between pb-16 bg-[#F6F8F7]">
      {/* Top Header with Back button & Status */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between border-b border-slate-100 bg-white">
        <button
          onClick={() => setViewMode('student-schedule')}
          className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-700">{currentTask.subject} · {currentTask.category}</span>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
          Due today
        </span>
      </div>

      {/* Main Task Body */}
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        {/* Title */}
        <div>
          <h1 className="text-xl font-bold text-slate-900 leading-tight font-display">
            {currentTask.title}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentTask.dueDisplay}</span>
            <span>·</span>
            <span className="text-teal-700 font-semibold">2h 15m left</span>
          </div>
        </div>

        {/* Question checklist progress (1 of 12 questions) */}
        {currentTask.totalQuestions && (
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden min-w-0">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2 gap-2">
              <span className="truncate">Task progress</span>
              <span className="font-bold text-teal-800 font-mono text-[11px] sm:text-xs shrink-0 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/60">
                {currentTask.completedQuestions || 1} of {currentTask.totalQuestions}
              </span>
            </div>

            {/* Questions pill buttons */}
            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: currentTask.totalQuestions }).map((_, i) => {
                const questionNum = i + 1;
                const isAnswered = questionNum <= (currentTask.completedQuestions || 1);
                return (
                  <button
                    key={i}
                    onClick={() => updateQuestionProgress(currentTask.id, isAnswered ? -1 : 1)}
                    className={`py-1 text-xs rounded-lg font-bold transition cursor-pointer overflow-hidden min-w-0 ${
                      isAnswered
                        ? 'bg-teal-700 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {questionNum}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Instructions Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Instructions
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {currentTask.instructions}
          </p>
        </div>

        {/* Attachments Card */}
        {currentTask.attachments && currentTask.attachments.length > 0 && (
          <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
            {currentTask.attachments.map((att) => (
              <div key={att.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{att.name}</div>
                    <div className="text-[10px] text-slate-500">{att.size}</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowAttachmentModal(true)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition cursor-pointer"
                >
                  Open
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Mark as Complete CTA Button */}
        <div className="space-y-1.5 pt-1">
          <button
            onClick={handleToggleComplete}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
              isCompleted
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
                : 'bg-teal-800 hover:bg-teal-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{isCompleted ? 'Completed ✓ (Tap to undo)' : '✓ Mark as complete'}</span>
          </button>

          <p className="text-center text-[11px] text-slate-500">
            {isCompleted ? (
              <span className="text-emerald-700 font-semibold">
                Awesome! You gained +{currentTask.points} points for Family movie night!
              </span>
            ) : (
              <span>Awesome! Earn +{currentTask.points} points towards rewards</span>
            )}
          </p>
        </div>

        {/* Comments Thread */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900">
            <span>Comments</span>
            <span className="text-slate-400 font-normal">
              {currentTask.comments.length} {currentTask.comments.length === 1 ? 'message' : 'messages'}
            </span>
          </div>

          <div className="space-y-2.5">
            {currentTask.comments.map((comm) => (
              <div
                key={comm.id}
                className={`p-3 rounded-xl text-xs space-y-1 ${
                  comm.role === 'Parent'
                    ? 'bg-orange-50/70 border border-orange-200/60'
                    : 'bg-teal-50/70 border border-teal-200/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{comm.author}</span>
                  <span className="text-[10px] text-slate-400">{comm.time}</span>
                </div>
                <p className="text-slate-700 leading-snug">{comm.text}</p>
              </div>
            ))}
          </div>

          {/* Add a comment form */}
          <form onSubmit={handleSendComment} className="flex items-center gap-1.5 pt-1">
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition"
              title="Attach photo of homework"
            >
              <Image className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment or photo..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Attachment Preview Modal */}
      {showAttachmentModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl p-5 w-full max-w-xs space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-900">Worksheet Preview</span>
              <button
                onClick={() => setShowAttachmentModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-2">
              <FileText className="w-8 h-8 text-teal-700 mx-auto" />
              <div className="text-xs font-bold text-slate-900">Fractions-week-4.pdf</div>
              <div className="text-[11px] text-slate-500">12 exercises · Simplification & Common Denominators</div>
            </div>
            <button
              onClick={() => setShowAttachmentModal(false)}
              className="w-full py-2 bg-teal-800 text-white font-bold rounded-xl text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Bottom Phone Tab Bar */}
      <nav className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-6 py-2 flex items-center justify-between text-slate-500 z-20">
        <button
          onClick={() => setViewMode('student-schedule')}
          className="flex flex-col items-center gap-0.5 text-teal-800 font-bold cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[10px]">Today</span>
        </button>

        <button
          onClick={() => setViewMode('student-schedule')}
          className="flex flex-col items-center gap-0.5 hover:text-slate-800 cursor-pointer"
        >
          <Clock className="w-4 h-4" />
          <span className="text-[10px]">Schedule</span>
        </button>

        <button
          onClick={() => setViewMode('progress-settings')}
          className="flex flex-col items-center gap-0.5 hover:text-slate-800 cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span className="text-[10px]">Rewards</span>
        </button>

        <button
          onClick={() => setViewMode('account-onboarding')}
          className="flex flex-col items-center gap-0.5 hover:text-slate-800 cursor-pointer"
        >
          <User className="w-4 h-4" />
          <span className="text-[10px]">Me</span>
        </button>
      </nav>
    </div>
  );

  if (!asStandalone) {
    return content;
  }

  return <PhoneFrame screenTitle="Student Task View">{content}</PhoneFrame>;
};
