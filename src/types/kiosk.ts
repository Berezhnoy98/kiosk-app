export type Screen =
  | 'home'
  | 'news'
  | 'schedule'
  | 'gallery'
  | 'video'
  | 'canteen';

export type UserRole = 'admin' | 'canteen';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  link?: string;
}

export interface ScheduleItem {
  time: string;
  endTime: string;
  subject: string;
  className: string;
  room: string;
}

export interface MenuItem {
  name: string;
  description?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export type MenuDayId =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface MenuDay {
  id: MenuDayId;
  shortLabel: string;
  label: string;
  date: string;
  sections: MenuSection[];
}