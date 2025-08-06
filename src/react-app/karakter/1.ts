import { Karakter } from './index';

export const karakter1: Karakter = {
  id: 1,
  title: "Justia",
  contents: [
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dsbohucpg/image/upload/v1754309839/justia.png',
      caption: 'Justia sang ksatria wanita'
    },
    {
      type: 'text',
      value: 'Seorang ksatria wanita dengan pedang besar.'
    },
    {
      type: 'text',
      value: 'Ini adalah deskripsi lengkap dari karakter Justia.'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/justia123',
      caption: 'Video Justia'
    }
  ],
  author: 'Admin',
  socialLinks: {
    facebook: 'https://facebook.com/justia',
    twitter: 'https://twitter.com/justia'
  }
};