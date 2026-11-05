import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  HomeworkTask,
  TaskStatus,
  StudentProfile,
  ParentProfile,
  RewardGoal,
  DailyChallenge,
  ActivityFeedItem,
  ViewMode,
  UserAuthProfile,
  AuthProvider,
  PointTransaction,
} from '../types';
import {
  initialTasks,
  initialStudent,
  initialParent,
  initialRewards,
  initialChallenges,
  initialActivity,
  initialPointTransactions,
} from '../data/initialData';
import {
  TimeSimulation,
  TimeGreetingInfo,
  getTimeGreeting,
  getNextSimulation,
} from '../utils/timeGreeting';

interface AppContextType {
  // Auth state & actions
  isAuthenticated: boolean;
  currentUser: UserAuthProfile | null;
  loginWithGoogle: (email?: string, name?: string, role?: 'parent' | 'teacher' | 'student') => void;
  loginWithApple: (email?: string, name?: string, role?: 'parent' | 'teacher' | 'student') => void;
  loginWithEmail: (email: string, password?: string, name?: string, role?: 'parent' | 'teacher' | 'student', isSignUp?: boolean) => void;
  loginAsDemo: (role: 'parent' | 'teacher' | 'student') => void;
  logout: () => void;

  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  activeRole: 'student' | 'parent' | 'teacher';
  setActiveRole: (role: 'student' | 'parent' | 'teacher') => void;
  activeDevice: 'carer-device' | 'student-device';
  switchDevice: (device: 'carer-device' | 'student-device') => void;
  deviceSecurityModalOpen: boolean;
  setDeviceSecurityModalOpen: (open: boolean) => void;
  openDeviceSecurity: () => void;
  deviceMode: 'mobile-full' | 'phone-frame';
  setDeviceMode: (mode: 'mobile-full' | 'phone-frame') => void;
  timeSimulation: TimeSimulation;
  setTimeSimulation: (sim: TimeSimulation) => void;
  progressDayPhase: () => void;
  timeGreeting: TimeGreetingInfo;
  tasks: HomeworkTask[];
  student: StudentProfile;
  parent: ParentProfile;
  rewards: RewardGoal[];
  challenges: DailyChallenge[];
  activity: ActivityFeedItem[];
  pointTransactions: PointTransaction[];
  weeklyAllowance: number;
  setWeeklyAllowance: (amount: number) => void;
  payWeeklyAllowance: () => void;
  selectedTaskId: string;
  setSelectedTaskId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  filterStatus: string;
  setFilterStatus: (f: string) => void;
  viewStyle: 'list' | 'board';
  setViewStyle: (style: 'list' | 'board') => void;
  timeRange: '7 days' | '30 days' | 'Year';
  setTimeRange: (range: '7 days' | '30 days' | 'Year') => void;
  crossDeviceSync: boolean;
  setCrossDeviceSync: (sync: boolean) => void;
  showConfetti: boolean;
  setShowConfetti: (show: boolean) => void;
  notificationBadge: number;
  carerPrizesModalOpen: boolean;
  setCarerPrizesModalOpen: (open: boolean) => void;
  carerPrizesModalTab: 'prizes' | 'points';
  setCarerPrizesModalTab: (tab: 'prizes' | 'points') => void;
  openCarerPrizesModal: (tab?: 'prizes' | 'points') => void;
  currentDate: Date;
  selectedCalendarDate: Date;
  setSelectedCalendarDate: (date: Date) => void;
  calendarModalOpen: boolean;
  setCalendarModalOpen: (open: boolean) => void;
  openCalendarModal: (date?: Date) => void;
  
