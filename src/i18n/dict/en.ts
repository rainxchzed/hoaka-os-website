import type { Dict } from './uz'

export const en: Dict = {
  meta: {
    home: {
      title: 'Hoaka OS — an operating system for universities',
      description:
        'An operating system built for university computer labs. It gives the university, its teachers and its students what a lab actually needs, and helps students focus on research, lectures and exams.',
    },
    pricing: {
      title: 'Pricing — Hoaka OS',
      description:
        '$15 per machine per year. Abroad, the same set of tools costs $241.66 per machine in the first year.',
    },
    pilot: {
      title: 'Free pilot — Hoaka OS',
      description:
        'The first month is free. We come to your university, install Hoaka on one lab ourselves, stay on hand for the month and fix anything that breaks. Then you decide whether to carry on.',
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
    skip: 'Skip to content',
  },

  hero: {
    title: 'An operating system for universities',
    lede: 'Hoaka gives the university, its teachers and its students what a computer lab actually needs, and it helps students keep their minds on the work they came for: research, lectures and exams.',
    primary: 'Start a pilot',
    secondary: 'How the free month works',
  },

  day: {
    heading: 'One day in a lab, 07:58 to 17:30',
    steps: [
      {
        id: 'boot',
        time: '07:58',
        title: 'Every machine starts from the same clean system',
      },
      {
        id: 'open',
        time: '09:00',
        title: 'Research works. Distractions don’t.',
      },
      {
        id: 'lecture',
        time: '11:00',
        title: 'One page on every screen',
      },
      {
        id: 'exam',
        time: '14:00',
        title: 'One locked page, and a record of every seat',
      },
      {
        id: 'logout',
        time: '17:30',
        title: 'The machine forgets the day',
      },
    ],
    labels: {
      interrupted: 'Interrupted · 2m 29s',
      noContact: 'No contact',
      blocked: 'Blocked site',
    },
  },

  reports: {
    title: 'Once a month, a report ready for the rector',
    body: 'Each report carries the university’s name and the period it covers, and prints straight from the browser in Uzbek, Russian or English.',
    items: [
      { name: 'Lab usage', v: 'Which lab was in use, on which days, for how many hours' },
      { name: 'Exam report', v: 'Every seat, every gap, with its length' },
      { name: 'Inventory', v: 'How many machines, in which lab, on which version' },
    ],
  },

  ledger: {
    title: 'What one machine costs for a year',
    figures: { abroad: '$241.66', after: '$41.67', exam: '$3,295', ours: '$15' },
    rows: [
      { job: 'The operating system', prod: 'Windows 11 Pro', amt: '$199.99', per: 'once' },
      { job: 'The machine comes back clean', prod: 'Deep Freeze Cloud', amt: '$34.67', per: 'a year' },
      { job: 'The teacher controls the class', prod: 'LanSchool', amt: '$7.00', per: 'a year' },
      { job: 'Lists, updates, exam-day support', prod: 'Nobody sells it', amt: '—', per: '' },
    ],
    source: 'Prices read from the vendors’ own pages on 15 September 2026, published for North America. An indicator, not a quote.',
  },

  offer: {
    eyebrow: 'Pilot',
    title: 'The first month is on us',
    body: 'Every university starts with a free month in one of its labs. We come and install Hoaka ourselves. While your teachers and students use the lab as usual, we stay on hand, and if something breaks, we fix it. At the end of the month you decide whether to carry on.',
    days: { start: 'Day 1', end: 'Day 30' },
    points: [
      { k: 'We install it', v: 'One day on site. We set up the lab machines and the server ourselves.' },
      { k: 'We stay on hand', v: 'For the whole month. Anything that breaks is ours to fix.' },
      { k: 'You decide', v: 'You get the three reports and choose what happens next.' },
    ],
    price: 'After the pilot, Hoaka costs several times less than the same set of tools bought abroad.',
    priceLink: 'Pricing',
    cta: 'Start a pilot',
  },

  cta: {
    title: 'Let’s talk about your lab',
    body: 'Tell us a little about it and we will reply within two working days.',
    primary: 'Write to us',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'One price per machine',
    lede: '$15 per machine per year. Quoted per lab, in US dollars.',
    tiersTitle: 'By lab size',
    calc: {
      label: 'Machines in your lab',
      ours: 'Hoaka',
      abroadFirst: 'Abroad, first year',
      abroadAfter: 'Abroad, every year after',
      note: 'The abroad figures include the exam software. An indicator, not a quote.',
    },
    tiers: [
      { count: '25 machines', price: '$375', note: 'a year' },
      { count: '50 machines', price: '$750', note: 'a year' },
      { count: '100 machines', price: '$1,500', note: 'a year' },
    ],
    includedTitle: 'What the price covers',
    included: [
      {
        k: 'Reset',
        v: 'A student’s folder is wiped and rebuilt at logout. The system disk resets at every boot. Nothing a student installs survives.',
      },
      {
        k: 'Reimaging',
        v: 'Reinstalling is rare, because the machine restores itself at every boot. When it is needed, we supply the image and the machine configures itself. Today this is done at the machine; over the network is planned.',
      },
      {
        k: 'Updates',
        v: 'We build and test the new versions. For now an update means writing a new image; updating in place is planned.',
      },
      {
        k: 'Site lists',
        v: 'The regional blocklist and the academic allowlist are ours to keep current, not your IT staff’s.',
      },
      {
        k: 'Exam day',
        v: 'Every exam gets a seat map and a log of what each seat did.',
      },
      {
        k: 'The console',
        v: 'Access rules, labs, machines, reports and the audit log, all in a browser. No charge per administrator.',
      },
    ],
    excludedTitle: 'Not included',
    excluded: ['Hardware', 'Internet', 'The exam platform', 'Electrical or building work'],
    openTitle: 'To agree before signing',
    openBody: 'We left these blank on purpose and will fill them in with you.',
    open: [
      'Response time during an exam, and on an ordinary day',
      'Contract length and how either side ends it',
      'The minimum machine: memory, processor, network',
      'What happens when the pilot ends',
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
    title: 'A free month in one of your labs',
    lede: 'We come to your university, install Hoaka on one lab ourselves and stay on hand for the whole month, fixing anything that breaks. The end date is set in advance, and then you decide whether to carry on.',
    stepsTitle: 'How it goes',
    steps: [
      { n: '01', k: 'A conversation', v: 'Half an hour. We look at your lab and your machines.' },
      { n: '02', k: 'Setup', v: 'One day on site. We write the system to the machines, set up the server and set the BIOS passwords with you.' },
      { n: '03', k: 'A month of use', v: 'Teachers and students use the lab as usual. We stay on hand and fix anything that breaks.' },
      { n: '04', k: 'Reports and decision', v: 'You get all three reports and decide whether to carry on.' },
    ],
    ready: {
      title: 'Before we come',
      lede: 'With these ready, setup takes one day.',
      items: [
        { k: 'The machines', v: 'Lab computers owned by the university' },
        { k: 'Network', v: 'A wired network with DHCP and an internet uplink' },
        { k: 'A host for the server', v: 'The management server runs on your premises' },
        { k: 'BIOS passwords', v: 'We set them together and the password stays with you' },
        { k: 'A named contact', v: 'One person we can reach' },
      ],
    },
    formTitle: 'Get in touch',
    formBody: 'Fill in the form and we will reply within two working days.',
    fields: {
      name: 'Name',
      role: 'Role',
      org: 'University',
      email: 'Email',
      phone: 'Phone',
      machines: 'Machines in the lab',
      message: 'Anything else',
      messagePlaceholder: 'Anything about the lab we should know',
    },
    submit: 'Send',
    orEmail: 'Or write to us directly',
    required: 'required',
    sent: {
      title: 'One more step',
      body: 'Your mail program should open with the message ready. Send it from there. If it did not open, write to us directly at the address on this page.',
    },
  },

  notFound: 'Page not found',
  footer: {
    tagline: 'A managed operating system for university computer labs.',
    rights: 'All rights reserved.',
    nav: 'Pages',
    contact: 'Contact',
    language: 'Language',
  },
}
