import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Gift, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  X, 
  Coins, 
  Trophy, 
  Film, 
  Gamepad2, 
  Utensils, 
  Star, 
  Ticket, 
  Heart,
  TrendingUp,
  Image as ImageIcon,
  DollarSign,
  History,
  CheckCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { RewardGoal, PointTransaction } from '../../types';

interface CarerPrizesAndPointsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'prizes' | 'points';
}

const PRESET_PRIZE_IMAGES = [
  {
    label: 'Movie Night & Popcorn',
    url: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=600&q=80',
    category: 'Experience' as const,
    icon: 'film',
    points: 250,
  },
  {
    label: 'Nintendo Switch Gaming',
    url: 'https://images.unsplash.com/photo-1612287233207-6b45155f9a94?auto=format&fit=crop&w=600&q=80',
    category: 'Privilege' as const,
    icon: 'gamepad-2',
    points: 300,
  },
  {
    label: 'Pizza Dinner Takeaway',
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    category: 'Experience' as const,
    icon: 'utensils',
    points: 150,
  },
  {
    label: 'LEGO Building Set',
    url: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80',
    category: 'Prizes' as const,
    icon: 'gift',
    points: 350,
  },
  {
    label: 'Ice Cream Sundae Trip',
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80',
    category: 'Experience' as const,
    icon: 'star',
    points: 100,
  },
  {
    label: 'Trampoline & Bounce Park',
    url: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=600&q=80',
    category: 'Experience' as const,
    icon: 'ticket',
    points: 400,
  },
  {
    label: 'Bookstore Spree & Comics',
    url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
    category: 'Prizes' as const,
    icon: 'gift',
    points: 200,
  },
  {
    label: 'Roblox / Gaming Card',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    category: 'Privilege' as const,
    icon: 'gamepad-2',
    points: 250,
  },
];

