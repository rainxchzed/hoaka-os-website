import type { InstallGuide } from './types'

export const installUz: InstallGuide = {
  title: 'Hoakani oʻrnatish',
  lede: 'Server va oʻrnatish fleshkasiga taxminan bir soat, keyin har bir kompyuterga bir necha daqiqa.',
  pick: {
    label: 'Server kompyuteringiz',
    options: { windows: 'Windows 10 yoki 11', linux: 'Linux' },
    short: { windows: 'Windows', linux: 'Linux' },
  },
  noFiles: 'Fayllar hali yoʻqmi?',
  noFilesCta: 'Bepul uch oyni soʻrang',
  contents: 'Qadamlar',
  need: {
    id: 'before',
    title: 'Boshlashdan oldin',
    items: [
      {
        k: 'Server kompyuter',
        v: {
          windows: '64-bit, 40 GB boʻsh joy, kun boʻyi yoqilgan.',
          linux: '64-bit, systemd bilan, 40 GB boʻsh joy, kun boʻyi yoqilgan.',
        },
      },
      { k: 'Uning doimiy manzili', v: 'Kompyuter sinfi tarmogʻiga kabel bilan ulangan. IT boʻlimidan routerda uning manzilini band qilishni soʻrang.' },
      { k: 'Oʻquv kompyuterlari', v: '64-bit, USB fleshkadan ishga tusha oladigan, har biri tarmoqqa kabel bilan ulangan. Ularning diski tozalanadi.' },
      { k: 'USB fleshka', v: '16 GB yoki kattaroq, hamda bepul balenaEtcher: balena.io/etcher.' },
      {
        k: 'Biz yuboradigan fayllar',
        v: {
          windows: 'hoaka-server-windows-amd64.exe va .zip koʻrinishidagi oʻquv kompyuterlari tizimi. Havolalar 7 kun ishlaydi.',
          linux: 'hoaka-server-linux-amd64 va .zip koʻrinishidagi oʻquv kompyuterlari tizimi. Havolalar 7 kun ishlaydi.',
        },
      },
      { k: 'Tarmoq', v: 'Oʻqituvchilar uchun 8080, oʻquv kompyuterlari uchun 8443-port, faqat xodimlar tarmogʻida, internetga ochilmagan.' },
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
            'Windows ogohlantirsa: [[More info]], keyin [[Run anyway]], keyin [[Yes]] (rus tilidagi Windowsda [[Подробнее]], [[Выполнить в любом случае]], [[Да]]).',
          ],
          linux: [
            'Fayl turgan papkada, terminalda:',
            { run: 'chmod +x hoaka-server-linux-amd64' },
            { run: 'sudo ./hoaka-server-linux-amd64 -install' },
            '`Finish in the browser` dan keyin chiqqan havolani oching. Boshqa kompyuterdan ochsangiz, `localhost` oʻrniga server manzilini yozing.',
          ],
        },
        'U chiqargan konsol manzili, `http://…:8080/`, va server kalitini yozib oling.',
      ],
    },
    {
      id: 'setup',
      title: 'Serverni sozlash',
      lines: ['[[Universitet nomi]], [[Ismingiz]] va [[Parol]]ni toʻldiring, keyin [[Sozlash va kirish]] tugmasini bosing.'],
      aside: [
        {
          windows: [
            'Sahifani erta yopib qoʻydingizmi? Administrator sifatida ochilgan buyruqlar satrida (Command Prompt):',
            { run: '"C:\\Program Files\\Hoaka\\hoaka-server.exe" -setup-code' },
          ],
          linux: ['Sahifani erta yopib qoʻydingizmi?', { run: 'sudo hoaka-server -setup-code' }],
        },
      ],
    },
    {
      id: 'licence',
      title: 'Bepul litsenziyani yuklash',
      where: ['Sozlamalar', 'Litsenziya'],
      lines: [
        '[[3 oy bepul sinab koʻring]] tugmasini bosing, kompyuterlar sonini yozing, keyin [[Pochta orqali yuborish]].',
        'Biz litsenziya faylini yuboramiz: [[Litsenziya faylini tanlash]], keyin [[Yuklash]].',
      ],
    },
    {
      id: 'rooms',
      title: 'Xonalarni qoʻshish',
      where: ['Xonalar'],
      lines: ['Har bir kompyuter sinfi uchun bir marta [[Xona yaratish]] tugmasini bosing, masalan, «Lab 204».'],
    },
    {
      id: 'stick',
      title: 'Oʻrnatish fleshkasini tayyorlash',
      where: ['Sozlamalar', 'Oʻquv kompyuterlari', 'Oʻquv kompyuterlari uchun oʻrnatuvchi'],
      lines: [
        {
          windows: [
            'Server kompyuterning oʻzida, shunda katta fayl tarmoq orqali oʻtmaydi.',
            '.zip faylni sichqonchaning oʻng tugmasi bilan bosing, keyin [[Extract All]] (rus tilida [[Извлечь все]]).',
          ],
          linux: [
            'Serverda ish stoli boʻlsa, oʻsha yerda, shunda katta fayl tarmoq orqali oʻtmaydi.',
            { run: 'unzip hoaka_*.zip' },
          ],
        },
        '[[Faylni tanlash]] tugmasini bosing va .raw faylni tanlang.',
        '[[Oʻrnatuvchini yuklab olish]] tugmasini bosing.',
        'balenaEtcher dasturida: [[Flash from file]] bilan .img faylni, [[Select target]] bilan fleshkani tanlang, keyin [[Flash!]]. Fleshka tozalanadi.',
      ],
    },
    {
      id: 'computers',
      title: 'Har bir oʻquv kompyuterini oʻrnatish',
      lines: [
        'BIOS yoki UEFI sozlamalarida (odatda yoqilayotganda F2, F1 yoki Del): [[Secure Boot]] va [[CSM]]ni oʻchiring va hech kim boshqa fleshkadan ishga tushirmasligi uchun BIOS parolini qoʻying.',
        'Fleshkani ulang va yuklash menyusida uni tanlang (odatda F12, F11, F9 yoki Esc).',
        'Kompyuterning oʻz diskini tanlang, keyin [[Oʻrnatish]] va [[Oʻchirish va oʻrnatish]].',
        'Ekranda aytilganda fleshkani chiqarib oling.',
        '[[Xona]]ni tanlang, [[Kompyuter raqami]]ni yozing, keyin [[Davom etish]]. [[Server kaliti]] server chiqargan kalit bilan bir xilligini tekshiring, keyin [[Tasdiqlash]].',
        'Kompyuter konsoldagi [[Kompyuterlar]] sahifasida paydo boʻladi. Keyingi kompyuterga oʻting.',
      ],
    },
  ],
  run: {
    id: 'run',
    title: 'Kompyuter sinfini boshqarish',
    items: [
      { k: 'Xonalar', v: 'Xonani Ochiq, Maʼruza va Imtihon rejimlari orasida almashtiring va har bir ekranga sahifa yuboring.' },
      { k: 'Imtihonlar', v: 'Imtihonni sahifasi havolasi bilan boshlang. U tugaguncha kompyuterlar faqat shu sahifani ochadi.' },
      { k: 'Odamlar', v: 'Oʻqituvchilar uchun hisob qoʻshing va har biriga oʻz xonalarini bering.' },
      { k: 'Yangilanishlar', v: 'Yangi versiyalar oʻzi keladi, imtihon paytida hech qachon oʻrnatilmaydi.' },
    ],
  },
  alt: {
    setup: 'Sozlash sahifasi',
    licence: 'Bepul sinov soʻrovi bilan Litsenziya sahifasi',
    'create-room': 'Xona yaratish oynasi',
    installer: 'Oʻquv kompyuterlari uchun oʻrnatuvchi kartasi',
    'installer-disk': 'Oʻrnatuvchida disk tanlash',
    name: 'Kompyuterga nom berish ekrani',
    enrolled: 'Kompyuterlar sahifasidagi yangi kompyuter',
  },
  copy: 'Nusxa olish',
  copied: 'Nusxa olindi',
  help: {
    title: 'Qiyinchilik boʻldimi?',
    body: 'Ekranni rasmga olib, qadam raqami bilan yuboring.',
  },
}