  // Actions
  selectTask: (id: string) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  completeTaskAsStudent: (id: string) => void;
  createTask: (newTask: Partial<HomeworkTask>) => void;
  updateTask: (task: HomeworkTask) => void;
  deleteTask: (id: string) => void;
  addComment: (taskId: string, text: string, role: 'Parent' | 'Student') => void;
  updateQuestionProgress: (taskId: string, delta: number) => void;
  claimReward: (id: string) => void;
  addReward: (rewardData: { 
    title: string; 
    pointsNeeded: number; 
    category: 'Experience' | 'Privilege' | 'Prizes'; 
    icon?: string;
    imageUrl?: string;
    description?: string;
  }) => void;
  updateReward: (rewardId: string, updates: Partial<RewardGoal>) => void;
  deleteReward: (rewardId: string) => void;
  awardPoints: (amount: number, reason: string) => void;
  depositPoints: (amount: number, reason: string) => void;
  deductPoints: (amount: number, reason: string) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'choredash_family_app_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_auth`);
      return saved !== 'false';
    } catch {
      return true;
    }
  });

  const [currentUser, setCurrentUser] = useState<UserAuthProfile | null>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
      return saved ? JSON.parse(saved) : {
        id: 'user_alex_parent_01',
        email: 'alex.miller@choredash.internal',
        name: 'Alex Miller',
        role: 'parent',
        provider: 'password',
        lastLogin: new Date().toISOString(),
      };
    } catch {
      return {
        id: 'user_alex_parent_01',
        email: 'alex.miller@choredash.internal',
        name: 'Alex Miller',
        role: 'parent',
        provider: 'password',
        lastLogin: new Date().toISOString(),
      };
    }
  });

  const [activeDevice, setActiveDevice] = useState<'carer-device' | 'student-device'>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_device`);
      return (saved === 'student-device' || saved === 'carer-device') ? saved : 'carer-device';
    } catch {
      return 'carer-device';
    }
  });

  const [activeRole, setActiveRole] = useState<'student' | 'parent' | 'teacher'>(() => {
    try {
      const savedUser = localStorage.getItem(`${LOCAL_STORAGE_KEY}_user`);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === 'teacher') return 'teacher';
      }
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_device`);
      return saved === 'student-device' ? 'student' : 'parent';
    } catch {
      return 'parent';
    }
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const savedAuth = localStorage.getItem(`${LOCAL_STORAGE_KEY}_auth`);
      if (savedAuth === 'false') return 'login';
      const savedDevice = localStorage.getItem(`${LOCAL_STORAGE_KEY}_device`);
      return savedDevice === 'student-device' ? 'student-schedule' : 'parent-dashboard';
    } catch {
      return 'parent-dashboard';
    }
  });

  const [deviceSecurityModalOpen, setDeviceSecurityModalOpen] = useState<boolean>(false);

  const switchDevice = (device: 'carer-device' | 'student-device') => {
    setActiveDevice(device);
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_device`, device);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    if (device === 'carer-device') {
      setActiveRole(currentUser?.role === 'teacher' ? 'teacher' : 'parent');
      setViewMode('parent-dashboard');
    } else {
      setActiveRole('student');
      setViewMode('student-schedule');
    }
  };

  const loginWithGoogle = (email?: string, name?: string, role: 'parent' | 'teacher' | 'student' = 'parent') => {
    const defaultEmail = role === 'student' ? 'jamie.miller@gmail.com' : role === 'teacher' ? 'sarah.teacher@gmail.com' : 'alex.miller@gmail.com';
    const defaultName = role === 'student' ? 'Jamie Miller' : role === 'teacher' ? 'Ms. Sarah Connor' : 'Alex Miller';
    const userEmail = email?.trim() || defaultEmail;
    const userName = name?.trim() || defaultName;
    const profile: UserAuthProfile = {
      id: `google-${Date.now()}`,
      name: userName,
      email: userEmail,
      role,
      provider: 'google',
      avatarBg: role === 'student' ? 'bg-amber-100 text-amber-800' : role === 'teacher' ? 'bg-cyan-700 text-white' : 'bg-teal-700 text-white',
      familyName: role === 'teacher' ? 'School Classroom' : 'Miller Family'
    };
    setCurrentUser(profile);
    setIsAuthenticated(true);
    if (role === 'teacher') {
      setParent({
        name: userName,
        role: 'Teacher & Educator',
        email: userEmail,
        avatarBg: 'bg-cyan-700 text-white'
      });
      setActiveRole('teacher');
    } else if (role === 'parent') {
      setParent({
        name: userName,
        role: 'Parent & Carer',
        email: userEmail,
        avatarBg: 'bg-teal-700 text-white'
      });
      setActiveRole('parent');
    }
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'true');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    switchDevice(role === 'student' ? 'student-device' : 'carer-device');
  };

  const loginWithApple = (email?: string, name?: string, role: 'parent' | 'teacher' | 'student' = 'parent') => {
    const defaultEmail = role === 'student' ? 'jamie.student@privaterelay.appleid.com' : role === 'teacher' ? 'teacher@privaterelay.appleid.com' : 'alex.parent@privaterelay.appleid.com';
    const defaultName = role === 'student' ? 'Jamie Miller' : role === 'teacher' ? 'Ms. Sarah Connor' : 'Alex Miller';
    const userEmail = email?.trim() || defaultEmail;
    const userName = name?.trim() || defaultName;
    const profile: UserAuthProfile = {
      id: `apple-${Date.now()}`,
      name: userName,
      email: userEmail,
      role,
      provider: 'apple',
      avatarBg: role === 'student' ? 'bg-emerald-100 text-emerald-800' : role === 'teacher' ? 'bg-cyan-800 text-white' : 'bg-slate-800 text-white',
      familyName: role === 'teacher' ? 'School Classroom' : 'Miller Family'
    };
    setCurrentUser(profile);
    setIsAuthenticated(true);
    if (role === 'teacher') {
      setParent({
        name: userName,
        role: 'Teacher & Educator',
        email: userEmail,
        avatarBg: 'bg-cyan-700 text-white'
      });
      setActiveRole('teacher');
    } else if (role === 'parent') {
      setParent({
        name: userName,
        role: 'Parent & Carer',
        email: userEmail,
        avatarBg: 'bg-teal-700 text-white'
      });
      setActiveRole('parent');
    }
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'true');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    switchDevice(role === 'student' ? 'student-device' : 'carer-device');
  };

  const loginWithEmail = (
    email: string, 
    _password?: string, 
    name?: string, 
    role: 'parent' | 'teacher' | 'student' = 'parent',
    _isSignUp?: boolean
  ) => {
    const defaultEmail = role === 'student' ? 'jamie.student@choredash.internal' : role === 'teacher' ? 'teacher@school.internal' : 'alex.parent@choredash.internal';
    const defaultName = role === 'student' ? 'Jamie Miller' : role === 'teacher' ? 'Teacher' : 'Alex Miller';
    const cleanEmail = email.trim() || defaultEmail;
    const displayName = name?.trim() || defaultName;
    const profile: UserAuthProfile = {
      id: `email-${Date.now()}`,
      name: displayName,
      email: cleanEmail,
      role,
      provider: 'email',
      avatarBg: role === 'student' ? 'bg-indigo-100 text-indigo-800' : role === 'teacher' ? 'bg-cyan-800 text-white' : 'bg-teal-800 text-white',
      familyName: role === 'teacher' ? 'School Classroom' : 'Miller Family'
    };
    setCurrentUser(profile);
    setIsAuthenticated(true);
    if (role === 'teacher') {
      setParent({
        name: displayName,
        role: 'Teacher & Educator',
        email: cleanEmail,
        avatarBg: 'bg-cyan-700 text-white'
      });
      setActiveRole('teacher');
    } else if (role === 'parent') {
      setParent({
        name: displayName,
        role: 'Parent & Carer',
        email: cleanEmail,
        avatarBg: 'bg-teal-700 text-white'
      });
      setActiveRole('parent');
    }
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'true');
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_user`, JSON.stringify(profile));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
    switchDevice(role === 'student' ? 'student-device' : 'carer-device');
  };

  const loginAsDemo = (role: 'parent' | 'teacher' | 'student') => {
    if (role === 'student') {
      loginWithGoogle('jamie.miller@gmail.com', 'Jamie Miller', 'student');
    } else if (role === 'teacher') {
      loginWithGoogle('teacher@school.edu', 'Ms. Sarah Connor', 'teacher');
    } else {
      loginWithGoogle('alex.miller@gmail.com', 'Alex Miller', 'parent');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'false');
      localStorage.removeItem(`${LOCAL_STORAGE_KEY}_user`);
    } catch (e) {
      console.warn('LocalStorage clear failed:', e);
    }
    setViewMode('login');
  };

  const openDeviceSecurity = () => {
    setDeviceSecurityModalOpen(true);
  };
  const [timeSimulation, setTimeSimulation] = useState<TimeSimulation>('auto');
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => new Date());
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);

  // Live real-time clock: updates every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const openCalendarModal = (date?: Date) => {
    if (date) setSelectedCalendarDate(date);
    setCalendarModalOpen(true);
  };

  const timeGreeting = useMemo(() => {
    return getTimeGreeting(timeSimulation, currentDate);
  }, [timeSimulation, currentDate]);

  const [deviceMode, setDeviceMode] = useState<'mobile-full' | 'phone-frame'>('mobile-full');
  const [tasks, setTasks] = useState<HomeworkTask[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tasks`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.slice(0, 3);
        }
      }
      return initialTasks.slice(0, 3);
    } catch {
      return initialTasks.slice(0, 3);
    }
  });

  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_student`);
      return saved ? JSON.parse(saved) : initialStudent;
    } catch {
      return initialStudent;
    }
  });

  const [parent, setParent] = useState<ParentProfile>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_parent`);
      return saved ? JSON.parse(saved) : initialParent;
    } catch {
      return initialParent;
    }
  });

  const [rewards, setRewards] = useState<RewardGoal[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_rewards`);
      return saved ? JSON.parse(saved) : initialRewards;
    } catch {
      return initialRewards;
    }
  });

  const [challenges, setChallenges] = useState<DailyChallenge[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_challenges`);
      return saved ? JSON.parse(saved) : initialChallenges;
    } catch {
      return initialChallenges;
    }
  });

  const [activity, setActivity] = useState<ActivityFeedItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activity`);
      return saved ? JSON.parse(saved) : initialActivity;
    } catch {
      return initialActivity;
    }
  });

  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_point_tx`);
      return saved ? JSON.parse(saved) : initialPointTransactions;
    } catch {
      return initialPointTransactions;
    }
  });

  const [weeklyAllowance, setWeeklyAllowance] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_allowance`);
      return saved ? Number(saved) : 30;
    } catch {
      return 30;
    }
  });

  const [selectedTaskId, setSelectedTaskId] = useState<string>('task-1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewStyle, setViewStyle] = useState<'list' | 'board'>('list');
  const [timeRange, setTimeRange] = useState<'7 days' | '30 days' | 'Year'>('7 days');
  const [crossDeviceSync, setCrossDeviceSync] = useState<boolean>(true);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [notificationBadge, setNotificationBadge] = useState<number>(2);
  const [carerPrizesModalOpen, setCarerPrizesModalOpen] = useState<boolean>(false);
  const [carerPrizesModalTab, setCarerPrizesModalTab] = useState<'prizes' | 'points'>('points');

  const openCarerPrizesModal = (tab: 'prizes' | 'points' = 'points') => {
    setCarerPrizesModalTab(tab);
    setCarerPrizesModalOpen(true);
  };

  const progressDayPhase = () => {
    const next = getNextSimulation(timeSimulation === 'auto' ? timeGreeting.period : timeSimulation);
    setTimeSimulation(next);
  };

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_tasks`, JSON.stringify(tasks));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_student`, JSON.stringify(student));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_parent`, JSON.stringify(parent));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_rewards`, JSON.stringify(rewards));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_challenges`, JSON.stringify(challenges));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_activity`, JSON.stringify(activity));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_point_tx`, JSON.stringify(pointTransactions));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_allowance`, String(weeklyAllowance));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [tasks, student, parent, rewards, challenges, activity, pointTransactions, weeklyAllowance]);

  const selectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  const updateTaskStatus = (id: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const completedAt = newStatus === 'completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined;
          return { ...t, status: newStatus, completedAt };
        }
        return t;
      })
    );
  };

  const completeTaskAsStudent = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const alreadyDone = task.status === 'completed';
    const newStatus: TaskStatus = alreadyDone ? 'in_progress' : 'completed';
    const pointsToAdd = alreadyDone ? -task.points : task.points;

    // Update task
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              completedQuestions: newStatus === 'completed' ? t.totalQuestions || 1 : t.completedQuestions,
              completedAt: newStatus === 'completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
            }
          : t
      )
    );

    // Update student points
    const newTotalPoints = Math.max(0, student.points + pointsToAdd);
    setStudent((prev) => ({
      ...prev,
      points: newTotalPoints,
    }));

    // Update rewards current points
    setRewards((prev) =>
      prev.map((r) => ({
        ...r,
        currentPoints: newTotalPoints,
        status: newTotalPoints >= r.pointsNeeded ? 'unlocked' : 'in_progress',
      }))
    );

    // Update challenges & point bank if completed
    if (newStatus === 'completed') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3500);

      // Add point transaction
      const pointTx: PointTransaction = {
        id: `tx-${Date.now()}`,
        amount: pointsToAdd,
        reason: `${task.title.split('—')[0].trim()} completed`,
        date: 'Today',
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
        type: 'task_completion',
      };
      setPointTransactions((prev) => [pointTx, ...prev]);

      setChallenges((prev) =>
        prev.map((c) => {
          const nextProgress = Math.min(c.total, c.progress + 1);
          return {
            ...c,
            progress: nextProgress,
            completed: nextProgress >= c.total,
          };
        })
      );

      // Add to activity feed
      const newActivityItem: ActivityFeedItem = {
        id: `act-${Date.now()}`,
        text: `Jamie marked '${task.title}' complete`,
        highlightText: `'${task.title}'`,
        timeAgo: 'Just now',
        timestamp: new Date().toISOString(),
        type: 'completed',
      };
      setActivity((prev) => [newActivityItem, ...prev]);
    }
  };

  const createTask = (newTaskData: Partial<HomeworkTask>) => {
    const newTask: HomeworkTask = {
      id: `task-${Date.now()}`,
      title: newTaskData.title || 'Untitled Homework',
      subject: newTaskData.subject || 'Maths',
      category: newTaskData.category || 'Worksheet',
      instructions: newTaskData.instructions || '',
      dueDate: newTaskData.dueDate || new Date().toISOString().split('T')[0],
      dueTime: newTaskData.dueTime || '16:00',
      dueDisplay: newTaskData.dueDisplay || 'Today, 4:00 PM',
      repeats: newTaskData.repeats || 'Does not repeat',
      repeatEndDate: newTaskData.repeatEndDate,
      status: 'not_started',
      points: newTaskData.points || 15,
      assignedChildId: 'jamie',
      attachments: newTaskData.attachments || [],
      reminders: newTaskData.reminders || [
        { id: 'rem-new-1', label: '1 day before at 9:00 AM', enabled: true },
        { id: 'rem-new-2', label: '2 hours before', enabled: true },
      ],
      comments: [],
      totalQuestions: newTaskData.totalQuestions || 10,
      completedQuestions: 0,
      durationMinutes: newTaskData.durationMinutes || 30,
    };

    setTasks((prev) => [newTask, ...prev]);
    setSelectedTaskId(newTask.id);

    // Activity feed item
    const feedItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `Alex assigned '${newTask.title}'`,
      highlightText: `'${newTask.title}'`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'created',
    };
    setActivity((prev) => [feedItem, ...prev]);
  };

  const updateTask = (updated: HomeworkTask) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const addComment = (taskId: string, text: string, role: 'Parent' | 'Student') => {
    if (!text.trim()) return;

    const newComment = {
      id: `com-${Date.now()}`,
      author: role === 'Parent' ? 'Mum' : 'Jamie',
      role,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim(),
      avatarColor: role === 'Parent' ? 'bg-orange-500' : 'bg-emerald-600',
    };

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            comments: [...t.comments, newComment],
          };
        }
        return t;
      })
    );

    // Add activity
    const activityItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `${role === 'Parent' ? 'Alex' : 'Jamie'} commented on ${tasks.find((t) => t.id === taskId)?.subject || 'task'}`,
      highlightText: tasks.find((t) => t.id === taskId)?.title || '',
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'comment',
    };
    setActivity((prev) => [activityItem, ...prev]);
  };

  const updateQuestionProgress = (taskId: string, delta: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId && t.totalQuestions) {
          const next = Math.max(0, Math.min(t.totalQuestions, (t.completedQuestions || 0) + delta));
          return {
            ...t,
            completedQuestions: next,
            status: next === t.totalQuestions ? 'completed' : next > 0 ? 'in_progress' : t.status,
          };
        }
        return t;
      })
    );
  };

  const claimReward = (rewardId: string) => {
    const reward = rewards.find((r) => r.id === rewardId);
    if (!reward || student.points < reward.pointsNeeded) return;

    setStudent((prev) => ({
      ...prev,
      points: prev.points - reward.pointsNeeded,
    }));

    setRewards((prev) =>
      prev.map((r) => (r.id === rewardId ? { ...r, status: 'claimed' } : r))
    );

    // Record point transaction
    const pointTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      amount: -reward.pointsNeeded,
      reason: `Claimed prize: ${reward.title}`,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      type: 'redemption',
    };
    setPointTransactions((prev) => [pointTx, ...prev]);

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    const activityItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `Jamie unlocked reward '${reward.title}'!`,
      highlightText: `'${reward.title}'`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'reward',
    };
    setActivity((prev) => [activityItem, ...prev]);
  };

  const addReward = (rewardData: {
    title: string;
    pointsNeeded: number;
    category: 'Experience' | 'Privilege' | 'Prizes';
    icon?: string;
    imageUrl?: string;
    description?: string;
  }) => {
    const isUnlocked = student.points >= rewardData.pointsNeeded;
    const newReward: RewardGoal = {
      id: `rew-${Date.now()}`,
      title: rewardData.title,
      pointsNeeded: rewardData.pointsNeeded,
      currentPoints: student.points,
      icon: rewardData.icon || 'gift',
      imageUrl: rewardData.imageUrl || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      description: rewardData.description || '',
      status: isUnlocked ? 'unlocked' : 'in_progress',
      category: rewardData.category,
    };
    setRewards((prev) => [...prev, newReward]);

    const activityItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `Alex added new prize '${newReward.title}' (${newReward.pointsNeeded} pts)`,
      highlightText: `'${newReward.title}'`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'reward',
    };
    setActivity((prev) => [activityItem, ...prev]);
  };

  const updateReward = (rewardId: string, updates: Partial<RewardGoal>) => {
    setRewards((prev) =>
      prev.map((r) => {
        if (r.id === rewardId) {
          const updated = { ...r, ...updates };
          const isUnlocked = student.points >= updated.pointsNeeded;
          return {
            ...updated,
            status: r.status === 'claimed' ? 'claimed' : isUnlocked ? 'unlocked' : 'in_progress',
          };
        }
        return r;
      })
    );
  };

  const deleteReward = (rewardId: string) => {
    setRewards((prev) => prev.filter((r) => r.id !== rewardId));
  };

  const awardPoints = (amount: number, reason: string) => {
    const newTotal = Math.max(0, student.points + amount);
    setStudent((prev) => ({
      ...prev,
      points: newTotal,
    }));

    setRewards((prev) =>
      prev.map((r) => {
        if (r.status === 'claimed') return r;
        return {
          ...r,
          currentPoints: newTotal,
          status: newTotal >= r.pointsNeeded ? 'unlocked' : 'in_progress',
        };
      })
    );

    // Record transaction
    const pointTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      reason,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      type: amount >= 0 ? 'bonus' : 'deduction',
    };
    setPointTransactions((prev) => [pointTx, ...prev]);

    if (amount > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    const activityItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `Alex ${amount >= 0 ? 'awarded +' + amount : amount} pts: ${reason}`,
      highlightText: `${amount >= 0 ? '+' : ''}${amount} pts`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'reward',
    };
    setActivity((prev) => [activityItem, ...prev]);
  };

  const depositPoints = (amount: number, reason: string) => {
    awardPoints(Math.abs(amount), reason);
  };

  const deductPoints = (amount: number, reason: string) => {
    awardPoints(-Math.abs(amount), reason);
  };

  const payWeeklyAllowance = () => {
    const amount = weeklyAllowance || 30;
    const reason = 'Weekly positive habits allowance';
    const newTotal = Math.max(0, student.points + amount);
    setStudent((prev) => ({
      ...prev,
      points: newTotal,
    }));
    setRewards((prev) =>
      prev.map((r) => {
        if (r.status === 'claimed') return r;
        return {
          ...r,
          currentPoints: newTotal,
          status: newTotal >= r.pointsNeeded ? 'unlocked' : 'in_progress',
        };
      })
    );
    const pointTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      reason,
      date: 'Today',
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      type: 'allowance',
    };
    setPointTransactions((prev) => [pointTx, ...prev]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    const activityItem: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      text: `Alex paid Jamie's weekly allowance (+${amount} pts)`,
      highlightText: `+${amount} pts`,
      timeAgo: 'Just now',
      timestamp: new Date().toISOString(),
      type: 'reward',
    };
    setActivity((prev) => [activityItem, ...prev]);
  };

  const resetToDemoData = () => {
    setTasks(initialTasks);
    setStudent(initialStudent);
    setParent(initialParent);
    setRewards(initialRewards);
    setChallenges(initialChallenges);
    setActivity(initialActivity);
    setPointTransactions(initialPointTransactions);
    setWeeklyAllowance(30);
    setSelectedTaskId('task-1');
    localStorage.clear();
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loginWithGoogle,
        loginWithApple,
        loginWithEmail,
        loginAsDemo,
        logout,
        viewMode,
        setViewMode,
        activeRole,
        setActiveRole,
        activeDevice,
        switchDevice,
        deviceSecurityModalOpen,
        setDeviceSecurityModalOpen,
        openDeviceSecurity,
        deviceMode,
        setDeviceMode,
        timeSimulation,
        setTimeSimulation,
        progressDayPhase,
        timeGreeting,
        tasks,
        student,
        parent,
        rewards,
        challenges,
        activity,
        pointTransactions,
        weeklyAllowance,
        setWeeklyAllowance,
        payWeeklyAllowance,
        depositPoints,
        deductPoints,
        selectedTaskId,
        setSelectedTaskId,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        viewStyle,
        setViewStyle,
        timeRange,
        setTimeRange,
        crossDeviceSync,
        setCrossDeviceSync,
        showConfetti,
        setShowConfetti,
        notificationBadge,
        carerPrizesModalOpen,
        setCarerPrizesModalOpen,
        carerPrizesModalTab,
        setCarerPrizesModalTab,
        openCarerPrizesModal,
        currentDate,
        selectedCalendarDate,
        setSelectedCalendarDate,
        calendarModalOpen,
        setCalendarModalOpen,
        openCalendarModal,
        selectTask,
        updateTaskStatus,
        completeTaskAsStudent,
        createTask,
        updateTask,
        deleteTask,
        addComment,
        updateQuestionProgress,
        claimReward,
        addReward,
        updateReward,
        deleteReward,
        awardPoints,
        resetToDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