export const CarerPrizesAndPointsModal: React.FC<CarerPrizesAndPointsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'points',
}) => {
  const { 
    student, 
    rewards, 
    addReward, 
    updateReward, 
    deleteReward, 
    awardPoints, 
    claimReward,
    pointTransactions,
    weeklyAllowance,
    setWeeklyAllowance,
    payWeeklyAllowance
  } = useApp();

  const [activeTab, setActiveTab] = useState<'prizes' | 'points'>(initialTab);

  // New prize form state
  const [newTitle, setNewTitle] = useState('');
  const [newPoints, setNewPoints] = useState(200);
  const [newCategory, setNewCategory] = useState<'Experience' | 'Privilege' | 'Prizes'>('Experience');
  const [newIcon, setNewIcon] = useState('gift');
  const [newImageUrl, setNewImageUrl] = useState(PRESET_PRIZE_IMAGES[0].url);
  const [newDescription, setNewDescription] = useState('');
  const [editingRewardId, setEditingRewardId] = useState<string | null>(null);
  const [editPointsValue, setEditPointsValue] = useState<number>(0);

  // Award points state
  const [pointsAmount, setPointsAmount] = useState<number>(20);
  const [pointsReason, setPointsReason] = useState('Great focus & attitude during study');
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [showLedger, setShowLedger] = useState(false);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: typeof PRESET_PRIZE_IMAGES[0]) => {
    setNewTitle(preset.label);
    setNewPoints(preset.points);
    setNewCategory(preset.category);
    setNewIcon(preset.icon);
    setNewImageUrl(preset.url);
    setNewDescription(`Reward for reaching ${preset.points} points milestone`);
  };

  const handleCreatePrize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addReward({
      title: newTitle.trim(),
      pointsNeeded: Number(newPoints) || 100,
      category: newCategory,
      icon: newIcon,
      imageUrl: newImageUrl.trim() || undefined,
      description: newDescription.trim() || undefined,
    });

    setNewTitle('');
    setNewPoints(200);
    setNewDescription('');
    setSuccessNotice(`Added prize "${newTitle.trim()}" with visual card!`);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleSavePointsEdit = (rewardId: string) => {
    if (editPointsValue <= 0) return;
    updateReward(rewardId, { pointsNeeded: editPointsValue });
    setEditingRewardId(null);
    setSuccessNotice('Prize target points updated!');
    setTimeout(() => setSuccessNotice(null), 2500);
  };

  const handleAwardBonus = (amount: number, reason: string) => {
    awardPoints(amount, reason);
    setSuccessNotice(`${amount >= 0 ? '+' : ''}${amount} points awarded to ${student.name.split(' ')[0]}!`);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  const handleCustomAwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pointsAmount || !pointsReason.trim()) return;
    handleAwardBonus(pointsAmount, pointsReason.trim());
  };

  const handleAllowancePay = () => {
    payWeeklyAllowance();
    setSuccessNotice(`Paid weekly allowance (+${weeklyAllowance} pts) to ${student.name.split(' ')[0]}!`);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-250"
      >
        {/* Header with Title & Close (ChoreDash Neon Palette) */}
        <div className="p-4 sm:p-5 border-b border-cyan-400/30 flex items-center justify-between bg-gradient-to-r from-[#020816] via-[#05132B] to-[#020713] text-white shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-[radial-gradient(circle_at_80%_20%,rgba(0,240,255,0.2)_0%,transparent_70%)] pointer-events-none" />

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F0FF] via-[#00A8FF] to-[#0055EE] flex items-center justify-center text-slate-950 shadow-[0_0_14px_rgba(0,240,255,0.5)] ring-1 ring-white/50">
              <Sparkles className="w-4.5 h-4.5 fill-slate-950 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-black font-display tracking-tight text-white flex items-center gap-1.5">
                  <span>Carer Point Bank & Prizes Vault</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
                </h2>
                <span className="text-[10px] bg-cyan-950 text-[#00F0FF] border border-cyan-400/50 font-black px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(0,240,255,0.2)]">
                  Carer Vault
                </span>
              </div>
              <p className="text-[11px] text-cyan-100/70">
                Manage {student.name.split(' ')[0]}'s balance, custom prizes with images & allowance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="relative z-10 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer border border-slate-700 hover:border-cyan-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector: Point Bank vs Prizes Vault */}
        <div className="flex items-center border-b border-slate-100 bg-slate-50/90 px-3 sm:px-4 pt-2.5 gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('points')}
            className={`flex-1 pb-2.5 text-xs font-black border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer min-w-0 ${
              activeTab === 'points'
                ? 'border-amber-500 text-amber-600 shadow-[0_2px_0_#F59E0B]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Coins className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Point Bank ({student.points} pts)</span>
          </button>

          <button
            onClick={() => setActiveTab('prizes')}
            className={`flex-1 pb-2.5 text-xs font-black border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer min-w-0 ${
              activeTab === 'prizes'
                ? 'border-[#00F0FF] text-cyan-600 shadow-[0_2px_0_#00F0FF]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Gift className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Prize Vault ({rewards.length} prizes)</span>
          </button>
        </div>

        {/* Live Notification Feedback */}
        {successNotice && (
          <div className="px-4 py-2 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'points' ? (
            /* TAB 1: POINT BANK & ALLOWANCE */
            <div className="space-y-4">
              {/* Jamie's Point Bank Balance Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-amber-100/40 border border-orange-200/90 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-orange-900/70 uppercase tracking-wider block">
                      {student.name.split(' ')[0]}'s Available Bank Balance
                    </span>
                    <div className="text-3xl font-extrabold text-slate-900 font-display tabular-nums flex items-baseline gap-1.5 mt-0.5">
                      {student.points} <span className="text-sm font-bold text-orange-600">points</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Next Unlock Target</span>
                    <span className="text-xs font-bold text-slate-800">
                      {rewards.find((r) => student.points < r.pointsNeeded)?.title || 'All unlocked!'}
                    </span>
                    <span className="text-[10px] text-orange-700 font-bold block mt-0.5">
                      {Math.max(0, 250 - student.points)} pts needed
                    </span>
                  </div>
                </div>

                {/* Quick point bank metrics */}
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-orange-200/60 text-center">
                  <div className="p-1.5 rounded-lg bg-white/70">
                    <span className="text-[10px] text-slate-500 block">Lifetime Earned</span>
                    <span className="text-xs font-bold text-slate-900 font-mono">
                      {student.points + 235} pts
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/70">
                    <span className="text-[10px] text-slate-500 block">Redeemed</span>
                    <span className="text-xs font-bold text-emerald-700 font-mono">
                      235 pts
                    </span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/70">
                    <span className="text-[10px] text-slate-500 block">Streak</span>
                    <span className="text-xs font-bold text-orange-600 font-mono">
                      {student.streakDays} days 🔥
                    </span>
                  </div>
                </div>
              </div>

              {/* Weekly Allowance Automation */}
              <div className="p-3.5 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-teal-950">Weekly Habit Allowance</span>
                      <span className="text-[9px] font-bold bg-teal-200 text-teal-800 px-1.5 py-0.2 rounded">Recurring</span>
                    </div>
                    <p className="text-[11px] text-teal-800/80">
                      Current allowance: <strong>+{weeklyAllowance} pts / week</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={handleAllowancePay}
                    className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3" />
                    <span>Pay +{weeklyAllowance} pts Now</span>
                  </button>
                </div>
              </div>

              {/* 1-Tap Quick Instant Bonuses */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  1-Tap Instant Bank Deposits
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAwardBonus(10, 'Helped with chores & clean-up')}
                    className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition cursor-pointer group shadow-2xs overflow-hidden min-w-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-emerald-700 font-mono truncate">+10 pts</span>
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-700 mt-1 truncate">
                      Helped with chores
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAwardBonus(15, 'Focused homework without nagging')}
                    className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition cursor-pointer group shadow-2xs overflow-hidden min-w-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-emerald-700 font-mono truncate">+15 pts</span>
                      <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-700 mt-1 truncate">
                      Great study focus
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAwardBonus(25, 'Tidy bedroom & organised school bag')}
                    className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition cursor-pointer group shadow-2xs overflow-hidden min-w-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-emerald-700 font-mono truncate">+25 pts</span>
                      <Star className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-700 mt-1 truncate">
                      Tidy room & desk
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAwardBonus(50, 'Outstanding weekly perseverance')}
                    className="p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition cursor-pointer group shadow-2xs overflow-hidden min-w-0"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-orange-600 font-mono truncate">+50 pts</span>
                      <Trophy className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-700 mt-1 truncate">
                      Superstar milestone
                    </div>
                  </button>
                </div>
              </div>

              {/* Custom Points Form & Deduct Options */}
              <form onSubmit={handleCustomAwardSubmit} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">
                  Custom Point Bank Deposit or Correction
                </span>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Points Amount
                    </label>
                    <input
                      type="number"
                      value={pointsAmount}
                      onChange={(e) => setPointsAmount(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded-xl focus:border-orange-500"
                      placeholder="20"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-600 mb-1">
                      Encouraging Note / Reason
                    </label>
                    <input
                      type="text"
                      value={pointsReason}
                      onChange={(e) => setPointsReason(e.target.value)}
                      placeholder="e.g. Cleared table without reminder"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Deposit {pointsAmount > 0 ? `+${pointsAmount}` : pointsAmount} Points</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAwardBonus(-10, 'Rule reminder: screen time limit')}
                    className="px-2.5 py-2 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl text-[11px] font-semibold transition cursor-pointer"
                    title="Deduct 10 points"
                  >
                    -10 pts
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAwardBonus(-20, 'Unfinished chores reminder')}
                    className="px-2.5 py-2 bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 rounded-xl text-[11px] font-semibold transition cursor-pointer"
                    title="Deduct 20 points"
                  >
                    -20 pts
                  </button>
                </div>
              </form>

              {/* Point Bank Transaction Ledger Accordion */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowLedger(!showLedger)}
                  className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between transition cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <History className="w-3.5 h-3.5 text-slate-600" />
                    <span className="text-xs font-bold text-slate-800">
                      Point Bank Transaction Ledger ({pointTransactions.length} events)
                    </span>
                  </div>
                  <span className="text-[10px] text-teal-700 font-bold">
                    {showLedger ? 'Hide ▲' : 'Show ▼'}
                  </span>
                </button>

                {showLedger && (
                  <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto bg-white p-1">
                    {pointTransactions.map((tx) => {
                      const isPositive = tx.amount >= 0;
                      return (
                        <div key={tx.id} className="p-2 flex items-center justify-between text-xs">
                          <div className="min-w-0 flex-1 pr-2">
                            <span className="font-semibold text-slate-800 block truncate text-[11px]">
                              {tx.reason}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {tx.date} · {tx.time} · {tx.type}
                            </span>
                          </div>
                          <span className={`font-mono font-bold text-xs shrink-0 ${
                            isPositive ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {isPositive ? `+${tx.amount}` : tx.amount} pts
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* TAB 2: PRIZE VAULT WITH RICH IMAGES */
            <div className="space-y-5">
              {/* Existing Prizes with Rich Photo Cards */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-teal-700" />
                    <span>Family Prize Vault ({rewards.length})</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    Real-time sync to Jamie's device
                  </span>
                </div>

                <div className="space-y-3">
                  {rewards.map((reward) => {
                    const isEditing = editingRewardId === reward.id;
                    const isUnlocked = student.points >= reward.pointsNeeded;
                    const progressPct = Math.min(100, (student.points / reward.pointsNeeded) * 100);

                    return (
                      <div
                        key={reward.id}
                        className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col sm:flex-row transition hover:border-slate-300"
                      >
                        {/* Prize Photographic Image */}
                        <div className="sm:w-32 h-28 sm:h-auto bg-slate-100 relative shrink-0 overflow-hidden">
                          {reward.imageUrl ? (
                            <img
                              src={reward.imageUrl}
                              alt={reward.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-teal-50 text-teal-700">
                              <Gift className="w-8 h-8 opacity-60" />
                            </div>
                          )}
                          <span className="absolute top-2 left-2 text-[9px] font-bold bg-slate-900/80 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                            {reward.category}
                          </span>
                        </div>

                        {/* Prize Content & Controls */}
                        <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                                  {reward.title}
                                </h4>
                                {reward.description && (
                                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                                    {reward.description}
                                  </p>
                                )}
                              </div>

                              {/* Points Needed / Edit Box */}
                              <div className="shrink-0 flex items-center gap-1">
                                {isEditing ? (
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      value={editPointsValue}
                                      onChange={(e) => setEditPointsValue(Number(e.target.value))}
                                      className="w-14 px-1.5 py-0.5 text-xs font-mono font-bold border border-teal-500 rounded-lg text-center"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleSavePointsEdit(reward.id)}
                                      className="p-1 bg-teal-700 text-white rounded-md hover:bg-teal-800"
                                    >
                                      <Check className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingRewardId(null)}
                                      className="p-1 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="font-mono text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                                      {reward.pointsNeeded} pts
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setEditingRewardId(reward.id);
                                        setEditPointsValue(reward.pointsNeeded);
                                      }}
                                      className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                                      title="Edit target points"
                                    >
                                      <Edit2 className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => deleteReward(reward.id)}
                                      className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                                      title="Remove prize"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span>{student.points} / {reward.pointsNeeded} points</span>
                                <span className={isUnlocked ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                                  {isUnlocked ? 'Unlocked!' : `${Math.max(0, reward.pointsNeeded - student.points)} pts to go`}
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    isUnlocked 
                                      ? 'bg-emerald-500' 
                                      : 'bg-gradient-to-r from-orange-500 to-amber-400'
                                  }`}
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Button: Claim/Grant */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] text-slate-400">
                              Status: {reward.status === 'claimed' ? 'Claimed ✓' : isUnlocked ? 'Unlocked 🎉' : 'In Progress'}
                            </span>

                            {isUnlocked ? (
                              <button
                                type="button"
                                onClick={() => claimReward(reward.id)}
                                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle className="w-3 h-3" />
                                <span>Approve & Grant Prize</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleAwardBonus(reward.pointsNeeded - student.points, `Boosted to unlock: ${reward.title}`)}
                                className="px-2 py-0.5 text-[10px] text-orange-600 hover:text-orange-800 font-bold hover:underline cursor-pointer"
                              >
                                + Instant Unlock Boost
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add New Prize Form with Image Selector & Presets */}
              <form onSubmit={handleCreatePrize} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Plus className="w-4 h-4 text-teal-700" />
                    <span>Add New Motivating Prize with Visual Image</span>
                  </div>
                  <span className="text-[10px] text-teal-700 font-bold bg-teal-100/60 px-2 py-0.5 rounded-full">
                    Visual Vault
                  </span>
                </div>

                {/* 1-Tap Quick Image & Title Presets */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 mb-1.5">
                    1-Tap Reward Presets with Rich Photos:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRESET_PRIZE_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset)}
                        className={`p-1.5 rounded-xl border text-left transition cursor-pointer flex items-center gap-2 overflow-hidden ${
                          newImageUrl === preset.url
                            ? 'bg-teal-50 border-teal-600 shadow-2xs'
                            : 'bg-white border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <img 
                          src={preset.url} 
                          alt={preset.label} 
                          className="w-8 h-8 rounded-lg object-cover shrink-0" 
                        />
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-slate-800 block truncate">
                            {preset.label}
                          </span>
                          <span className="text-[9px] text-orange-600 font-mono font-semibold">
                            {preset.points} pts
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Title & Points */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                      Prize Name
                    </label>
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Saturday Trampoline Trip"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                      Target Points
                    </label>
                    <input
                      type="number"
                      value={newPoints}
                      onChange={(e) => setNewPoints(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-mono font-bold bg-white border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
                      min={10}
                      step={10}
                    />
                  </div>
                </div>

                {/* Image URL & Live Preview */}
                <div>
                  <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                    Image URL (Custom photo or web image)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
                    />
                    {newImageUrl && (
                      <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-300 shrink-0 shadow-2xs">
                        <img 
                          src={newImageUrl} 
                          alt="Preview" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as any).src = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Category & Description */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-1">
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none cursor-pointer"
                    >
                      <option value="Experience">Experience (Outing)</option>
                      <option value="Privilege">Privilege (Screen Time)</option>
                      <option value="Prizes">Prize (Toy/Gift)</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-semibold text-slate-700 mb-1">
                      Reward Details / Description
                    </label>
                    <input
                      type="text"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="e.g. Choose any cinema ticket + drink"
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:border-teal-600 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-800 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Save Prize with Image to Jamie's Vault</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span className="text-[11px]">Instant live sync across student & carer devices</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1 bg-white hover:bg-slate-200 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
