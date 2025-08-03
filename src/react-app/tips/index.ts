// src/react-app/tips/index.ts

// Definisikan tipe datanya di sini
export interface Tip {
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

// Impor semua tips individual
import { tip1 } from './1';
import { tip2 } from './2';
// ...impor tips lainnya jika ada

// Gabungkan semua tips ke dalam satu array
export const tipsData: Tip[] = [
  tip1,
  tip2,
  // ...tambahkan tips lainnya di sini
];