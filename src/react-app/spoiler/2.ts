import { Spoiler } from './index';

export const spoiler2: Spoiler = {
  id: 2,
  title: "Spoiler Map Rahasia",
  contents: [
    {
      type: 'image',
      url: 'https://res.cloudinary.com/dsbohucpg/image/upload/v1754309839/secret_map.png',
      caption: 'Map Rahasia'
    },
    {
      type: 'text',
      value: 'Map rahasia bisa diakses dengan memasukkan kode pada menu utama. Jangan bagikan kode ini ke sembarang orang!'
    },
    {
      type: 'video',
      url: 'https://www.youtube.com/embed/mapmapmap',
      caption: 'Video Map Rahasia'
    },
        {
      type: 'text',
      value: 'Map rahasia bisa diakses dengan memasukkan kode pada menu utama. Jangan bagikan kode ini ke sembarang orang!'
    }
  ],
  author: "MapMaster",
  socialLinks: {
    facebook: "https://facebook.com/mapmaster",
    twitter: "https://twitter.com/mapmaster"
  }
};