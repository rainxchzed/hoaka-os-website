import { installUz } from './install/uz'

export const uz = {
  meta: {
    install: {
      title: 'Oʻrnatish — Hoaka OS',
      description:
        'Hoaka OSni bosqichma-bosqich oʻrnatish: Windows yoki Linuxdagi server, bepul litsenziya, oʻrnatish fleshkasi va har bir oʻquv kompyuteri.',
    },
    home: {
      title: 'Hoaka OS — universitetlar uchun operatsion tizim',
      description:
        'Universitetlarning kompyuter sinflari uchun yaratilgan operatsion tizim. Hoaka universitetga, oʻqituvchiga va talabaga nima kerak boʻlsa, shuni beradi, talabalarga esa oʻqishdan chalgʻimaslikka yordam beradi.',
    },
    pricing: {
      title: 'Narxlar — Hoaka OS',
      description:
        'Bir kompyuter uchun yiliga $15. Chet elda xuddi shu ishni qiladigan dasturlar birinchi yili bir kompyuterga $241.66 turadi.',
    },
    pilot: {
      title: 'Bepul sinov — Hoaka OS',
      description:
        'Birinchi uch oy bepul. Universitetingizga kelib, Hoakani bitta kompyuter sinfiga oʻzimiz oʻrnatamiz, uch oy davomida yoningizda boʻlamiz va nima buzilsa, tuzatamiz. Uch oy oxirida davom ettirish-ettirmaslikni oʻzingiz hal qilasiz.',
    },
  },

  nav: {
    install: 'Oʻrnatish',
    home: 'Bosh sahifa',
    pricing: 'Narxlar',
    pilot: 'Sinov',
    cta: 'Sinovni boshlash',
    menu: 'Menyu',
    close: 'Yopish',
    language: 'Til',
    skip: 'Asosiy qismga oʻtish',
  },

  hero: {
    title: 'Universitetlar uchun operatsion tizim',
    lede: 'Kompyuter sinfida universitetga, oʻqituvchiga va talabaga nima kerak boʻlsa, Hoaka aynan shuni beradi. Talabaga esa chalgʻimasdan izlanish, maʼruza va imtihonga diqqatini qaratishga yordam beradi.',
    primary: 'Sinovni boshlash',
    secondary: 'Bepul uch oy qanday oʻtadi',
  },

  day: {
    heading: 'Kompyuter sinfida bir kun: soat 07:58 dan 17:30 gacha',
    steps: [
      {
        id: 'boot',
        time: '07:58',
        title: 'Hamma kompyuter bir xil, toza holatda ishga tushadi',
      },
      {
        id: 'open',
        time: '09:00',
        title: 'Oʻqishga keragi ochiq, chalgʻitadigani yopiq',
      },
      {
        id: 'lecture',
        time: '11:00',
        title: 'Hamma ekranda bitta sahifa',
      },
      {
        id: 'exam',
        time: '14:00',
        title: 'Imtihon bitta sahifada, har bir oʻrin hisobda',
      },
      {
        id: 'logout',
        time: '17:30',
        title: 'Kompyuter kunni unutadi',
      },
    ],
    labels: {
      interrupted: 'Uzilish · 2 daq 29 s',
      noContact: 'Aloqa yoʻq',
      blocked: 'Sayt yopiq',
    },
  },

  screens: {
    title: 'Qanday koʻrinadi',
    lede: 'Universitet boshqaradigan konsol va talabalar oʻtiradigan oʻquv kompyuteri. Namunaviy universitetning haqiqiy ekranlari.',
    tabs: [
      { id: 'rooms', label: 'Xonalar', caption: 'Har bir xona uchun bitta tanlov: Ochiq, Maʼruza yoki Imtihon.' },
      { id: 'exam', label: 'Imtihonlar', caption: 'Ketayotgan imtihonning har bir oʻrni va eʼtibor talab qiladigani.' },
      { id: 'devices', label: 'Kompyuterlar', caption: 'Har bir oʻquv kompyuteri: xonasi, holati va versiyasi.' },
      { id: 'websites', label: 'Saytlar', caption: 'Kompyuter sinflarida qaysi saytlar ochilgani va qaysilari bloklangani.' },
      { id: 'store', label: 'Dasturlar doʻkoni', caption: 'Windows dasturlari bajaradigan ish uchun bepul dasturlar, oʻrnatishga tayyor.' },
    ],
  },

  reports: {
    title: 'Har oy rektor uchun tayyor hisobot',
    body: 'Hisobotlarda universitet nomi va sanalar koʻrsatiladi. Ularni oʻzbek, rus yoki ingliz tilida toʻgʻridan-toʻgʻri brauzerdan chop etish mumkin.',
    items: [
      { name: 'Sinflar bandligi', v: 'Qaysi sinf qaysi kunlari necha soat band boʻlgan' },
      { name: 'Imtihon hisoboti', v: 'Har bir oʻrin, har bir uzilish va uning davomiyligi' },
      { name: 'Kompyuterlar roʻyxati', v: 'Qaysi sinfda nechta kompyuter bor va ularda qaysi versiya oʻrnatilgan' },
    ],
  },

  ledger: {
    title: 'Bitta kompyuterning yillik xarajati',
    figures: { abroad: '$241.66', after: '$41.67', exam: '$3 295', ours: '$15' },
    rows: [
      { job: 'Operatsion tizim', prod: 'Windows 11 Pro', amt: '$199.99', per: 'bir marta' },
      { job: 'Kompyuter toza holatga qaytadi', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'yiliga' },
      { job: 'Oʻqituvchi sinfni boshqaradi', prod: 'LanSchool', amt: '$7.00', per: 'yiliga' },
      { job: 'Roʻyxatlar, yangilanishlar, imtihon kunidagi yordam', prod: 'Hech kim sotmaydi', amt: '—', per: '' },
    ],
    source: 'Narxlar 15.09.2026 kuni ishlab chiqaruvchilarning oʻz saytlaridan olingan va Shimoliy Amerika uchun eʼlon qilingan. Bu moʻljal, narx taklifi emas.',
  },

  offer: {
    eyebrow: 'Sinov davri',
    title: 'Birinchi uch oy bizdan',
    body: 'Har bir universitet bilan ishni bitta kompyuter sinfida uch oylik bepul sinovdan boshlaymiz. Hoakani oʻzimiz kelib oʻrnatamiz. Uch oy davomida oʻqituvchilar dars oʻtadi, talabalar oʻqiydi, biz esa yoningizda boʻlamiz va biror narsa buzilsa, tuzatamiz. Uch oy oxirida davom ettirish-ettirmaslikni oʻzingiz hal qilasiz.',
    days: { start: '1-hafta', end: '13-hafta' },
    points: [
      { k: 'Oʻzimiz oʻrnatamiz', v: 'Bir kun joyida ishlaymiz: sinfdagi kompyuterlar va serverni sozlab beramiz.' },
      { k: 'Yoningizda boʻlamiz', v: 'Uch oy davomida aloqadamiz. Nima buzilsa, oʻzimiz tuzatamiz.' },
      { k: 'Qaror sizda', v: 'Uch oy oxirida uchta hisobotni olasiz va keyingi qadamni ularga qarab tanlaysiz.' },
    ],
    price: 'Sinovdan keyin Hoaka xuddi shu ishni qiladigan chet el dasturlari toʻplamidan bir necha barobar arzonga tushadi.',
    priceLink: 'Narxlar',
    cta: 'Sinovni boshlash',
  },

  cta: {
    title: 'Kompyuter sinfingiz haqida gaplashaylik',
    body: 'Bizga yozing, ikki ish kuni ichida javob beramiz.',
    primary: 'Bogʻlanish',
  },

  pricing: {
    eyebrow: 'Narxlar',
    title: 'Har bir kompyuterga bir xil narx',
    lede: 'Bir kompyuter uchun yiliga $15. Narx har bir kompyuter sinfi uchun alohida, AQSh dollarida hisoblanadi.',
    tiersTitle: 'Sinfdagi kompyuterlar soniga qarab',
    calc: {
      label: 'Sinfingizdagi kompyuterlar soni',
      ours: 'Hoaka',
      abroadFirst: 'Chet elda, birinchi yili',
      abroadAfter: 'Chet elda, keyingi har yili',
      note: 'Chet el narxiga imtihon dasturi ham kiritilgan. Bu moʻljal, narx taklifi emas.',
    },
    tiers: [
      { count: '25 kompyuter', price: '$375', note: 'yiliga' },
      { count: '50 kompyuter', price: '$750', note: 'yiliga' },
      { count: '100 kompyuter', price: '$1 500', note: 'yiliga' },
    ],
    includedTitle: 'Narxga nima kiradi',
    included: [
      {
        k: 'Avtomatik tozalash',
        v: 'Talaba chiqib ketganda uning fayllari, sozlamalari va brauzer tarixi oʻchiriladi, tizim diski esa kompyuter har yoqilganda asl holiga qaytadi. Talaba qidiruv orqali oʻrnatgan ruxsat etilgan dasturlar keyingi talabalar uchun kompyuterda qoladi. Uning bu dasturlardagi shaxsiy fayllari esa saqlanmaydi.',
      },
      {
        k: 'Dasturlar',
        v: 'Talaba oʻzi biladigan Windows dasturini, masalan AutoCADni qidiradi va uning oʻrniga nima borligini koʻradi: bepul muqobili bir bosishda oʻrnatiladi yoki veb-versiyasi ochiladi. Faqat ruxsat etilgan dasturlar, imtihon paytida hech qachon. Imtihondan tashqari vaqtda har bir talabada terminal va dasturlash vositalari bor.',
      },
      {
        k: 'Oʻrnatish',
        v: 'Universitetning oʻz serveri boshqaruv panelida oʻrnatish fleshkasini tayyorlaydi. Undan yoqilgan kompyuter tizimni oʻzi oʻrnatadi, qayta oʻrnatilganda esa nomi va sinfi saqlanib qoladi. Tarmoq orqali oʻrnatish rejada.',
      },
      {
        k: 'Yangilanishlar',
        v: 'Har bir yangi versiyani biz tayyorlaymiz, tekshiramiz va imzolaymiz. Kompyuterlar uni sinf tarmogʻi orqali oʻz serveringizdan oladi, oʻzi oʻrnatadi va siz tanlagan vaqtda ishga tushiradi, imtihon paytida esa hech qachon.',
      },
      {
        k: 'Saytlar roʻyxati',
        v: 'Mintaqaviy taqiqlangan saytlar va ruxsat etilgan ilmiy saytlar roʻyxatlarini biz yangilab boramiz. Bu ish IT boʻlimingizga qolmaydi. Hisobot sinflaringizda qaysi saytlar ochilayotganini koʻrsatadi, istalganini bir bosishda bloklash mumkin.',
      },
      {
        k: 'Imtihon kuni',
        v: 'Har bir imtihon uchun jonli sinf sxemasi va har bir oʻrinda nima boʻlganini koʻrsatadigan jurnal boʻladi.',
      },
      {
        k: 'Boshqaruv paneli',
        v: 'Qoidalar, sinflar, kompyuterlar, hisobotlar va audit jurnali bir joyda, brauzerda. Oʻqituvchilar oʻz sinflarini oʻzi boshqaradi: rejimlar, imtihonlar, barcha ekranlarga bitta sahifa, dars uchun bitta havola. Administratorlar koʻpaysa ham narx oʻzgarmaydi.',
      },
    ],
    excludedTitle: 'Narxga kirmaydi',
    excluded: ['Jihozlar', 'Internet', 'Imtihon tizimi', 'Elektr va qurilish ishlari'],
    openTitle: 'Imzolashdan oldin kelishib olamiz',
    openBody: 'Bu bandlarni ataylab boʻsh qoldirdik. Ularni siz bilan birga toʻldiramiz.',
    open: [
      'Imtihon paytida va oddiy kunlarda qancha vaqtda javob berishimiz',
      'Shartnoma muddati va uni bekor qilish tartibi',
      'Kompyuter uchun minimal talablar: xotira, protsessor, tarmoq',
      'Sinov davri tugagach nima boʻladi',
    ],
    sourcesTitle: 'Taqqoslashdagi raqamlar qayerdan olingan',
    sources:
      'Narxlarni 15.09.2026 kuni ishlab chiqaruvchilarning oʻz saytlaridan oldik. Ular Shimoliy Amerika uchun eʼlon qilingan, shu sababli bu moʻljal, narx taklifi emas. Bir kompyuterga toʻgʻri keladigan summani oʻzimiz hisobladik: Windows bir marta, qolganlari har yili.',
    footnotes: [
      'Windows A3 alohida litsenziya emas: u faqat litsenziyasi bor kompyuterga oʻrnatiladi. Demak, operatsion tizim uchun ikki marta pul toʻlanadi.',
      'Imtihon dasturi kompyuter soniga qarab sotilmaydi, uning narxi talabalar soniga bogʻliq. Shuning uchun kichik sinf ham katta sinf bilan bir xil toʻlaydi.',
      'NetSupport School va Deep Freeze Enterprise narxini umuman eʼlon qilmaydi, uni bilish uchun ularga soʻrov yuborish kerak.',
    ],
  },

  pilot: {
    eyebrow: 'Bepul sinov',
    title: 'Uch oy bepul sinab koʻring',
    lede: 'Universitetingizga kelib, Hoakani bitta kompyuter sinfiga oʻzimiz oʻrnatamiz. Uch oy davomida yoningizda boʻlamiz va chiqqan har qanday nosozlikni tuzatamiz. Sinov qachon tugashi oldindan belgilanadi, keyin davom ettirish-ettirmaslikni oʻzingiz hal qilasiz.',
    stepsTitle: 'Sinov qanday oʻtadi',
    steps: [
      { n: '01', k: 'Suhbat', v: 'Yarim soat. Sinfingiz va kompyuterlaringizni koʻrib chiqamiz.' },
      { n: '02', k: 'Oʻrnatish', v: 'Bir kun joyida ishlaymiz: serverni kompyuterlaringizdan birida ishga tushiramiz, sinf kompyuterlariga tizimni u tayyorlagan fleshkadan oʻrnatamiz, BIOS parollarini siz bilan birga qoʻyamiz.' },
      { n: '03', k: 'Uch oylik sinov', v: 'Oʻqituvchilar dars oʻtadi, talabalar oʻqiydi. Biz aloqadamiz va nima buzilsa, tuzatamiz.' },
      { n: '04', k: 'Hisobotlar va qaror', v: 'Uchta hisobotni olasiz. Davom etamizmi yoki yoʻqmi, ularni koʻrib hal qilasiz.' },
    ],
    ready: {
      title: 'Kelishimizdan oldin',
      lede: 'Shular tayyor boʻlsa, oʻrnatish bir kun ichida tugaydi.',
      items: [
        { k: 'Kompyuterlar', v: 'Sinfdagi kompyuterlar universitetga tegishli, 64 bitli va fleshkadan yuklana oladigan boʻlishi kerak' },
        { k: 'Tarmoq', v: 'Simli tarmoq, DHCP va internetga ulanish' },
        { k: 'Server uchun kompyuter', v: 'Windows 10 yoki 11 yoki Linux, sinf tarmogʻida, kun boʻyi yoqiq turadi' },
        { k: 'BIOS parollari', v: 'Birga oʻrnatamiz, parol sizda qoladi' },
        { k: 'Masʼul xodim', v: 'Biz bogʻlana oladigan bitta xodim' },
      ],
    },
    formTitle: 'Biz bilan bogʻlaning',
    formBody: 'Formani toʻldirib yuboring, ikki ish kuni ichida javob beramiz.',
    fields: {
      name: 'Ism va familiya',
      role: 'Lavozim',
      org: 'Universitet',
      email: 'Elektron pochta',
      phone: 'Telefon',
      machines: 'Sinfdagi kompyuterlar soni',
      message: 'Qoʻshimcha maʼlumot',
      messagePlaceholder: 'Sinfingiz haqida bilishimiz kerak boʻlgan boshqa narsalar',
    },
    submit: 'Yuborish',
    orEmail: 'Yoki toʻgʻridan-toʻgʻri yozing',
    required: 'majburiy',
    sent: {
      title: 'Yana bir qadam',
      body: 'Pochta dasturingizda tayyor xat ochilishi kerak, uni oʻsha yerdan yuboring. Agar ochilmagan boʻlsa, shu sahifadagi manzilga toʻgʻridan-toʻgʻri yozing.',
    },
  },

  notFound: 'Sahifa topilmadi',
  install: installUz,

  footer: {
    tagline: 'Universitetlarning kompyuter sinflari uchun markazdan boshqariladigan operatsion tizim.',
    rights: 'Barcha huquqlar himoyalangan.',
    nav: 'Sahifalar',
    contact: 'Aloqa',
    language: 'Til',
  },
}

export type Dict = typeof uz
