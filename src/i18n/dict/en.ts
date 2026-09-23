import type { Dict } from './uz'

export const en: Dict = {
  meta: {
    home: {
      title: 'Hoaka OS — labs that never decay',
      description:
        'A managed operating system for university computer labs. Every machine boots clean, shows only what the university allows, locks for exams, and resets itself.',
    },
    pricing: {
      title: 'Pricing — Hoaka OS',
      description:
        '$15 per machine per year. Abroad, the same outcome costs $241.66 in the first year. Free up to 20 machines.',
    },
    pilot: {
      title: 'Free pilot — Hoaka OS',
      description: 'One lab, one month, with a hard end date. Carrying on afterwards is your call.',
    },
  },

  nav: {
    home: 'Home',
    pricing: 'Pricing',
    pilot: 'Pilot',
    cta: 'Start a pilot',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',
    skip: 'Skip to main content',
  },

  hero: {
    title: 'Labs that never decay',
    lede: 'Every lab PC boots clean, shows only what the university allows, locks for exams, and resets itself when the student logs out.',
    primary: 'Start a free pilot',
    secondary: 'What a year costs',
  },

  day: {
    heading: 'One day in a lab, 07:58 to 17:30',
    steps: [
      {
        id: 'boot',
        time: '07:58',
        title: 'Every machine starts from the same clean system',
        body: 'The system disk resets at every boot. Whatever was installed or changed yesterday is gone before the first class. There is no login screen and nothing to wait for.',
      },
      {
        id: 'open',
        time: '09:00',
        title: 'Research works. Distractions don’t.',
        body: 'Scholar, arXiv, Moodle and the publishers they link to open normally. Social media, streaming, games and the rest are closed by category: 4,823,341 domains. Keeping the lists current is our job, not your IT staff’s.',
      },
      {
        id: 'lecture',
        time: '11:00',
        title: 'One page on every screen',
        body: 'The teacher switches the room to Lecture from a browser. A blue bar appears on every screen, and the page they send opens everywhere at once. No second machine, nothing extra to install.',
      },
      {
        id: 'exam',
        time: '14:00',
        title: 'One locked page, and a record of every seat',
        body: 'The room locks to the exam page. A seat that leaves the exam or drops off the network turns red on the seat map and stays red, and the log records when and for how long.',
      },
      {
        id: 'logout',
        time: '17:30',
        title: 'The machine forgets the day',
        body: 'When the last student logs out, their folder is wiped and rebuilt. Tomorrow at 07:58 the lab boots exactly as it did this morning.',
      },
    ],
    honest: 'It is a record, not a wall: friction, no persistence and visibility. We don’t call it unbypassable.',
    labels: {
      interrupted: 'Interrupted · 2m 29s',
      noContact: 'No contact',
      blocked: 'Blocked site',
    },
  },

  reports: {
    title: 'And once a month, a report the rector can hand to the ministry',
    body: 'With the institution’s name and the date range, in any of the three languages, printed straight from the browser.',
    items: [
      { name: 'Lab utilization', v: 'Which lab, how many hours, which days' },
      { name: 'Exam report', v: 'Every seat, every gap, with its length' },
      { name: 'Inventory', v: 'How many machines, in which lab, on which version' },
    ],
  },

  ledger: {
    title: 'What one machine costs for a year',
    sentence: 'Abroad, four separate products do this job for {abroad} per machine in the first year and {after} every year after, plus {exam} a year for the exam software. Hoaka does all of it for {ours} per machine, the same every year.',
    figures: { abroad: '$241.66', after: '$41.67', exam: '$3,295', ours: '$15' },
    compare: { abroad: 'Abroad, first year', ours: 'Hoaka, every year' },
    rows: [
      { job: 'The operating system', prod: 'Windows 11 Pro', amt: '$199.99', per: 'once' },
      { job: 'The machine comes back clean', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'a year' },
      { job: 'The teacher controls the class', prod: 'LanSchool', amt: '$7.00', per: 'a year' },
      { job: 'Lists, updates, exam-day support', prod: 'Nobody sells it', amt: '—', per: '' },
    ],
    source: 'Prices read from the vendors’ own pages on 15 September 2026, published for North America. An indicator, not a quote.',
    cta: 'The full comparison',
  },

  limits: {
    title: 'What Hoaka does not do',
    items: [
      'It does not touch personal phones, tablets or laptops',
      'It does not watch through a webcam',
      'It does not store screenshots',
      'It does not record keystrokes',
      'It does not send data to a cloud — the server is in the building',
      'It does not supply exam content — the exam page is yours',
    ],
  },

  cta: {
    title: 'One lab, one month',
    body: 'With a hard end date. Carrying on afterwards is your call.',
    primary: 'Start a pilot',
    secondary: 'See what it costs',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'One price, one unit',
    lede: '$15 per machine per year. Quoted per lab, in US dollars.',
    tiersTitle: 'By lab size',
    tiers: [
      { count: 'Up to 20 machines', price: 'Free', note: 'No charge' },
      { count: '25 machines', price: '$375', note: 'a year' },
      { count: '50 machines', price: '$750', note: 'a year' },
      { count: '100 machines', price: '$1,500', note: 'a year' },
    ],
    includedTitle: 'What the price covers',
    included: [
      {
        k: 'Reset',
        v: 'A student’s home is wiped and rebuilt at logout. The system disk resets at every boot. Nothing a student installs survives.',
      },
      {
        k: 'Reimaging',
        v: 'Reinstalling is rare, because the machine restores itself at every boot. When it is needed we supply the image and the machine configures itself. Today this is done at the machine; over the network is planned.',
      },
      {
        k: 'Updates',
        v: 'We build and test the new versions. For now an update means writing a new image; updating in place is planned.',
      },
      {
        k: 'List maintenance',
        v: 'The regional blocklist and the academic allowlist are ours to keep current, not your IT staff’s.',
      },
      {
        k: 'Exam day',
        v: 'Every exam gets a seat map and a log of what each seat did.',
      },
      {
        k: 'The console',
        v: 'Policy, rooms, machines, reports and the audit log, in a browser. No charge per administrator.',
      },
    ],
    excludedTitle: 'Not included',
    excluded: ['Hardware', 'Internet', 'The exam platform', 'Electrical or building work'],
    openTitle: 'Open before this is signed',
    openBody: 'These are deliberately blank. We fill them in together.',
    open: [
      'Response time during an exam, and on an ordinary day',
      'Contract length and how either side ends it',
      'The minimum machine: memory, processor, network',
      'What happens when the pilot ends',
      'Above 20 machines: whether the price is for every machine or only for the ones beyond 20',
    ],
    sourcesTitle: 'Where the comparison figures come from',
    sources:
      'Prices read from the vendors’ own pages on 15 September 2026 and published for North America, so an indicator rather than a quote. The per-machine total is our own addition: Windows once, the rest every year.',
    footnotes: [
      'Windows A3 is not a licence of its own. It only installs on a machine that already has one, so the operating system is paid for twice.',
      'The exam software is not sold per machine. It is priced on student numbers, so a small lab pays the same as a large one.',
      'NetSupport School and Deep Freeze Enterprise publish no price at all. You have to ask to find out.',
    ],
    requirements: {
      eyebrow: 'Requirements',
      title: 'What it takes',
      provide: {
        title: 'The institution provides',
        items: [
          { k: 'The machines', v: 'Institution-owned lab computers' },
          { k: 'Network', v: 'A wired network with DHCP and an internet uplink' },
          { k: 'A host for the server', v: 'The management server runs inside the institution' },
          { k: 'BIOS passwords', v: 'We set them together and the password stays with you' },
          { k: 'A named contact', v: 'One person we can reach' },
        ],
      },
      stack: {
        title: 'What the image is',
        items: [
          { k: 'Base', v: 'Debian 13' },
          { k: 'Desktop', v: 'LXQt' },
          { k: 'Browser', v: 'Chromium under managed policy' },
          { k: 'Keyboard', v: 'uz (Latin), ru, en — Alt+Shift' },
          { k: 'Network', v: 'Wired only' },
        ],
      },
    },
  },

  pilot: {
    eyebrow: 'Free pilot',
    title: 'One lab, one month',
    lede: 'With a hard end date. Carrying on afterwards is your call. No charge up to 20 machines.',
    stepsTitle: 'How it goes',
    steps: [
      { n: '01', k: 'A conversation', v: 'Half an hour. We look at your lab and your machines.' },
      { n: '02', k: 'Setup', v: 'One day. We write the image, stand up the server, and set BIOS passwords with you.' },
      { n: '03', k: 'A month of use', v: 'The lab runs as usual. We are on hand.' },
      { n: '04', k: 'Report and decision', v: 'You get all three reports. Carrying on afterwards is your call.' },
    ],
    formTitle: 'Get in touch',
    formBody: 'Send these details and we will answer within two working days.',
    fields: {
      name: 'Name',
      role: 'Role',
      org: 'Institution',
      email: 'Email',
      phone: 'Phone',
      machines: 'Machines in the lab',
      message: 'Anything else',
      messagePlaceholder: 'Is there anything about the lab we should know?',
    },
    submit: 'Send',
    orEmail: 'Or write to us directly',
    required: 'required',
    sent: {
      title: 'Sent',
      body: 'Your message opens in your mail program. If it did not open, write to the address below instead.',
    },
  },

  notFound: 'Page not found',
  footer: {
    tagline: 'A managed operating system for university computer labs.',
    rights: 'All rights reserved.',
    nav: 'Pages',
    contact: 'Contact',
    language: 'Language',
    status: 'Pilot stage — first lab October 2026',
  },
}
