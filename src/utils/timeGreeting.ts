export type TimePeriod = 'morning' | 'afternoon' | 'evening';
export type TimeSimulation = 'auto' | 'morning' | 'afternoon' | 'evening';

export interface TimeGreetingInfo {
  greeting: string;
  period: TimePeriod;
  emoji: string;
  subtitle: string;
  timeDisplay: string;
  timeDisplayWithSeconds: string;
  dateDisplay: string;
  dateShort: string;
  dayName: string;
  dayShort: string;
  monthName: string;
  monthYear: string;
  year: number;
  dayOfMonth: number;
  isoDate: string;
  phaseIndex: number; // 0: morning, 1: afternoon, 2: evening
  phasePercent: number; // 25%, 65%, 95%
  phaseTitle: string;
  nextGreeting: string;
  nextPeriod: TimePeriod;
  routineTips: string[];
}

export function getNextPeriod(period: TimePeriod): TimePeriod {
  if (period === 'morning') return 'afternoon';
  if (period === 'afternoon') return 'evening';
  return 'morning';
}

export function getNextSimulation(sim: TimeSimulation): TimeSimulation {
  if (sim === 'morning') return 'afternoon';
  if (sim === 'afternoon') return 'evening';
  if (sim === 'evening') return 'morning';
  return 'morning'; // from auto, step to morning
}

export interface CalendarDay {
  date: Date;
  num: number;
  day: string;
  dayFull: string;
  full: string; // YYYY-MM-DD
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
}

