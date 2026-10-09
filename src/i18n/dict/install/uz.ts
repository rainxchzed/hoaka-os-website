import type { InstallGuide } from './types'

export const installUz: InstallGuide = {
  eyebrow: 'Oʻrnatish boʻyicha qoʻllanma',
  title: 'Hoakani oʻrnatish',
  lede: 'Biz yuborgan fayllardan ishlab turgan kompyuter sinfigacha. Server va oʻrnatish fleshkasiga taxminan bir soat, keyin har bir kompyuterga bir necha daqiqa ketadi.',
  pick: {
    label: 'Server kompyuteringiz',
    hint: 'Quyidagi qadamlar tanlovingizga qarab oʻzgaradi.',
    options: { windows: 'Windows 10 yoki 11', linux: 'Linux' },
    short: { windows: 'Windows', linux: 'Linux' },
  },
  noFiles: 'Fayllar hali yoʻqmi?',
  noFilesCta: 'Bepul uch oyni soʻrang',
  contents: 'Shu sahifada',
  need: {
    id: 'before',
    title: 'Boshlashdan oldin',
    items: [
      {
        k: 'Server kompyuter',
        v: {
          windows: 'Windows 10 yoki 11, 64-bit, 40 GB boʻsh joy. Kun boʻyi yoqilgan turadi.',
          linux: '64-bit Linux, systemd bilan, 40 GB boʻsh joy. Kun boʻyi yoqilgan turadi.',
        },
      },
      {
        k: 'Uning doimiy manzili',
        v: 'Uni kompyuter sinfi tarmogʻiga kabel bilan ulang va IT boʻlimidan routerda uning manzilini band qilib qoʻyishni soʻrang. Oʻquv kompyuterlari serverni shu manzil orqali topadi.',
      },
      {
        k: 'Oʻquv kompyuterlari',
        v: '64-bit, USB fleshkadan ishga tusha oladigan, har biri tarmoqqa kabel bilan ulangan. Ularning diskidagi hamma narsa oʻchiriladi.',
      },
      { k: 'USB fleshka', v: '16 GB yoki kattaroq, hamda bepul balenaEtcher dasturi: balena.io/etcher.' },
      {
        k: 'Biz yuboradigan fayllar',
        v: {
          windows: 'Server dasturi hoaka-server-windows-amd64.exe va oʻquv kompyuterlari tizimi, .zip fayl. Havolalar 7 kun ishlaydi.',
          linux: 'Server dasturi hoaka-server-linux-amd64 va oʻquv kompyuterlari tizimi, .zip fayl. Havolalar 7 kun ishlaydi.',
        },
      },
      {
        k: 'Tarmoq',
        v: 'Oʻqituvchilar serverga 8080-port, oʻquv kompyuterlari esa 8443-port orqali ulanadi. Ikkalasini ham faqat xodimlar tarmogʻida qoldiring, internetga ochmang.',
      },
    ],
  },
  steps: [
    {
      id: 'server',
      title: 'Serverni oʻrnatish',
      lines: [
        {
          windows: [
            '`hoaka-server-windows-amd64.exe` faylini ikki marta bosing.',
            'Windows ogohlantirish chiqarsa, [[More info]], keyin [[Run anyway]] tugmasini bosing (rus tilidagi Windowsda [[Подробнее]] va [[Выполнить в любом случае]]). Ruxsat soʻralganda [[Yes]] tugmasini bosing.',
            'Oynada oʻrnatish jarayoni koʻrinadi. Endi server kompyuter bilan birga ishga tushadi va Windows Firewallda oʻzining ikki portini ochadi.',
            'Brauzerda sozlash sahifasi ochiladi. Oyna Enter tugmasini bosmaguningizcha ochiq turadi.',
          ],
          linux: [
            'Fayl turgan papkada terminal oching va quyidagilarni bajaring:',
            { run: 'chmod +x hoaka-server-linux-amd64' },
            { run: 'sudo ./hoaka-server-linux-amd64 -install' },
            'Server oʻzini `/usr/local/bin/hoaka-server` ga koʻchiradi, endi kompyuter bilan birga ishga tushadi va firewallda ikki portini ochadi.',
            '`Finish in the browser` yozuvidan keyin chiqqan havolani oching.',
          ],
        },
        'U chiqargan maʼlumotni saqlab qoʻying: oʻqituvchilar ochadigan manzil, `http://…:8080/`, va server kaliti. Har bir oʻquv kompyuteri nom berilayotganda shu kalitni koʻrsatadi.',
      ],
    },
    {
      id: 'setup',
      title: 'Serverni sozlash',
      lines: [
        'Sozlash sahifasida [[Universitet nomi]], [[Ismingiz]] va kamida 8 belgidan iborat [[Parol]] maydonlarini toʻldiring. [[Sozlash kodi]] havoladan oʻzi toʻldiriladi.',
        '[[Sozlash va kirish]] tugmasini bosing. Bundan buyon `admin` nomi va shu parol bilan kirasiz.',
      ],
      aside: [
        {
          windows: [
            'Sahifani tugatmasdan yopib qoʻydingizmi? Buyruqlar satrini (Command Prompt) administrator sifatida oching va yangi havola uchun buni bajaring:',
            { run: '"C:\\Program Files\\Hoaka\\hoaka-server.exe" -setup-code' },
          ],
          linux: ['Sahifani tugatmasdan yopib qoʻydingizmi? Yangi havola uchun buni bajaring:', { run: 'sudo hoaka-server -setup-code' }],
        },
      ],
    },
    {
      id: 'licence',
      title: 'Bepul litsenziyani yuklash',
      where: ['Sozlamalar', 'Litsenziya'],
      lines: [
        '[[3 oy bepul sinab koʻring]] tugmasini bosing.',
        '[[Nechta kompyuterda sinab koʻriladi]] maydoniga sonni yozing va [[Pochta orqali yuborish]] tugmasini bosing. Soʻrov licence@hoakaos.com manziliga boradi. Pochta dasturi boʻlmasa, [[Nusxa olish]] tugmasini bosing va soʻrovni shu manzilga xat qilib yuboring.',
        'Biz litsenziya faylini yuboramiz. [[Litsenziya faylini tanlash]] tugmasini bosing, faylni tanlang, keyin [[Yuklash]] tugmasini bosing.',
      ],
      aside: ['Litsenziya yuklanmaguncha hech narsa ishlamaydi: server oʻzgarishlarni qabul qilmaydi, ulangan oʻquv kompyuterlari esa qulflangan holda qoladi.'],
    },
    {
      id: 'rooms',
      title: 'Xonalarni qoʻshish',
      where: ['Xonalar'],
      lines: [
        'Har bir kompyuter sinfi uchun bir marta [[Xona yaratish]] tugmasini bosing, masalan, «Lab 204».',
        'Kompyuterlar nomini xonadan oladi: «Lab 204» xonasidagi 7-kompyuter lab-204-07 boʻladi.',
      ],
    },
    {
      id: 'stick',
      title: 'Oʻrnatish fleshkasini tayyorlash',
      where: ['Sozlamalar', 'Oʻquv kompyuterlari', 'Oʻquv kompyuterlari uchun oʻrnatuvchi'],
      lines: [
        {
          windows: [
            'Bu qadamni server kompyuterning oʻzida bajaring: fayl katta, u yerda esa tarmoq orqali oʻtmaydi.',
            'Oʻquv kompyuterlari tizimining .zip faylini sichqonchaning oʻng tugmasi bilan bosing va [[Extract All]] (rus tilida [[Извлечь все]]) ni tanlang. Ichida taxminan 7,5 GB hajmli .raw fayl bor.',
          ],
          linux: [
            'Bu qadamni konsol ochiladigan kompyuterda bajaring. Server kompyuterning oʻzida ish stoli boʻlsa, katta fayl tarmoq orqali oʻtmaydi.',
            'Oʻquv kompyuterlari tizimini arxivdan chiqaring. Ichida taxminan 7,5 GB hajmli .raw fayl bor.',
            { run: 'unzip hoaka_*.zip' },
          ],
        },
        '[[Faylni tanlash]] tugmasini bosing va .raw faylni tanlang. Yuklash 100% ga yetguncha kuting.',
        'Kartada [[Bu kompyuterning manzili oʻzgarishi mumkin]] yozuvi chiqsa, davom etishdan oldin IT boʻlimidan koʻrsatilgan manzilni band qilib qoʻyishni soʻrang.',
        '[[Oʻrnatuvchini yuklab olish]] tugmasini bosing. Bitta .img fayl olasiz.',
        'balenaEtcher dasturida [[Flash from file]] orqali .img faylni, [[Select target]] orqali fleshkani tanlang, keyin [[Flash!]] tugmasini bosing. Fleshkadagi hamma narsa oʻchiriladi.',
      ],
      aside: ['Fleshkada universitetingizning roʻyxatdan oʻtkazish kaliti bor. Uni kalit kabi saqlang va faqat kompyuterlarni oʻrnatadigan odamga bering.'],
    },
    {
      id: 'computers',
      title: 'Har bir oʻquv kompyuterini oʻrnatish',
      lines: [
        'BIOS yoki UEFI sozlamalarida (odatda kompyuter yonayotganda F2, F1 yoki Del) [[Secure Boot]] va [[CSM]] (Legacy boot) ni oʻchiring. Shu yerda BIOS parolini ham qoʻying, shunda hech kim kompyuterni boshqa fleshkadan ishga tushira olmaydi. Saqlang va chiqing.',
        'Fleshkani ulang, kompyuterni yoqing, yuklash menyusini oching (odatda F12, F11, F9 yoki Esc) va fleshkani tanlang.',
        '[[Hoakani shu kompyuterga oʻrnatish]] ekranida kompyuterning oʻz diskini tanlang, [[Oʻrnatish]], keyin [[Oʻchirish va oʻrnatish]] tugmasini bosing. Diskdagi hamma narsa oʻchiriladi.',
        'Hoaka oʻrnatilgani haqida yozuv chiqqach, fleshkani chiqarib oling. Kompyuter oʻzi qayta ishga tushadi.',
        '[[Bu kompyuterga nom bering]] ekranida [[Xona]] ni tanlang, [[Kompyuter raqami]] ni yozing va [[Davom etish]] tugmasini bosing. Pastdagi [[Server kaliti]] server chiqargan kalit bilan bir xilligini tekshiring, keyin [[Tasdiqlash]] tugmasini bosing.',
        'Ish stoli ochiladi, kompyuter esa konsoldagi [[Kompyuterlar]] sahifasida paydo boʻladi. Fleshkani keyingi kompyuterga olib boring.',
      ],
      aside: ['Avval Hoaka oʻrnatilgan kompyuterda [[Oʻrnatish va nomni saqlash]] tugmasi chiqadi. Kompyuter nomi, xonasi, litsenziyadagi oʻrni va oʻrnatilgan dasturlari saqlanadi.'],
    },
  ],
  run: {
    id: 'run',
    title: 'Kompyuter sinfini boshqarish',
    items: [
      { k: 'Xonalar', v: 'Xonani Ochiq, Maʼruza va Imtihon rejimlari orasida almashtiring va har bir ekranga sahifa yuboring.' },
      { k: 'Imtihonlar', v: 'Imtihonni imtihon sahifangiz havolasi bilan boshlang. U tugaguncha kompyuterlar faqat shu sahifani ochadi.' },
      { k: 'Odamlar', v: 'Oʻqituvchilar uchun hisob qoʻshing va har biriga oʻz xonalarini bering.' },
      { k: 'Yangilanishlar', v: 'Yangi versiyalar oʻzi keladi. Sozlamalar › Yangilanishlar sahifasida oʻquv kompyuterlari ularni qachon olishi koʻrsatiladi. Imtihon paytida hech narsa oʻrnatilmaydi.' },
    ],
  },
  copy: 'Nusxa olish',
  copied: 'Nusxa olindi',
  help: {
    title: 'Nimadir yozilganidek boʻlmadimi?',
    body: 'Ekranni rasmga oling va qaysi qadamda turganingizni yozib yuboring, oxirigacha yetkazishga yordam beramiz.',
  },
}
