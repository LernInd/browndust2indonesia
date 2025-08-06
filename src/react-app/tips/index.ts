// src/react-app/tips/index.ts

export type TipContent =
  | { type: 'text'; value: string }
  | { type: 'image'; url: string; caption?: string }
  | { type: 'video'; url: string; caption?: string };

export interface Tip {
  id: number;
  title: string;
  contents: TipContent[];
  author?: string;
  socialLinks?: { [key: string]: string };
}

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

import { tip1 } from './1';
import { tip2 } from './2';
// ...impor tips lainnya jika ada

export const tipsData: Tip[] = [
  tip1,
  tip2,
  // ...tambahkan tips lainnya di sini
];