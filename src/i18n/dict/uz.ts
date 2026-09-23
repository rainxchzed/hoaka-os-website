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
    title: 'Eskirmaydigan sinfxonalar',
    lede: 'Har bir kompyuter toza yuklanadi, faqat universitet ruxsat berganini ko‘rsatadi, imtihonga qulflanadi va talaba chiqqanda o‘zini o‘zi tiklaydi.',
    primary: 'Bepul sinovni boshlash',
    secondary: 'Bir yil qancha turadi',
  },

  day: {
    heading: 'Sinfxonada bir kun, 07:58 dan 17:30 gacha',
    steps: [
      {
        id: 'boot',
        time: '07:58',
        title: 'Har bir kompyuter bir xil toza tizimdan boshlanadi',
        body: 'Tizim diski har yuklanishda tiklanadi. Kecha o‘rnatilgan yoki o‘zgartirilgan narsa birinchi darsdan oldin yo‘qoladi. Parol oynasi yo‘q, kutish kerak emas.',
      },
      {
        id: 'open',
        time: '09:00',
        title: 'Ilmiy ish ishlaydi. Chalg‘itadigan narsalar ishlamaydi.',
        body: 'Scholar, arXiv, Moodle va ular havola beradigan nashriyotlar odatdagidek ochiladi. Ijtimoiy tarmoqlar, video, o‘yinlar va boshqalar toifa bo‘yicha yopiq: 4 823 341 ta domen. Ro‘yxatlarni yangilab turish sizning IT xodimingizning emas, bizning ishimiz.',
      },
      {
        id: 'lecture',
        time: '11:00',
        title: 'Hamma ekranda bitta sahifa',
        body: 'O‘qituvchi sinfxonani brauzerdan Ma’ruza rejimiga o‘tkazadi. Har bir ekranda ko‘k chiziq paydo bo‘ladi va u yuborgan sahifa hammasida bir vaqtda ochiladi. Alohida kompyuter ham, qo‘shimcha dastur ham kerak emas.',
      },
      {
        id: 'exam',
        time: '14:00',
        title: 'Bitta qulflangan sahifa va har bir joyning yozuvi',
        body: 'Sinfxona imtihon sahifasiga qulflanadi. Imtihondan chiqqan yoki tarmoqdan uzilgan joy joylar xaritasida qizil bo‘ladi va qizil bo‘lib qoladi, jurnal esa qachon va qancha vaqtga uzilganini yozib boradi.',
      },
      {
        id: 'logout',
        time: '17:30',
        title: 'Kompyuter kunni unutadi',
        body: 'Oxirgi talaba chiqqanda uning papkasi o‘chiriladi va qaytadan yaratiladi. Ertaga soat 07:58 da sinfxona bugun ertalabgidek yuklanadi.',
      },
    ],
    honest: 'Bu devor emas, yozuv: to‘siq, izsizlik va ko‘rinuvchanlik. Biz uni “chetlab o‘tib bo‘lmaydi” demaymiz.',
    labels: {
      interrupted: 'Uzildi · 2 daq 29 s',
      noContact: 'Aloqa yo‘q',
      blocked: 'Yopiq sayt',
    },
  },

  reports: {
    title: 'Oyda bir marta — rektor vazirlikka bera oladigan hisobot',
    body: 'Muassasa nomi va sana oralig‘i bilan, uch tilning istalganida, to‘g‘ridan-to‘g‘ri brauzerdan chop etiladi.',
    items: [
      { name: 'Sinfxonadan foydalanish', v: 'Qaysi sinfxona, qancha soat, qaysi kunlar' },
      { name: 'Imtihon hisoboti', v: 'Har bir joy, har bir uzilish, davomiyligi bilan' },
      { name: 'Inventar', v: 'Nechta kompyuter, qaysi sinfxonada, qaysi versiya' },
    ],
  },

  ledger: {
    title: 'Bitta kompyuter bir yilda qancha turadi',
    sentence: 'Chet elda bu ishni to‘rtta alohida mahsulot bajaradi: birinchi yili har bir kompyuter uchun {abroad}, keyin har yili {after}, ustiga imtihon dasturi uchun yiliga {exam}. Hoaka hammasini har bir kompyuter uchun {ours} ga bajaradi, har yili bir xil.',
    figures: { abroad: '$241.66', after: '$41.67', exam: '$3 295', ours: '$15' },
    compare: { abroad: 'Chet elda, birinchi yil', ours: 'Hoaka, har yili' },
    rows: [
      { job: 'Operatsion tizim', prod: 'Windows 11 Pro', amt: '$199.99', per: 'bir marta' },
      { job: 'Kompyuter toza qaytadi', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'yiliga' },
      { job: 'O‘qituvchi sinfni boshqaradi', prod: 'LanSchool', amt: '$7.00', per: 'yiliga' },
      { job: 'Ro‘yxatlar, yangilanishlar, imtihon kuni yordam', prod: 'Hech kim sotmaydi', amt: '—', per: '' },
    ],
    source: 'Narxlar 15.09.2026 da ishlab chiqaruvchilarning o‘z sahifalaridan olingan, Shimoliy Amerika uchun. Ko‘rsatkich, taklif emas.',
    cta: 'To‘liq taqqoslash',
  },

  limits: {
    title: 'Hoaka nima qilmaydi',
    items: [
      'Shaxsiy telefon, planshet va noutbuklarga tegmaydi',
      'Kamera orqali kuzatmaydi',
      'Ekran suratlarini saqlamaydi',
      'Bosilgan tugmalarni yozmaydi',
      'Ma’lumotni bulutga yubormaydi — server binoda',
      'Imtihon savollarini bermaydi — imtihon sahifasi sizniki',
    ],
  },

  cta: {
    title: 'Bitta sinfxona, bir oy',
    body: 'Aniq tugash sanasi bilan. Keyin davom ettirish yoki to’xtatish — sizning qaroringiz.',
    primary: 'Sinovni boshlash',
    secondary: 'Narxlarni ko‘rish',
  },

  pricing: {
    eyebrow: 'Narxlar',
    title: 'Bitta narx, bitta o’lchov birligi',
    lede: 'Bir kompyuter uchun yiliga $15. Narx sinfxona bo’yicha beriladi, AQSh dollarida.',
    tiersTitle: 'Sinfxona o’lchamiga qarab',
    calc: {
      label: 'Sinfxonangizdagi kompyuterlar',
      ours: 'Hoaka',
      abroadFirst: 'Chet elda, birinchi yil',
      abroadAfter: 'Chet elda, keyingi har yili',
      note: 'Chet el narxiga imtihon dasturi ham kiradi. Ko‘rsatkich, taklif emas.',
    },
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

  notFound: 'Sahifa topilmadi',
  footer: {
    tagline: 'Universitet sinfxonalari uchun boshqariladigan operatsion tizim.',
    rights: 'Barcha huquqlar himoyalangan.',
    nav: 'Sahifalar',
    contact: 'Bog’lanish',
    language: 'Til',
    status: 'Sinov bosqichi — birinchi sinfxona 2026-yil oktyabr',
  },
}

export type Dict = typeof uz
