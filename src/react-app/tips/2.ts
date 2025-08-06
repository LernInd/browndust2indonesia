import { Tip } from './index';

export const tip2: Tip = {
  id: 2,
  title: "Tips Lanjutan",
  contents: [
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dsbohucpg/image/upload/v1754309839/chain_example.png',
      caption: 'Contoh Chain'
    },
    {
      type: 'text',
      value: 'Gunakan karakter dengan efek chain untuk memaksimalkan damage. Jangan lupa upgrade equipment dan gunakan buff dari map.'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/abcdefg',
      caption: 'Video Chain'
    },
    {
      type: 'text',
      value: "Selalu manfaatkan pull gratis harian jika ada. Menabung untuk banner 'pity system' adalah strategi jangka panjang yang paling aman untuk mendapatkan karakter incaran."
    }
  ],
  author: "ExpertPlayer",
  socialLinks: {
    facebook: "https://facebook.com/expert",
    twitter: "https://twitter.com/expert"
  }
};
