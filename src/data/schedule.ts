import type { ScheduleItem } from '../types/kiosk';

export type ScheduleDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export interface ScheduleDayInfo {
  id: ScheduleDay;
  label: string;
  shortLabel: string;
}

export const scheduleDays: ScheduleDayInfo[] = [
  {
    id: 'monday',
    label: 'Понедельник',
    shortLabel: 'Пн',
  },
  {
    id: 'tuesday',
    label: 'Вторник',
    shortLabel: 'Вт',
  },
  {
    id: 'wednesday',
    label: 'Среда',
    shortLabel: 'Ср',
  },
  {
    id: 'thursday',
    label: 'Четверг',
    shortLabel: 'Чт',
  },
  {
    id: 'friday',
    label: 'Пятница',
    shortLabel: 'Пт',
  },
  {
    id: 'saturday',
    label: 'Суббота',
    shortLabel: 'Сб',
  },
];

export const availableClasses = [
  '5А',
  '5Б',
  '6А',
  '6Б',
  '7А',
  '7Б',
  '8А',
  '8Б',
  '9А',
  '9Б',
  '10А',
  '10Б',
  '11А',
  '11Б',
];

const mondaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Русский язык',
      className: '5А',
      room: '105',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'История',
      className: '5А',
      room: '301',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'Физкультура',
      className: '5А',
      room: 'Спортзал',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '7А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Русский язык',
      className: '7А',
      room: '105',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'История',
      className: '7А',
      room: '301',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'Физика',
      className: '7А',
      room: '207',
    },
  ],

  '9А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Алгебра',
      className: '9А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Русский язык',
      className: '9А',
      room: '105',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Физика',
      className: '9А',
      room: '207',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'История',
      className: '9А',
      room: '301',
    },
  ],
};

const tuesdaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Литература',
      className: '5А',
      room: '105',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Биология',
      className: '5А',
      room: '302',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'Английский язык',
      className: '5А',
      room: '208',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'География',
      className: '7А',
      room: '206',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Математика',
      className: '7А',
      room: '204',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Литература',
      className: '7А',
      room: '105',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'Биология',
      className: '7А',
      room: '302',
    },
  ],

  '9А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Геометрия',
      className: '9А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Химия',
      className: '9А',
      room: '304',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Литература',
      className: '9А',
      room: '105',
    },
    {
      time: '11:15',
      endTime: '12:00',
      subject: 'История',
      className: '9А',
      room: '301',
    },
  ],
};

const wednesdaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'История',
      className: '5А',
      room: '301',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Русский язык',
      className: '5А',
      room: '105',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Физика',
      className: '7А',
      room: '207',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'История',
      className: '7А',
      room: '301',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Математика',
      className: '7А',
      room: '204',
    },
  ],
};

const thursdaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Физкультура',
      className: '5А',
      room: 'Спортзал',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Литература',
      className: '5А',
      room: '105',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Русский язык',
      className: '7А',
      room: '105',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Физика',
      className: '7А',
      room: '207',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'География',
      className: '7А',
      room: '206',
    },
  ],
};

const fridaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Русский язык',
      className: '5А',
      room: '105',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'ИЗО',
      className: '5А',
      room: '108',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '7А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Обществознание',
      className: '7А',
      room: '303',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Русский язык',
      className: '7А',
      room: '105',
    },
  ],
};

const saturdaySchedule: Record<string, ScheduleItem[]> = {
  '5А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '5А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Русский язык',
      className: '5А',
      room: '105',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Музыка',
      className: '5А',
      room: '108',
    },
  ],

  '7А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Математика',
      className: '7А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Информатика',
      className: '7А',
      room: '205',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Физкультура',
      className: '7А',
      room: 'Спортзал',
    },
  ],

  '9А': [
    {
      time: '08:30',
      endTime: '09:15',
      subject: 'Алгебра',
      className: '9А',
      room: '204',
    },
    {
      time: '09:25',
      endTime: '10:10',
      subject: 'Физика',
      className: '9А',
      room: '207',
    },
    {
      time: '10:20',
      endTime: '11:05',
      subject: 'Обществознание',
      className: '9А',
      room: '303',
    },
  ],
};

export const scheduleByDay: Record<
  ScheduleDay,
  Record<string, ScheduleItem[]>
> = {
  monday: mondaySchedule,
  tuesday: tuesdaySchedule,
  wednesday: wednesdaySchedule,
  thursday: thursdaySchedule,
  friday: fridaySchedule,
  saturday: saturdaySchedule,
};
