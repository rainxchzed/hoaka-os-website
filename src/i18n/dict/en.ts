import type { Dict, Tone } from './uz'

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
    eyebrow: 'An operating system for university labs',
    title: 'Labs that never decay',
    lede: 'Every lab PC boots clean, shows only what the university allows, locks for exams, and resets itself when the student logs out.',
    primary: 'Start a free pilot',
    secondary: 'What a year costs',
    scroll: 'Scroll',
    stats: [
      { value: '3.1', unit: 's', label: 'from one click to every screen' },
      { value: '4,823,341', unit: '', label: 'domains the resolver knows' },
      { value: '$15', unit: '', label: 'per machine, per year' },
      { value: '12', unit: 'mo', label: 'of event history' },
    ],
  },

  decay: {
    eyebrow: 'The problem',
    title: 'A lab starts decaying the day it opens',
    lede: 'Not because anything broke. Because hundreds of people use it every day.',
    items: [
      {
        title: 'Every student leaves something behind',
        body: 'The desktop fills with shortcuts, a toolbar appears in the browser, something gets installed from somewhere. After one semester the lab is unrecognisable.',
      },
      {
        title: 'IT walks to every machine',
        body: 'A fault means going to the machine. An update means going back. Twenty machines, twenty walks, every time.',
      },
      {
        title: 'Nobody knows what happened in the exam',
        body: 'There is no record of who left the page and when. There is only the invigilator’s memory, and memory is not a document.',
      },
      {
        title: 'When a report is asked for, there are no numbers',
        body: 'How much the lab was used, how many machines are working, which one went down and when — there is no exact answer.',
      },
    ],
  },

  clean: {
    eyebrow: 'Clean state',
    title: 'Factory-fresh at every boot',
    body: 'The system disk does not change. Whatever a student installs, downloads or breaks is gone at the next boot. A student’s home folder is wiped and rebuilt when they log out.',
    points: [
      { k: 'System disk', v: 'Resets at every boot' },
      { k: 'Student home', v: 'Wiped at logout' },
      { k: 'Terminal, package manager, settings', v: 'None' },
      { k: 'Programs in the menu', v: 'Twelve, and nothing else' },
    ],
    demo: {
      caption: 'One semester → one reboot',
      before: 'End of semester',
      after: 'After the reboot',
      reboot: 'Reboot',
      junk: ['new toolbar', 'unknown.exe', 'torrent', 'game', 'adware', 'toolbar 2'],
    },
  },

  policy: {
    eyebrow: 'Policy',
    title: 'Only what the university allows',
    body: 'Policy has three levels: institution, room, machine. A lower level inherits the one above it and overrides it where it needs to. A room’s mode reaches every machine in that room.',
    tree: { site: 'Institution', room: 'Lab 204', device: 'Machine A3' },
    counter: { label: 'Domains the resolver knows', sub: 'The UT1 lists plus a regional addition' },
    modes: [
      {
        name: 'Open',
        body: 'Everything for study works. Social media, video, games and the rest are closed by category.',
      },
      {
        name: 'Lecture',
        body: 'A blue bar over the room. The teacher sends one page to every screen.',
      },
      {
        name: 'Exam',
        body: 'A red bar and one locked page. No node at any level can add a site to an exam.',
      },
    ],
    note: 'Whole-domain blocks live in DNS. Path-level exceptions stay in the browser, because DNS cannot see inside an address.',
  },

  exam: {
    eyebrow: 'Exams',
    title: 'One locked page, and a seat map',
    body: 'When an exam starts the room locks and every seat gets its own square. Green means the seat is in the exam. Grey means no contact. Red means the seat left the mode or dropped off the network — and it stays red.',
    legend: { live: 'In exam', idle: 'No contact', alarm: 'Interrupted' },
    seatLabel: 'Seat',
    logTitle: 'Exam log',
    logRows: [
      { seat: 'A1', text: 'Stayed to the end', tone: 'live' },
      { seat: 'C6', text: 'No contact since 21:04:12', tone: 'idle' },
      { seat: 'B3', text: 'Stopped answering 21:16:07 – 21:18:37, 2m 29s', tone: 'alarm' },
    ] as { seat: string; text: string; tone: Tone }[],
    summary: '22 stayed in exam, 1 interrupted, 1 no contact, 24 seats',
    honest: {
      title: 'This is not a wall — it is a record',
      body: 'The protection is three things: friction, non-persistence and visibility. We do not call it unbypassable, and we never have. The exam log is a document in the invigilator’s hand, not a program standing in for one.',
    },
  },

  teacher: {
    eyebrow: 'The teacher',
    title: 'Runs the class from a browser',
    body: 'Switch the mode, send one page to every screen, put a message on every screen — all of it in a browser. No second teacher machine is needed, and there is no charge per administrator.',
    actions: [
      { k: 'Switch the mode', v: 'Open ↔ Lecture' },
      { k: 'Send a page', v: 'One address, every screen' },
      { k: 'Send a message', v: 'Shown on every screen' },
      { k: 'End the session', v: 'The machine wipes itself' },
    ],
    screens: 'screens',
    sent: 'Sent',
  },

  reports: {
    eyebrow: 'Reports',
    title: 'A report the rector hands to the ministry',
    body: 'Three reports: lab utilization, the exam report and inventory. With the institution name and a date range, printed straight from the browser. In all three languages.',
    items: [
      { name: 'Lab utilization', v: 'Which lab, how many hours, which days' },
      { name: 'Exam report', v: 'Every seat, every gap, with its length' },
      { name: 'Inventory', v: 'How many machines, in which lab, on which version' },
    ],
    print: 'Ready to print',
  },

  how: {
    eyebrow: 'How it works',
    title: 'Three steps',
    steps: [
      {
        n: '01',
        title: 'Write the image',
        body: 'The image is ours. It is written to the machine, then a BIOS password and a fixed boot order go on. The password stays with you.',
      },
      {
        n: '02',
        title: 'The machine enrols itself',
        body: 'On first boot it finds the server and enrols. It appears in the console within 30 seconds. There is nothing to configure by hand.',
      },
      {
        n: '03',
        title: 'Run it from the console',
        body: 'The server runs inside the institution. Policy, modes, exams and reports come from a browser. The data does not leave the building.',
      },
    ],
  },

  cost: {
    eyebrow: 'Cost',
    title: 'What one machine costs for a year',
    lede: 'On the left, four separate products in three different units. On the right, one price.',
    them: {
      label: 'Abroad',
      big: '$241.66',
      bigSub: 'first year, per machine',
      extras: [
        { amount: '$41.67', label: 'each year after' },
        { amount: '+ $26.40', label: 'per user per year, Windows A3' },
        { amount: '+ $3,295', label: 'per institution per year, the exam software' },
      ],
    },
    us: {
      label: 'Hoaka',
      big: '$15',
      bigSub: 'per machine per year',
      note: 'The same every year. Everything on the left is included. Nothing is added.',
    },
    breakdownTitle: 'What the $241.66 is made of',
    rows: [
      { job: 'The operating system', prod: 'Windows 11 Pro', amt: '$199.99', per: 'once per machine' },
      { job: 'The machine comes back clean', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'per machine per year' },
      { job: 'The teacher controls the class', prod: 'LanSchool', amt: '$7.00', per: 'per machine per year' },
      { job: 'Lists, updates, exam-day support', prod: 'No line item', amt: '—', per: 'nobody sells it' },
    ],
    cta: 'The full comparison',
  },

  wallpapers: {
    eyebrow: 'Ships with the image',
    title: 'A lab is a place too',
    body: 'A managed machine does not have to be ugly. These four wallpapers come with the image.',
    alt: [
      'A white flower drawn in pixels on black',
      'A glowing violet flower in the dark',
      'Earth seen from orbit with a moon beside it',
      'A ring of light against a field of stars',
    ],
  },

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

  scope: {
    eyebrow: 'Limits',
    title: 'What Hoaka does not do',
    body: 'Better said up front. None of this is planned either.',
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
    eyebrow: 'The ask',
    title: 'Three universities. One lab each. This semester. Free.',
    body: 'One month, with a hard end date. Carrying on afterwards is your call.',
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

  footer: {
    tagline: 'A managed operating system for university computer labs.',
    madeIn: 'Built in Uzbekistan',
    rights: 'All rights reserved.',
    nav: 'Pages',
    contact: 'Contact',
    language: 'Language',
    status: 'Pilot stage — first lab October 2026',
  },
}