export interface CalendarGridDay {
  date: Date;
  dayNumber: number;
  isoDate: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

export function formatTwoDigits(n: number): string {
  return n.toString().padStart(2, '0');
}

export function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${formatTwoDigits(d.getMonth() + 1)}-${formatTwoDigits(d.getDate())}`;
}

export function getTimeGreeting(simulation: TimeSimulation = 'auto', currentDate: Date = new Date()): TimeGreetingInfo {
  const now = currentDate;
  const hour = simulation === 'morning' ? 9 : simulation === 'afternoon' ? 14 : simulation === 'evening' ? 19 : now.getHours();
  
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayShorts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthShorts = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = dayNames[now.getDay()];
  const dayShort = dayShorts[now.getDay()];
  const monthName = monthNames[now.getMonth()];
  const monthShort = monthShorts[now.getMonth()];
  const year = now.getFullYear();
  const dayOfMonth = now.getDate();
  const isoDate = toIsoDate(now);

  const monthYear = `${monthName} ${year}`;
  const dateDisplay = `${dayName}, ${dayOfMonth} ${monthShort} ${year}`;
  const dateShort = `${dayShort}, ${dayOfMonth} ${monthShort}`;

  // Time format
  let timeDisplay = '9:41 AM';
  let timeDisplayWithSeconds = '9:41:00 AM';

  if (simulation === 'morning') {
    timeDisplay = '9:15 AM';
    timeDisplayWithSeconds = '9:15:00 AM';
  } else if (simulation === 'afternoon') {
    timeDisplay = '2:30 PM';
    timeDisplayWithSeconds = '2:30:00 PM';
  } else if (simulation === 'evening') {
    timeDisplay = '7:45 PM';
    timeDisplayWithSeconds = '7:45:00 PM';
  } else {
    try {
      timeDisplay = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      timeDisplayWithSeconds = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' });
    } catch {
      const h = now.getHours();
      const m = formatTwoDigits(now.getMinutes());
      const s = formatTwoDigits(now.getSeconds());
      const ampm = h >= 12 ? 'PM' : 'AM';
      timeDisplay = `${h % 12 || 12}:${m} ${ampm}`;
      timeDisplayWithSeconds = `${h % 12 || 12}:${m}:${s} ${ampm}`;
    }
  }

  if (hour >= 5 && hour < 12) {
    return {
      greeting: 'Good morning',
      period: 'morning',
      emoji: '☀️',
      subtitle: 'Morning routine & focus',
      timeDisplay,
      timeDisplayWithSeconds,
      dateDisplay,
      dateShort,
      dayName,
      dayShort,
      monthName,
      monthYear,
      year,
      dayOfMonth,
      isoDate,
      phaseIndex: 0,
      phasePercent: 25,
      phaseTitle: 'Morning Momentum',
      nextGreeting: 'Good afternoon',
      nextPeriod: 'afternoon',
      routineTips: [
        'Energising breakfast & hydration',
        'Check homework due in school today',
        'School backpack packed & ready',
      ],
    };
  }

  if (hour >= 12 && hour < 17) {
    return {
      greeting: 'Good afternoon',
      period: 'afternoon',
      emoji: '🌤️',
      subtitle: 'Afternoon homework & study sprint',
      timeDisplay,
      timeDisplayWithSeconds,
      dateDisplay,
      dateShort,
      dayName,
      dayShort,
      monthName,
      monthYear,
      year,
      dayOfMonth,
      isoDate,
      phaseIndex: 1,
      phasePercent: 65,
      phaseTitle: 'Afternoon Study Sprint',
      nextGreeting: 'Good evening',
      nextPeriod: 'evening',
      routineTips: [
        'Healthy after-school snack',
        'Tackle hardest worksheet first',
        'Earn points towards prize milestone',
      ],
    };
  }

  return {
    greeting: 'Good evening',
    period: 'evening',
    emoji: '🌙',
    subtitle: 'Evening wrap-up & reward check-in',
    timeDisplay,
    timeDisplayWithSeconds,
    dateDisplay,
    dateShort,
    dayName,
    dayShort,
    monthName,
    monthYear,
    year,
    dayOfMonth,
    isoDate,
    phaseIndex: 2,
    phasePercent: 95,
    phaseTitle: 'Evening Wind-Down',
    nextGreeting: 'Good morning',
    nextPeriod: 'morning',
    routineTips: [
      'Carer checks completed work & signs off',
      'Bank daily bonus points & claim rewards',
      'Bedtime reading & screen wind-down',
    ],
  };
}

/**
 * Returns the 7 days of the week containing the reference date (starting Monday)
 */
export function getWeekDates(referenceDate: Date = new Date(), today: Date = new Date()): CalendarDay[] {
  const dayOfWeek = referenceDate.getDay(); // 0 is Sunday, 1 is Monday
  // Distance from Monday (if Sunday (0), distance is 6; otherwise dayOfWeek - 1)
  const distanceToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const monday = new Date(referenceDate);
  monday.setDate(referenceDate.getDate() - distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const todayIso = toIsoDate(today);
  const dayShorts = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayFulls = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const days: CalendarDay[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = toIsoDate(d);
    
    // Compare date with today
    const dOnly = new Date(d).setHours(0, 0, 0, 0);
    const todayOnly = new Date(today).setHours(0, 0, 0, 0);

    days.push({
      date: d,
      num: d.getDate(),
      day: dayShorts[i],
      dayFull: dayFulls[i],
      full: iso,
      isToday: iso === todayIso,
      isPast: dOnly < todayOnly,
      isFuture: dOnly > todayOnly,
    });
  }

  return days;
}

/**
 * Returns full grid of days for a monthly calendar view (including leading & trailing padding days)
 */
export function getMonthCalendarGrid(year: number, month: number, today: Date = new Date(), selectedDate?: Date): CalendarGridDay[] {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 is Sun
  const leadingDaysCount = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1; // start from Mon

  const todayIso = toIsoDate(today);
  const selectedIso = selectedDate ? toIsoDate(selectedDate) : '';

  const grid: CalendarGridDay[] = [];

  // 1. Leading days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = leadingDaysCount - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevMonthLastDay - i);
    const iso = toIsoDate(d);
    grid.push({
      date: d,
      dayNumber: d.getDate(),
      isoDate: iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === selectedIso,
    });
  }

  // 2. Current month days
  const totalDaysInMonth = lastDayOfMonth.getDate();
  for (let d = 1; d <= totalDaysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const iso = toIsoDate(dateObj);
    grid.push({
      date: dateObj,
      dayNumber: d,
      isoDate: iso,
      isCurrentMonth: true,
      isToday: iso === todayIso,
      isSelected: iso === selectedIso,
    });
  }

  // 3. Trailing days from next month to complete standard 35 or 42 cell grid
  const remainingCells = (7 - (grid.length % 7)) % 7;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    const iso = toIsoDate(d);
    grid.push({
      date: d,
      dayNumber: d.getDate(),
      isoDate: iso,
      isCurrentMonth: false,
      isToday: iso === todayIso,
      isSelected: iso === selectedIso,
    });
  }

  return grid;
}
