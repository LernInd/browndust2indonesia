// src/react-app/spoiler/index.ts

// Definisikan tipe datanya di sini
export type SpoilerContent =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'video'; url: string; caption?: string };

export interface Spoiler {
  id: number;
  title: string;
  contents: SpoilerContent[];
  author?: string;
  socialLinks?: { [key: string]: string };
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