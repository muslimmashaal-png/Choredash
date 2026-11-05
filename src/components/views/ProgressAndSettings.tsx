import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from '../common/Sidebar';
import { DashboardTopBar } from '../common/DashboardTopBar';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Gift, 
  ShieldCheck, 
  Smartphone, 
  Bell, 
  Lock, 
  Users, 
  Download, 
  Plus, 
  Check, 
  Clock, 
  ChevronRight,
  Info,
  ArrowLeft,
  LogOut,
  KeyRound
} from 'lucide-react';
import { weeklyRhythmData } from '../../data/initialData';

export const ProgressAndSettings: React.FC<{ isMobile?: boolean }> = ({ isMobile = true }) => {
  const { 
    student, 
    parent,
    rewards, 
    timeRange, 
    setTimeRange, 
    crossDeviceSync, 
    setCrossDeviceSync, 
    claimReward,
    activeRole,
    openDeviceSecurity,
    setViewMode,
    currentUser,
    logout
  } = useApp();

  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);

  const progressContent = (
    <main className={`${isMobile ? 'p-4 pb-36 sm:pb-40 space-y-4' : 'p-6 max-w-7xl w-full mx-auto space-y-6'}`}>
      {/* Top Back Navigation to Dashboard */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => setViewMode(activeRole === 'student' ? 'student-schedule' : 'parent-dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-2.5 py-1.5 rounded-xl transition cursor-pointer shadow-2xs"
          title="Return to dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Back to {activeRole === 'student' ? "Schedule" : "Carer Dashboard"}</span>
        </button>
      </div>

      {/* Header Title */}
      <div className="pb-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-display">
          Progress and family settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Supportive stats + controls for your whole family
        </p>
      </div>

      {/* Top Section: Steady progress, clearly seen */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
              Steady progress, clearly seen
            </h2>
            <p className="text-xs text-slate-500">
              A playful view for encouragement — not pressure.
            </p>
          </div>

          {/* Time Range Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            {(['7 days', '30 days', 'Year'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                  timeRange === r
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Metric Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="bg-slate-50/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/70 flex flex-col items-center text-center overflow-hidden min-w-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0 mb-1">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="w-full min-w-0">
              <div className="text-base sm:text-2xl font-extrabold text-slate-900 font-display tabular-nums truncate">
                86%
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate font-medium">
                On-time <span className="text-emerald-600 font-bold hidden xs:inline">(+5%)</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/70 flex flex-col items-center text-center overflow-hidden min-w-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center shrink-0 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="w-full min-w-0">
              <div className="text-base sm:text-2xl font-extrabold text-slate-900 font-display tabular-nums truncate">
                42
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate font-medium">
                Completed
              </div>
            </div>
          </div>

          <div className="bg-slate-50/80 p-2 sm:p-3.5 rounded-xl sm:rounded-2xl border border-slate-200/70 flex flex-col items-center text-center overflow-hidden min-w-0">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-orange-100/70 text-orange-800 flex items-center justify-center shrink-0 mb-1">
              <Sparkles className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" />
            </div>
            <div className="w-full min-w-0">
              <div className="text-base sm:text-2xl font-extrabold text-slate-900 font-display tabular-nums truncate">
                540
              </div>
              <div className="text-[10px] sm:text-xs text-slate-500 truncate font-medium">
                Total pts
              </div>
            </div>
          </div>
        </div>

        {/* Split: Homework Rhythm Chart (Left) & Reward Journey (Right) */}
        <div className={`grid gap-4 pt-1 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
          {/* Homework Rhythm Chart */}
          <div className={`${isMobile ? 'w-full' : 'lg:col-span-2'} bg-slate-50/50 p-4 sm:p-5 rounded-2xl border border-slate-200/60 flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Homework rhythm
                  </h3>
                  <p className="text-[10px] text-slate-400">Completed vs Assigned by day</p>
                </div>

                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1 text-slate-600">
                    <span className="w-2 h-2 rounded-sm bg-teal-700"></span> Done
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <span className="w-2 h-2 rounded-sm bg-slate-300"></span> Due
                  </span>
                </div>
              </div>

              {/* Interactive Bar Chart Visualization */}
              <div className="h-36 sm:h-44 flex items-end justify-between gap-2 pt-4 px-1 sm:px-4">
                {weeklyRhythmData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group h-full justify-end">
                    <div className="w-full max-w-[24px] flex items-end justify-center gap-0.5 h-24 sm:h-32">
                      {/* Due / Total Bar */}
                      <div
                        className="w-2 sm:w-2.5 bg-slate-300 rounded-t-sm transition-all"
                        style={{ height: `${item.heightPctDue}%` }}
                        title={`${item.day}: ${item.due} assigned`}
                      />
                      {/* Completed Bar */}
                      <div
                        className="w-2 sm:w-3 bg-teal-700 group-hover:bg-teal-600 rounded-t-sm transition-all"
                        style={{ height: `${item.heightPctCompleted}%` }}
                        title={`${item.day}: ${item.completed} completed`}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs font-bold text-slate-600">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insight highlight banner */}
            <div className="mt-3 p-2.5 bg-teal-50/80 border border-teal-200/60 rounded-xl flex items-center gap-2 text-xs text-teal-900">
              <Clock className="w-4 h-4 text-teal-700 shrink-0" />
              <p className="text-[11px] leading-snug">
                <strong>Jamie completes most tasks between 3:30 and 5:00 PM</strong> — 14 min quicker than last month.
              </p>
            </div>
          </div>

          {/* Reward Journey Card */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5" />
                  Reward journey
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {student.points} pts
                </span>
              </div>

              <div className="space-y-2.5 mt-3">
                {rewards.map((reward) => {
                  const isUnlocked = student.points >= reward.pointsNeeded;
                  const progressPct = Math.min(100, (student.points / reward.pointsNeeded) * 100);

                  return (
                    <div
                      key={reward.id}
                      className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-900 border border-slate-700/80">
                          {reward.imageUrl ? (
                            <img src={reward.imageUrl} alt={reward.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-teal-400">
                              <Gift className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-100 text-[11px] truncate">{reward.title}</span>
                            <span className="text-[10px] font-mono text-orange-400 font-semibold shrink-0 ml-1">
                              {reward.pointsNeeded} pts
                            </span>
                          </div>
                          <span className="text-[9px] text-slate-400 block truncate">{reward.category}</span>
                        </div>
                      </div>

                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>
                          {student.points} / {reward.pointsNeeded} pts
                        </span>
                        {isUnlocked ? (
                          <button
                            onClick={() => claimReward(reward.id)}
                            className="px-2 py-0.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded font-bold text-[9px] cursor-pointer"
                          >
                            Claim Prize
                          </button>
                        ) : (
                          <span>{reward.pointsNeeded - student.points} pts left</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Bottom Section: Family settings */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 sm:p-6 space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
            Family settings
          </h2>
          <p className="text-xs text-slate-500">
            Safe, protected and friendly for children & carers
          </p>
        </div>

        {/* Settings List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* 1. Cross-device sync */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100/60 text-teal-800 flex items-center justify-center shrink-0">
                <Smartphone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Cross-device sync</h3>
                <p className="text-[10px] text-slate-500">Jamie's phone synced</p>
              </div>
            </div>

            <button
              onClick={() => setCrossDeviceSync(!crossDeviceSync)}
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition cursor-pointer ${
                crossDeviceSync ? 'bg-teal-700' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  crossDeviceSync ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* 2. Device Enrollment & Separation Policy */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-100/60 text-orange-800 flex items-center justify-center shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Device separation rule</h3>
                <p className="text-[10px] text-slate-500">1 user per device enforced</p>
              </div>
            </div>

            <button
              onClick={openDeviceSecurity}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Device Status
            </button>
          </div>

          {/* 3. Backup and recovery */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100/60 text-emerald-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Backup & recovery</h3>
                <p className="text-[10px] text-slate-500">Automated daily snapshot</p>
              </div>
            </div>

            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold rounded-md">
              Protected
            </span>
          </div>

          {/* 4. Children and carers */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-blue-800 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Children and carers</h3>
                <p className="text-[10px] text-slate-500">Alex (Carer) · Jamie (Student)</p>
              </div>
            </div>

            <button
              onClick={openDeviceSecurity}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Manage
            </button>
          </div>

          {/* 5. Notifications */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100/60 text-blue-800 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Notifications</h3>
                <p className="text-[10px] text-slate-500">Reminders and nudges</p>
              </div>
            </div>

            <button
              onClick={() => setNotificationModalOpen(true)}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
            >
              Settings
            </button>
          </div>

          {/* 6. Export family data */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-purple-100/60 text-purple-800 flex items-center justify-center shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Export family data</h3>
                <p className="text-[10px] text-slate-500">Download CSV report</p>
              </div>
            </div>

            <button
              onClick={() => setExportModalOpen(true)}
              className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> Export
            </button>
          </div>

          {/* 7. Current Account & Sign Out */}
          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 flex items-center justify-between col-span-1 md:col-span-2">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-800 text-white flex items-center justify-center shrink-0 font-bold text-xs">
                {(currentUser?.name || (activeRole === 'student' ? 'Jamie' : 'Alex'))[0]}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900">
                    {currentUser?.name || (activeRole === 'student' ? 'Jamie Miller' : 'Alex Miller')}
                  </h3>
                  <span className="text-[9px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                    {currentUser?.provider ? `${currentUser.provider} Login` : 'Active'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {currentUser?.email || (activeRole === 'student' ? 'jamie.miller@gmail.com' : parent.email)}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 rounded-lg text-xs font-bold cursor-pointer flex items-center gap-1 transition"
              title="Sign out and return to login screen"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Return to Dashboard Primary Button */}
      <div className="pt-2 pb-6">
        <button
          onClick={() => setViewMode(activeRole === 'student' ? 'student-schedule' : 'parent-dashboard')}
          className="w-full py-3.5 bg-teal-800 hover:bg-teal-700 active:scale-98 text-white font-extrabold rounded-2xl shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer text-sm"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Return to {activeRole === 'student' ? "Student Schedule" : "Carer Dashboard"}</span>
        </button>
      </div>

      {/* Export Modal */}
      {exportModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-3 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900">Export Family Records</h3>
            <p className="text-xs text-slate-500">
              Download Jamie's homework records for school reporting or tutor review.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setExportModalOpen(false);
                }}
                className="w-full py-2 bg-teal-800 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition"
              >
                Download PDF Summary
              </button>
              <button
                onClick={() => {
                  setExportModalOpen(false);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition"
              >
                Download CSV
              </button>
            </div>
            <button
              onClick={() => setExportModalOpen(false)}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 pt-1"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notificationModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full space-y-3 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
            <div className="space-y-2 text-xs text-slate-700">
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Gentle task nudges</span>
                <input type="checkbox" defaultChecked className="rounded accent-teal-700 w-4 h-4" />
              </label>
              <label className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span>Completion celebrations</span>
                <input type="checkbox" defaultChecked className="rounded accent-teal-700 w-4 h-4" />
              </label>
            </div>
            <button
              onClick={() => setNotificationModalOpen(false)}
              className="w-full py-2 bg-teal-800 text-white rounded-xl text-xs font-bold"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

    </main>
  );

  if (isMobile) {
    return progressContent;
  }

  return (
    <div className="min-h-screen flex bg-[#F4F6F5]">
      <Sidebar activeTab="progress" />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <DashboardTopBar />
        {progressContent}
      </div>
    </div>
  );
};
