export interface VideoItem {
  id: string;
  title: string;
  date: string;
  description: string;
  videoUrl?: string;
}

export const videos: VideoItem[] = [
  {
    id: '1',
    title: 'Школьная жизнь',
    date: '11 августа 2026',
    description:
      'Видео о жизни нашей школы и школьных мероприятиях.',
  },
  {
    id: '2',
    title: 'Школьные мероприятия',
    date: '8 августа 2026',
    description:
      'Подборка материалов о событиях и мероприятиях школы.',
  },
];
