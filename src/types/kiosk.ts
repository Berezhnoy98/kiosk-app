export type Screen =
  | 'home'
  | 'news'
  | 'schedule'
  | 'gallery'
  | 'video'
  | 'canteen';

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
}

export interface ScheduleItem {
  time: string;
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