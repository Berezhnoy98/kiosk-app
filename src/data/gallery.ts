export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  image: string;
}

import heroImage from '../assets/hero.png';

export const gallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Школьная жизнь',
    date: '11 августа 2026',
    image: heroImage,
  },
];