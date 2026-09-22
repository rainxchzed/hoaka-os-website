export type Tone = 'live' | 'idle' | 'alarm'

export const uz = {
  meta: {
    home: {
      title: 'Hoaka OS — eskirmaydigan sinfxonalar',
      description:
        'Universitet sinfxonalari uchun boshqariladigan operatsion tizim. Har bir kompyuter toza yuklanadi, faqat ruxsat berilganini ko’rsatadi, imtihonga qulflanadi va o’zini o’zi tiklaydi.',
    },
    pricing: {
      title: 'Narxlar — Hoaka OS',
      description:
        'Bir kompyuter uchun yiliga $15. Chet elda xuddi shu natija birinchi yilda $241.66 turadi. 20 kompyutergacha bepul.',
    },
    pilot: {
      title: 'Bepul sinov — Hoaka OS',
      description:
        'Bitta sinfxona, bir oy, aniq tugash sanasi bilan. Keyin davom ettirish yoki to’xtatish sizning qaroringiz.',
    },
  },

  nav: {
    home: 'Bosh sahifa',
    pricing: 'Narxlar',
    pilot: 'Sinov',
    cta: 'Sinovni boshlash',
    menu: 'Menyu',
    close: 'Yopish',
    language: 'Til',
    skip: 'Asosiy mazmunga o’tish',
  },

  hero: {
    eyebrow: 'Universitet sinfxonalari uchun operatsion tizim',
    title: 'Eskirmaydigan sinfxonalar',
    lede: 'Har bir kompyuter toza yuklanadi, faqat universitet ruxsat berganini ko’rsatadi, imtihonga qulflanadi va talaba chiqqanda o’zini o’zi tiklaydi.',
    primary: 'Bepul sinovni boshlash',
    secondary: 'Bir yil qancha turadi',
    scroll: 'Pastga',
    stats: [
      { value: '3.1', unit: 's', label: 'bosishdan har bir ekrangacha' },
      { value: '4 823 341', unit: '', label: 'resolver biladigan domen' },
      { value: '$15', unit: '', label: 'bir kompyuter, bir yil' },
      { value: '12', unit: 'oy', label: 'hodisalar tarixi' },
    ],
  },

  decay: {
    eyebrow: 'Muammo',
    title: 'Sinfxona ochilgan kunidan boshlab eskira boshlaydi',
    lede: 'Buzilib qolgani uchun emas. Har kuni yuzlab odam undan foydalangani uchun.',
    items: [
      {
        title: 'Har bir talaba nimadir qoldiradi',
        body: 'Ish stoli yorliqlarga to’ladi, brauzerga panel qo’shiladi, qayerdandir dastur o’rnatiladi. Bir semestrdan keyin sinfxonani tanib bo’lmaydi.',
      },
      {
        title: 'IT xodimi har bir kompyuterga yuguradi',
        body: 'Nosozlik bo’lsa — kompyuter yoniga. Yangilanish bo’lsa — yana yoniga. Yigirma kompyuter, yigirma marta, har safar.',
      },
      {
        title: 'Imtihonda nima bo’lganini hech kim bilmaydi',
        body: 'Kim qachon sahifadan chiqqani haqida yozuv yo’q. Faqat nazoratchining xotirasi bor, va u hujjat emas.',
      },
      {
        title: 'Hisobot so’ralganda raqam yo’q',
        body: 'Sinfxona qancha ishlatilgani, nechta kompyuter ishlayotgani, qaysi biri qachon o’chgani — aniq javob yo’q.',
      },
    ],
  },

  clean: {
    eyebrow: 'Tozalik',
    title: 'Har yuklanishda zavoddan chiqqanidek',
    body: 'Tizim diski o’zgarmaydi. Talaba nima o’rnatsa, nima yuklab olsa, nimani buzsa — qayta yuklanishda yo’qoladi. Talaba seansdan chiqqanda uning papkasi o’chiriladi va qaytadan yaratiladi.',
    points: [
      { k: 'Tizim diski', v: 'Har yuklanishda tiklanadi' },
      { k: 'Talaba papkasi', v: 'Chiqishda o’chiriladi' },
      { k: 'Terminal, paket menejeri, sozlamalar', v: 'Yo’q' },
      { k: 'Menyudagi dasturlar', v: 'O’n ikkita, boshqasi yo’q' },
    ],
    demo: {
      caption: 'Bir semestr → qayta yuklash',
      before: 'Semestr oxiri',
      after: 'Qayta yuklangandan keyin',
      reboot: 'Qayta yuklash',
      junk: ['yangi panel', 'noma’lum.exe', 'torrent', 'o’yin', 'reklama', 'panel 2'],
    },
  },

  policy: {
    eyebrow: 'Siyosat',
    title: 'Faqat universitet ruxsat berganini',
    body: 'Siyosat uch pog’onali: muassasa, sinfxona, kompyuter. Quyi pog’ona yuqoridagisini meros qilib oladi va kerak bo’lsa ustidan yozadi. Sinfxona rejimi hamma kompyuterga tarqaladi.',
    tree: { site: 'Muassasa', room: 'Sinfxona 204', device: 'Kompyuter A3' },
    counter: { label: 'Resolver biladigan domen', sub: 'UT1 ro’yxati va mintaqaviy qo’shimcha' },
    modes: [
      {
        name: 'Ochiq',
        body: 'Ilmiy ish uchun hammasi ochiq. Ijtimoiy tarmoq, video, o’yin va shunga o’xshashlar toifa bo’yicha yopiq.',
      },
      {
        name: 'Ma’ruza',
        body: 'Sinfxona ustida ko’k chiziq. O’qituvchi bitta sahifani hamma ekranga yuboradi.',
      },
      {
        name: 'Imtihon',
        body: 'Qizil chiziq va bitta qulflangan sahifa. Ro’yxatga hech kim, hech qaysi pog’onadan sayt qo’sha olmaydi.',
      },
    ],
    note: 'Butun domen bloklari DNS darajasida. Sahifa darajasidagi istisnolar brauzerda qoladi, chunki DNS manzil ichini ko’rmaydi.',
  },

  exam: {
    eyebrow: 'Imtihon',
    title: 'Bitta qulflangan sahifa va joylar xaritasi',
    body: 'Imtihon boshlanganda sinfxona qulflanadi va har bir joy o’z kvadratini oladi. Kvadrat yashil — joy imtihonda. Kulrang — aloqa yo’q. Qizil — joy imtihondan chiqqan yoki uzilgan, va u qizil bo’lib qoladi.',
    legend: { live: 'Imtihonda', idle: 'Aloqa yo’q', alarm: 'Uzilgan' },
    seatLabel: 'Joy',
    logTitle: 'Imtihon jurnali',
    logRows: [
      { seat: 'A1', text: 'Oxirigacha qoldi', tone: 'live' },
      { seat: 'C6', text: 'Aloqa yo’q 21:04:12 dan beri', tone: 'idle' },
      { seat: 'B3', text: 'Javob bermadi 21:16:07 – 21:18:37, 2 daq 29 s', tone: 'alarm' },
    ] as { seat: string; text: string; tone: Tone }[],
    summary: '22 ta joy oxirigacha qoldi, 1 tasi uzildi, 1 tasida aloqa yo’q, jami 24 ta joy',
    honest: {
      title: 'Bu devor emas — bu yozuv',
      body: 'Himoya uch narsadan iborat: to’siq, izsizlik va ko’rinuvchanlik. Biz uni “chetlab o’tib bo’lmaydi” deb atamaymiz va hech qachon atamaganmiz. Imtihon jurnali — nazoratchi qo’lida hujjat, nazoratchi o’rniga qo’yilgan dastur emas.',
    },
  },

  teacher: {
    eyebrow: 'O’qituvchi',
    title: 'Sinfni brauzerdan boshqaradi',
    body: 'Rejimni almashtirish, hamma ekranga bitta sahifa yuborish, hamma ekranga xabar berish — hammasi brauzerda. Alohida o’qituvchi kompyuteri kerak emas, administratorlar soni uchun qo’shimcha to’lov yo’q.',
    actions: [
      { k: 'Rejimni almashtirish', v: 'Ochiq ↔ Ma’ruza' },
      { k: 'Sahifa yuborish', v: 'Bitta manzil, hamma ekran' },
      { k: 'Xabar yuborish', v: 'Hamma ekranda ko’rinadi' },
      { k: 'Seansni yakunlash', v: 'Kompyuter tozalanadi' },
    ],
    screens: 'ekran',
    sent: 'Yuborildi',
  },

  reports: {
    eyebrow: 'Hisobotlar',
    title: 'Rektor vazirlikka bera oladigan hisobot',
    body: 'Uchta hisobot: sinfxonadan foydalanish, imtihon hisoboti va inventar. Muassasa nomi va sana oralig’i bilan, brauzerdan to’g’ridan-to’g’ri chop etiladi. Uch tilda.',
    items: [
      { name: 'Sinfxonadan foydalanish', v: 'Qaysi sinfxona, qancha soat, qaysi kunlar' },
      { name: 'Imtihon hisoboti', v: 'Har bir joy, har bir uzilish, davomiyligi bilan' },
      { name: 'Inventar', v: 'Nechta kompyuter, qaysi sinfxonada, qaysi versiya' },
    ],
    print: 'Chop etishga tayyor',
  },

  how: {
    eyebrow: 'Qanday ishlaydi',
    title: 'Uch qadam',
    steps: [
      {
        n: '01',
        title: 'Obrazni yozing',
        body: 'Obraz bizdan. Kompyuterga yoziladi va BIOS paroli bilan yuklanish tartibi qulflanadi. Parol sizda qoladi.',
      },
      {
        n: '02',
        title: 'Kompyuter o’zini ro’yxatga oladi',
        body: 'Birinchi yuklanishda kompyuter serverni topadi va o’zini ro’yxatga oladi. 30 soniya ichida panelda ko’rinadi. Qo’lda sozlash yo’q.',
      },
      {
        n: '03',
        title: 'Paneldan boshqaring',
        body: 'Server muassasa ichida ishlaydi. Siyosat, rejimlar, imtihonlar, hisobotlar — brauzerdan. Ma’lumot binodan chiqmaydi.',
      },
    ],
  },

  cost: {
    eyebrow: 'Xarajat',
    title: 'Bitta kompyuter bir yilda qancha turadi',
    lede: 'Chap tomonda to’rtta alohida mahsulot, uchta turli o’lchov birligi. O’ng tomonda bitta narx.',
    them: {
      label: 'Chet elda',
      big: '$241.66',
      bigSub: 'birinchi yil, har kompyuter uchun',
      extras: [
        { amount: '$41.67', label: 'keyingi har yil' },
        { amount: '+ $26.40', label: 'har foydalanuvchi uchun yiliga, Windows A3' },
        { amount: '+ $3 295', label: 'butun muassasa uchun yiliga, imtihon dasturi' },
      ],
    },
    us: {
      label: 'Hoaka',
      big: '$15',
      bigSub: 'har kompyuter uchun yiliga',
      note: 'Har yili bir xil. Yuqoridagilarning hammasi kiradi. Qo’shimcha to’lov yo’q.',
    },
    breakdownTitle: '$241.66 nimalardan tashkil topgan',
    rows: [
      { job: 'Operatsion tizim', prod: 'Windows 11 Pro', amt: '$199.99', per: 'bir marta, har kompyuter uchun' },
      { job: 'Kompyuter toza qaytadi', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'har kompyuter uchun yiliga' },
      { job: 'O’qituvchi sinfni boshqaradi', prod: 'LanSchool', amt: '$7.00', per: 'har kompyuter uchun yiliga' },
      { job: 'Ro’yxatlar, yangilanishlar, imtihon kuni yordam', prod: 'Alohida moddasi yo’q', amt: '—', per: 'hech kim sotmaydi' },
    ],
    cta: 'To’liq taqqoslash',
  },

  wallpapers: {
    eyebrow: 'Obraz bilan birga',
    title: 'Sinfxona ham bir joy',
    body: 'Boshqariladigan kompyuter xunuk bo’lishi shart emas. Obrazda shu to’rtta fon keladi.',
    alt: [
      'Qora fonda piksellardan yasalgan oq gul',
      'Qorong’ilikda yorishib turgan siyohrang gul',
      'Orbitadan ko’ringan Yer va uning yonidagi oy',
      'Yulduzlar fonida yorug’lik halqasi',
    ],
  },

  requirements: {
    eyebrow: 'Talablar',
    title: 'Nima kerak',
    provide: {
      title: 'Muassasa ta’minlaydi',
      items: [
        { k: 'Kompyuterlar', v: 'Muassasa mulki bo’lgan sinfxona kompyuterlari' },
        { k: 'Tarmoq', v: 'Simli tarmoq, DHCP va internetga chiqish' },
        { k: 'Server uchun kompyuter', v: 'Boshqaruv serveri muassasa ichida ishlaydi' },
        { k: 'BIOS parollari', v: 'Birga o’rnatamiz, parol sizda qoladi' },
        { k: 'Mas’ul xodim', v: 'Bir kishi, biz bog’lana oladigan' },
      ],
    },
    stack: {
      title: 'Obraz nimadan iborat',
      items: [
        { k: 'Asos', v: 'Debian 13' },
        { k: 'Ish stoli', v: 'LXQt' },
        { k: 'Brauzer', v: 'Chromium, siyosat bilan boshqariladigan' },
        { k: 'Klaviatura', v: 'uz (lotin), ru, en — Alt+Shift' },
        { k: 'Tarmoq', v: 'Faqat simli' },
      ],
    },
  },

  scope: {
    eyebrow: 'Chegaralar',
    title: 'Hoaka nima qilmaydi',
    body: 'Buni oldindan aytganimiz ma’qul. Quyidagilar rejada ham yo’q.',
    items: [
      'Shaxsiy telefon, planshet va noutbuklarga tegmaydi',
      'Kamera orqali nazorat qilmaydi',
      'Ekran suratlarini saqlamaydi',
      'Bosilgan tugmalarni yozmaydi',
      'Ma’lumotni bulutga yubormaydi — server binoda',
      'Imtihon savollarini bermaydi — imtihon sahifasi sizniki',
    ],
  },

  cta: {
    eyebrow: 'Taklif',
    title: 'Uchta universitet. Bittadan sinfxona. Shu semestr. Bepul.',
    body: 'Bir oy, aniq tugash sanasi bilan. Keyin davom ettirish yoki to’xtatish — sizning qaroringiz.',
    primary: 'Sinovni boshlash',
    secondary: 'Narxlarni ko’rish',
  },

  pricing: {
    eyebrow: 'Narxlar',
    title: 'Bitta narx, bitta o’lchov birligi',
    lede: 'Bir kompyuter uchun yiliga $15. Narx sinfxona bo’yicha beriladi, AQSh dollarida.',
    tiersTitle: 'Sinfxona o’lchamiga qarab',
    tiers: [
      { count: '20 kompyutergacha', price: 'Bepul', note: 'To’lovsiz' },
      { count: '25 kompyuter', price: '$375', note: 'yiliga' },
      { count: '50 kompyuter', price: '$750', note: 'yiliga' },
      { count: '100 kompyuter', price: '$1 500', note: 'yiliga' },
    ],
    includedTitle: 'Narxga nima kiradi',
    included: [
      {
        k: 'Har safar tozalash',
        v: 'Talaba seansdan chiqqanda uning papkasi o’chiriladi va qaytadan yaratiladi. Tizim diski har yuklanishda tiklanadi. Talaba o’rnatgan hech narsa qolmaydi.',
      },
      {
        k: 'Qayta o’rnatish',
        v: 'Kompyuter har yuklanishda o’zini tiklagani uchun qayta o’rnatish deyarli kerak bo’lmaydi. Kerak bo’lsa, obrazni biz beramiz va kompyuter o’zini o’zi sozlaydi. Bugun bu kompyuter yonida bajariladi; tarmoq orqali qilish rejada.',
      },
      {
        k: 'Yangilanishlar',
        v: 'Yangi versiyalarni biz tayyorlaymiz va sinovdan o’tkazamiz. Hozircha yangilanish yangi obrazni yozishdir; joyida yangilash rejada.',
      },
      {
        k: 'Ro’yxatlarni yuritish',
        v: 'Mintaqaviy bloklash ro’yxati va akademik ruxsat ro’yxati biz tomonidan yangilanadi. Bu sizning IT xodimingizning ishi emas.',
      },
      {
        k: 'Imtihon kuni',
        v: 'Har bir imtihonda joylar xaritasi va har bir joy nima qilgani yozilgan jurnal bo’ladi.',
      },
      {
        k: 'Boshqaruv paneli',
        v: 'Siyosat, sinfxonalar, kompyuterlar, hisobotlar va audit jurnali — brauzerda. Administratorlar soni uchun qo’shimcha to’lov yo’q.',
      },
    ],
    excludedTitle: 'Narxga kirmaydi',
    excluded: ['Jihozlar', 'Internet', 'Imtihon tizimi', 'Elektr va qurilish ishlari'],
    openTitle: 'Imzolashdan oldin kelishib olinadi',
    openBody: 'Quyidagilar ataylab bo’sh qoldirilgan. Ularni birga to’ldiramiz.',
    open: [
      'Imtihon vaqtida va oddiy kunlarda javob berish muddati',
      'Shartnoma muddati va uni bekor qilish tartibi',
      'Kompyuterga eng past talab: xotira, protsessor, tarmoq',
      'Sinov tugagandan keyin nima bo’ladi',
      '20 tadan ortiq bo’lsa, to’lov hamma kompyuter uchunmi yoki faqat ortig’i uchunmi',
    ],
    sourcesTitle: 'Taqqoslash raqamlari qayerdan',
    sources:
      'Narxlar 15.09.2026 da ishlab chiqaruvchilarning o’z sahifalaridan olingan va Shimoliy Amerika uchun e’lon qilingan, ya’ni bu ko’rsatkich, taklif emas. Bir kompyuter uchun summani biz qo’shdik: Windows bir marta, qolgani har yili.',
    footnotes: [
      'Windows A3 mustaqil litsenziya emas. U faqat allaqachon litsenziyalangan kompyuterga o’rnatiladi, ya’ni operatsion tizim uchun ikki marta to’lanadi.',
      'Imtihon dasturi kompyuter bo’yicha sotilmaydi. Narx talabalar soniga bog’liq, shuning uchun sinfxona kichik bo’lsa ham to’liq to’lanadi.',
      'NetSupport School va Deep Freeze Enterprise narxini umuman e’lon qilmaydi. Bilish uchun so’rov yuborish kerak.',
    ],
  },

  pilot: {
    eyebrow: 'Bepul sinov',
    title: 'Bitta sinfxona, bir oy',
    lede: 'Aniq tugash sanasi bilan. Keyin davom ettirish yoki to’xtatish — sizning qaroringiz. 20 kompyutergacha to’lov yo’q.',
    stepsTitle: 'Qanday kechadi',
    steps: [
      { n: '01', k: 'Suhbat', v: 'Yarim soat. Sinfxonangizni va kompyuterlaringizni ko’ramiz.' },
      { n: '02', k: 'O’rnatish', v: 'Bir kun. Obraz yoziladi, server qo’yiladi, BIOS parollari birga o’rnatiladi.' },
      { n: '03', k: 'Bir oy ish', v: 'Sinfxona odatdagidek ishlaydi. Biz yonidamiz.' },
      { n: '04', k: 'Hisobot va qaror', v: 'Uchta hisobotni olasiz. Davom ettirish yoki to’xtatish sizning qaroringiz.' },
    ],
    formTitle: 'Bog’lanish',
    formBody: 'Quyidagi ma’lumotlarni yuboring, biz ikki ish kuni ichida javob beramiz.',
    fields: {
      name: 'Ism va familiya',
      role: 'Lavozim',
      org: 'Muassasa',
      email: 'Elektron pochta',
      phone: 'Telefon',
      machines: 'Sinfxonadagi kompyuterlar soni',
      message: 'Qo’shimcha',
      messagePlaceholder: 'Sinfxona haqida bilishimiz kerak bo’lgan narsa bormi?',
    },
    submit: 'Yuborish',
    orEmail: 'Yoki to’g’ridan-to’g’ri yozing',
    required: 'majburiy',
    sent: {
      title: 'Yuborildi',
      body: 'Xabaringiz pochta dasturingizda ochiladi. Yubormasangiz, quyidagi manzilga to’g’ridan-to’g’ri yozishingiz mumkin.',
    },
  },

  footer: {
    tagline: 'Universitet sinfxonalari uchun boshqariladigan operatsion tizim.',
    madeIn: 'O’zbekistonda ishlab chiqilmoqda',
    rights: 'Barcha huquqlar himoyalangan.',
    nav: 'Sahifalar',
    contact: 'Bog’lanish',
    language: 'Til',
    status: 'Sinov bosqichi — birinchi sinfxona 2026-yil oktyabr',
  },
}

export type Dict = typeof uz
