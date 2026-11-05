import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Smartphone, Lock, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const DeviceSecurityModal: React.FC = () => {
  const { 
    deviceSecurityModalOpen, 
    setDeviceSecurityModalOpen, 
    activeDevice, 
    student 
  } = useApp();

  if (!deviceSecurityModalOpen) return null;

  const isStudentDevice = activeDevice === 'student-device';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center shadow-xs ${
            isStudentDevice ? 'bg-amber-100 text-amber-700' : 'bg-teal-100 text-teal-800'
          }`}>
            {isStudentDevice ? (
              <Lock className="w-6 h-6" />
            ) : (
              <ShieldCheck className="w-6 h-6" />
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 font-display">
            {isStudentDevice ? "Student Device Enforced" : "Dedicated Carer Device"}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isStudentDevice
              ? "This device is registered exclusively for Jamie. Cross-role switching is disabled."
              : "This device is registered exclusively for Carer Alex for assigning tasks and managing rewards."}
          </p>
        </div>

        {/* Security Rule Breakdown */}
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>1 User Per Device:</strong> Carer and student accounts are strictly isolated on separate physical phones.
            </span>
          </div>

          <div className="flex items-start gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>No Cross-Login:</strong> Switching to carer is completely disabled on this student device.
            </span>
          </div>

          <div className="flex items-start gap-2 text-amber-800 bg-amber-50/70 p-2 rounded-xl border border-amber-200/60">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              {isStudentDevice
                ? `Paired to Alex's Carer phone via Family Sync Code: ${student.familyCode}`
                : `Connected to Jamie's phone via Family Sync Code: ${student.familyCode}`}
            </span>
          </div>
        </div>

        {/* Action Button: Close only - no role switching permitted */}
        <div className="pt-1">
          <button
            onClick={() => setDeviceSecurityModalOpen(false)}
            className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Understood
          </button>
        </div>

      </div>
    </div>
  );
};
