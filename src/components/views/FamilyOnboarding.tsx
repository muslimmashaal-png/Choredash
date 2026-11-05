import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PhoneFrame } from '../mobile/PhoneFrame';
import { 
  Check, 
  Copy, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';

import { ChoreDashLogo } from '../common/ChoreDashLogo';

export const FamilyOnboarding: React.FC<{ asStandalone?: boolean }> = ({ asStandalone = true }) => {
  const { student, parent, activeDevice, setViewMode } = useApp();
  const [copied, setCopied] = useState(false);

  const isStudentDevice = activeDevice === 'student-device';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(student.familyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReturn = () => {
    setViewMode(isStudentDevice ? 'student-schedule' : 'parent-dashboard');
  };

  const content = (
    <div className="flex-1 flex flex-col justify-between p-5 sm:p-6 pb-32 sm:pb-36 bg-white overflow-y-auto">
      <div>
        {/* Header brand, back navigation & step indicator */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReturn}
              className="inline-flex items-center gap-1 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
              title="Return to previous screen"
            >
              <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="truncate">Back to {isStudentDevice ? "Schedule" : "Carer Dashboard"}</span>
            </button>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full shrink-0">
            Family Pairing
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="mt-5 space-y-1">
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-800 uppercase tracking-wider bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
            <Lock className="w-3 h-3" />
            <span>1 User Per Device Policy Enforced</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 font-display tracking-tight pt-1">
            {isStudentDevice ? "Jamie's Enrolled Phone" : "Alex's Carer Device"}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isStudentDevice 
              ? "This device is registered exclusively for student Jamie. Cross-login is blocked to preserve chore integrity."
              : "This device is registered exclusively for Carer Alex to assign tasks and approve points."}
          </p>
        </div>

        {/* Dedicated Enrolled Device Card (Static - No role switching) */}
        <div className="mt-4">
          <div className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
            isStudentDevice
              ? 'border-emerald-500 bg-emerald-50/40 shadow-xs ring-1 ring-emerald-500/20'
              : 'border-orange-500 bg-orange-50/40 shadow-xs ring-1 ring-orange-500/20'
          }`}>
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${
                  isStudentDevice ? 'bg-emerald-600' : 'bg-orange-600'
                }`}
              >
                {isStudentDevice ? <Smartphone className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-slate-900">
                    {isStudentDevice ? "Jamie's Student Phone" : "Alex's Carer Phone"}
                  </h3>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {isStudentDevice 
                    ? "Timetable, chore completions, and reward store"
                    : "Homework creator, approval queue, and point dispenser"}
                </p>
              </div>
            </div>

            <CheckCircle2 className={`w-5 h-5 shrink-0 ${isStudentDevice ? 'text-emerald-600' : 'text-orange-600'}`} />
          </div>
        </div>

        {/* Cross-Device Pairing Code Box */}
        <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Family Cloud Sync Code</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {isStudentDevice 
                ? "Share this code with Alex's separate carer phone to keep chores and points in sync:"
                : "Enter this code on Jamie's student phone to link the devices together:"}
            </p>
          </div>

          {/* Code pill with Copy */}
          <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-2.5">
            <span className="font-mono text-base font-extrabold tracking-widest text-slate-900 pl-2">
              {student.familyCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-teal-800" />
                  <span className="text-teal-800 font-bold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Primary Return Button - Safely padded well above the bottom navigation bar */}
      <div className="pt-8 pb-4">
        <button
          onClick={handleReturn}
          className="w-full py-3.5 bg-teal-800 hover:bg-teal-700 active:scale-98 text-white font-extrabold rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Return to {isStudentDevice ? "Student Schedule" : "Carer Dashboard"}</span>
        </button>
      </div>
    </div>
  );

  if (!asStandalone) {
    return content;
  }

  return (
    <PhoneFrame screenTitle="Family Pairing · ChoreDash">
      {content}
    </PhoneFrame>
  );
};
