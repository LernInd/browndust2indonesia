// src/react-app/karakter/index.ts

// Definisikan tipe datanya di sini
export type KarakterContent =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'video'; url: string; caption?: string };

export interface Karakter {
  id: number;
  title: string;
  contents: KarakterContent[];
  author?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
}

// Impor semua karakter individual
import { karakter1 } from './1';
import { karakter2 } from './2';
// ...impor karakter lainnya jika ada

// Gabungkan semua karakter ke dalam satu array
export const karakterData: Karakter[] = [
  karakter1,
  karakter2,
  // ...tambahkan karakter lainnya di sini
];