
export const ROLES = {
  ADMIN: 'admin',
  TRANSLATOR: 'translator',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const TRANSLATOR_LEVELS = [
  'Newcomer',
  'Regular',
  'Top Performer',
  'Expert',
  'Legend',
] as const;

export type TranslatorLevel = typeof TRANSLATOR_LEVELS[number];

export const NAV_ITEMS = [
  { href: '/dashboard', labelKey: 'dashboard', icon: 'LayoutDashboard' },
  { href: '/leaderboards', labelKey: 'leaderboards', icon: 'Award' },
  { href: '/spenders', labelKey: 'spenders', icon: 'Users' },
  { href: '/admin', labelKey: 'adminPanel', icon: 'Settings', adminOnly: true },
] as const;

export const ADMIN_NAV_ITEMS = [
  { href: '/admin/translators', labelKey: 'translators', icon: 'UsersRound' },
  { href: '/admin/spenders', labelKey: 'spenders', icon: 'CircleDollarSign' },
  { href: '/admin/users', labelKey: 'users', icon: 'UserCog' },
  { href: '/admin/daily-input', labelKey: 'dailyInput', icon: 'CalendarPlus' },
  { href: '/admin/weekly-input', labelKey: 'weeklyInput', icon: 'CalendarCheck' },
  { href: '/admin/monthly-input', labelKey: 'monthlyInput', icon: 'CalendarDays' },
  { href: '/admin/weekly-actions', labelKey: 'weeklyActions', icon: 'ListChecks' },
  { href: '/admin/top-9-legends', labelKey: 'top9Legends', icon: 'Crown' },
]

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
] as const;

export type LanguageCode = typeof LANGUAGES[number]['code'];
