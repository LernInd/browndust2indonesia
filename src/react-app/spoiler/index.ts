// src/react-app/spoiler/index.ts

// Definisikan tipe datanya di sini
export interface Spoiler {
  id: number;
  title: string;
  shortDescription: string;
  fullContent: string;
  author?: string;
  imageUrl?: string;
  youtubeUrl?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

// Impor semua spoiler individual
import { spoiler1 } from './1';
import { spoiler2 } from './2';
// ...impor spoiler lainnya jika ada

// Gabungkan semua spoiler ke dalam satu array
export const spoilerData: Spoiler[] = [
  spoiler1,
  spoiler2,
  // ...tambahkan spoiler lainnya di sini
];