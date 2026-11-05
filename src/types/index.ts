export type TaskStatus = 'not_started' | 'in_progress' | 'overdue' | 'submitted' | 'completed';

export type SubjectType = 'Maths' | 'Science' | 'English' | 'Languages' | 'History' | 'Art' | 'Geography' | 'Computing';

export type TaskCategory = 'Worksheet' | 'Reading' | 'Project' | 'Quiz' | 'Memorisation' | 'Essay' | 'Exercise';

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'image' | 'doc';
  url?: string;
}

export interface TaskComment {
  id: string;
  author: string;
  role: 'Parent' | 'Student';
  time: string;
  text: string;
  avatarColor?: string;
}

export interface TaskReminder {
  id: string;
  label: string;
  enabled: boolean;
}

export interface HomeworkTask {
  id: string;
  title: string;
  subject: SubjectType;
  category: TaskCategory;
  instructions: string;
  dueDate: string; // e.g. "2026-10-01"
  dueTime: string; // e.g. "16:00"
  dueDisplay: string; // e.g. "Today, 4:00 PM"
  repeats: string; // e.g. "Every Thursday" or "Does not repeat"
  repeatEndDate?: string;
  status: TaskStatus;
  points: number;
  assignedChildId: string;
  attachments: Attachment[];
  reminders: TaskReminder[];
  comments: TaskComment[];
  totalQuestions?: number;
  completedQuestions?: number;
  durationMinutes?: number;
  completedAt?: string;
}

export interface PointTransaction {
  id: string;
  amount: number;
  reason: string;
  date: string;
  time: string;
  type: 'bonus' | 'task_completion' | 'allowance' | 'deduction' | 'redemption';
}

export interface RewardGoal {
  id: string;
  title: string;
  pointsNeeded: number;
  currentPoints: number;
  icon: string;
  imageUrl?: string;
  description?: string;
  status: 'locked' | 'in_progress' | 'unlocked' | 'claimed';
  category: 'Experience' | 'Privilege' | 'Prizes';
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  bonusPoints: number;
  progress: number;
  total: number;
  completed: boolean;
}

export interface ActivityFeedItem {
  id: string;
  text: string;
  highlightText?: string;
  timeAgo: string;
  timestamp: string;
  type: 'completed' | 'comment' | 'created' | 'reward';
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  school: string;
  familyCode: string;
  points: number;
  avatarBg: string;
  streakDays: number;
}

export interface ParentProfile {
  name: string;
  role: string;
  email: string;
  avatarBg: string;
}

export type AuthProvider = 'google' | 'apple' | 'email' | 'demo';

export interface UserAuthProfile {
  id: string;
  name: string;
  email: string;
  role: 'parent' | 'teacher' | 'student';
  provider: AuthProvider;
  avatarBg?: string;
  familyName?: string;
}

export type ViewMode = 
  | 'parent-dashboard'
  | 'parent-editor'
  | 'student-schedule'
  | 'student-task'
  | 'progress-settings'
  | 'account-onboarding'
  | 'dual-sync'
  | 'login';

