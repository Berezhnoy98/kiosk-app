export interface VideoItem {
  id: string;
  title: string;
  date: string;
  description: string;
  videoUrl?: string;
}

export const videos: VideoItem[] = [
  {
    id: 'webinar-1',
    title: 'Вебинар №1',
    date: '11 августа 2026',
    description:
      'Видеоматериалы для школьного информационного киоска.',
    videoUrl: '/videos/webinar-1.mp4',
  },
  {
    id: 'webinar-2',
    title: 'Вебинар №2',
    date: '11 августа 2026',
    description:
      'Видеоматериалы для школьного информационного киоска.',
    videoUrl: '/videos/webinar-2.mp4',
  },
  {
    id: 'webinar-3',
    title: 'Вебинар №3',
    date: '11 августа 2026',
    description:
      'Видеоматериалы для школьного информационного киоска.',
    videoUrl: '/videos/webinar-3.mp4',
  },
];