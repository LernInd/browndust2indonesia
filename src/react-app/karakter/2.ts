import { Karakter } from './index';

export const karakter2: Karakter = {
  id: 2,
  title: "Lathel",
  contents: [
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dsbohucpg/image/upload/v1754309839/lathel.png',
      caption: 'Lathel sang pemanah sihir'
    },
    {
      type: 'text',
      value: 'Seorang pemanah dengan kemampuan sihir.'
    },
    {
      type: 'text',
      value: 'Ini adalah deskripsi lengkap dari karakter Lathel.'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/lathel456',
      caption: 'Video Lathel'
    }
  ],
  author: 'Admin',
  socialLinks: {
    facebook: 'https://facebook.com/lathel',
    twitter: 'https://twitter.com/lathel'
  }
};