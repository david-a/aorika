import { Indexable } from 'src/app/interfaces/Indexable';

export const PRODUCTS: Indexable = {
  maamool: {
    name: 'מַעמוּל',
    price: 450,
    duration: 4 * 60,
    dimensions: 'רוחב: 70 ס״מ | עומק: 20 ס״מ | גובה: 38 ס״מ',
    description: 'מדף כוורת עם מתלים',
    coverImage: 'maamool.cutout.png',
    media: ['maamool.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  sahbak: {
    name: 'סַחְבָּק',
    price: 450,
    duration: 3.5 * 60,
    dimensions: 'רוחב: 40 ס״מ | עומק: 20 ס״מ | גובה: 60 ס״מ',
    description: 'שידת לילה עם מגירה',
    coverImage: 'sahbak.cutout.png',
    media: ['sahbak.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  barista: {
    name: 'בָּרִיסְטָה',
    price: 450,
    duration: 4 * 60,
    dimensions: 'רוחב: 60 ס״מ | עומק: 14 ס״מ | גובה: 32 ס״מ',
    description: 'מדף לקפה (אבל לא רק:)',
    coverImage: 'barista.cutout1.png',
    media: [
      'barista.jpg',
      'barista_00001.jpg',
      // 'barista_00002.jpg',
      // 'barista_00003.jpg',
      // 'barista_00004.jpg',
    ],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  shwaye: {
    name: 'שׁוואיֶה',
    price: 850,
    duration: 5.5 * 60,
    dimensions: 'רוחב: 126 ס״מ | עומק: 72 ס״מ | גובה: 78 ס״מ',
    description: 'ספסל עם מדף',
    coverImage: 'shwaye_00004.JPG',
    media: [
      // 'shwaye.jpg',
      // 'shwaye_00001.JPG',
      'shwaye_00002.JPG',
      'shwaye_00003.JPG',
      'shwaye_00004.JPG',
      'shwaye_00005.JPG',
    ],
    tags: {
      catalog: false,
      homepage: false,
    },
  },

  kabuk: {
    name: 'קַבּוּק',
    price: 750,
    duration: 6 * 60,
    dimensions: 'רוחב: 87 ס״מ | עומק: 40 ס״מ | גובה: 90 ס״מ',
    description: 'מעמד כפול לספרים',
    coverImage: 'kabuk.jpg',
    media: ['kabuk.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  fanan: {
    name: 'פַנָאן',
    price: 750,
    duration: 4.5 * 60,
    dimensions: 'רוחב: 126 ס״מ | עומק: 72 ס״מ | גובה: 78 ס״מ',
    description: 'ספסל עם מדף',
    coverImage: 'fanan.jpg',
    media: ['fanan.jpg', 'fanan2.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  kabaryolet: {
    name: 'קָבַּרְיוֹלֶט',
    price: 550,
    duration: 5 * 60,
    dimensions: 'רוחב: 60 ס״מ | עומק: 40 ס״מ | גובה: 40 ס״מ',
    description: 'ארגז על גלגלים עם מכסה מרופד',
    coverImage: 'kabaryolet.jpg',
    media: ['kabaryolet.jpg', 'kabaryolet_00001.jpg', 'kabaryolet_00002.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  layback: {
    name: 'לֵייבָּאק',
    price: 750,
    duration: 5 * 60,
    dimensions: 'רוחב: 126 ס״מ | עומק: 72 ס״מ | גובה: 78 ס״מ',
    description: 'ספסל גינה עם משענת',
    coverImage: 'layback.cutout.png',
    media: ['layback.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  shaiba: {
    name: 'שַׁיְיבָּה',
    price: 180,
    duration: 2 * 60,
    description: 'שרפרפון',
    coverImage: 'shaiba.cutout.png',
    media: ['shaiba.jpg'],
    tags: {
      catalog: true,
    },
  },

  sidekick: {
    name: 'סַיידקִיק',
    price: 450,
    duration: 4 * 60,
    dimensions: 'רוחב: 27 ס״מ | עומק: 40 ס״מ | גובה: 57 ס״מ',
    description: 'שולחן קפה מתהפך',
    coverImage: 'sidekick.cutout.png',
    media: ['sidekick.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  single: {
    name: 'סִינְגֶל',
    price: 250,
    duration: 3 * 60,
    dimensions: 'רוחב: 60 ס״מ | עומק: 14 ס״מ | גובה: 18 ס״מ',
    description: 'מדף בודד עם מתלים',
    coverImage: 'single.cutout.png',
    media: ['single.jpg'],
    tags: {
      catalog: true,
    },
  },

  shufuni: {
    name: 'שׁוּפוּנִי',
    price: 750,
    duration: 6 * 60,
    dimensions: 'רוחב: 100 ס״מ | עומק: 20 ס״מ | גובה: 89 ס״מ',
    description: 'קונסולת מגירות גבוהה.',
    coverImage: 'sufuni.cutout.png',
    media: ['shufuni.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  spicy: {
    name: 'סְפָּיְיסִי',
    price: 450,
    duration: 4 * 60,
    dimensions: 'רוחב: 56 ס״מ | עומק: 10 ס״מ | גובה: 33 ס״מ',
    description: 'מדף תבלינים',
    coverImage: 'spicy.jpg',
    media: ['spicy.jpg'],
    tags: {
      catalog: true,
    },
  },

  tutim: {
    name: 'תּוּתִים',
    price: 350,
    duration: 3 * 60,
    dimensions: 'רוחב: 60 ס״מ | עומק: 20 ס״מ | גובה: 25 ס״מ',
    description: 'אדנית 60X20',
    coverImage: 'tutim.cutout.png',
    media: ['tutim.jpg'],
    tags: {
      catalog: true,
    },
  },

  trifonas: {
    name: 'טְרִיפוֹנָאס',
    price: 350,
    duration: 4 * 60,
    description: 'שלישיית מדפים מדורגת',
    coverImage: 'trifonas.cutout.png',
    media: ['trifonas.jpg'],
    tags: {
      catalog: true,
    },
  },

  umami: {
    name: 'אוּמָאמִי',
    price: 450,
    duration: 4 * 60,
    dimensions: 'רוחב: 61 ס״מ | עומק: 14 ס״מ | גובה: 40 ס״מ',
    description: 'יחידת מדפים עם מתלים',
    coverImage: 'umami.jpg',
    media: ['umami.jpg'],
    tags: {
      catalog: true,
      homepage: true,
    },
  },

  alef: {
    name: 'אָלֶף',
    // price: 45,
    // groupPrice: 35,
    dimensions: 'רוחב: 30 ס״מ | עומק: 2 ס״מ | גובה: 14 ס״מ',
    description: 'מתלה צבעוני',
    coverImage: 'alef.cutout.png',
    media: [
      'alef_00001.JPG',
      'alef_00002.JPG',
      'alef_00003.JPG',
      'alef_00004.JPG',
      'alef_00005.JPG',
      'alef_00006.JPG',
      'alef_00007.JPG',
      'alef_00008.JPG',
    ],
    tags: {
      catalog: false,
      homepage: false,
      groups: true,
    },
  },

  beit: {
    name: 'בֵּית',
    // price: 65,
    // groupPrice: 55,
    dimensions: 'רוחב: 30 ס״מ | עומק: 4 ס״מ | גובה: 30 ס״מ',
    description: 'מסגרת בעיצוב אישי ורשת תליה.',
    coverImage: 'beit.cutout2.png',
    media: [
      'beit_00001.JPG',
      'beit_00002.JPG',
      'beit_00003.JPG',
      'beit_00004.JPG',
      'beit_00005.jpg',
    ],
    tags: {
      catalog: false,
      homepage: false,
      groups: true,
    },
  },

  gimel: {
    name: 'גִּימֶל',
    // price: 65,
    // groupPrice: 55,
    dimensions: 'רוחב: 20 ס״מ | אורך: 20 ס״מ | גובה: 4 ס״מ',
    description: 'משחק איקס עיגול.',
    coverImage: 'gimel_00002.JPG',
    media: [
      'gimel_00001.JPG',
      'gimel_00002.JPG',
      'gimel_00003.JPG',
      'gimel_00004.JPG',
      'gimel_00005.jpg',
      'gimel_00006.JPG',
      'gimel_00007.jpg',
    ],
    tags: {
      catalog: false,
      homepage: false,
      groups: true,
    },
  },

  dalet: {
    name: 'דָּלֶת',
    // price: 45,
    // groupPrice: 35,
    dimensions: 'רוחב: 30 ס״מ | עומק: 4 ס״מ | גובה: 14 ס״מ',
    description: 'מדפון עם מתלים.',
    coverImage: 'dalet.cutout2.png',
    media: ['dalet_00001.JPG'],
    tags: {
      catalog: false,
      homepage: false,
      groups: true,
    },
  },

  hey: {
    name: 'הֵא',
    // price: 75,
    // groupPrice: 65,
    dimensions: 'רוחב: 30 ס״מ | עומק: 14 ס״מ | גובה: 12 ס״מ',
    description: 'מיני אדנית (כולל אדמה ופרחים).',
    coverImage: 'hey_00001.jpg',
    // coverImage: 'hey.cutout2',
    media: ['hey.jpg'],
    tags: {
      catalog: false,
      homepage: false,
      groups: true,
    },
  },
};
