import type { InstallGuide } from './types'

export const installEn: InstallGuide = {
  title: 'Install Hoaka',
  lede: 'About an hour for the server and the install stick, then a few minutes for each computer.',
  pick: {
    label: 'Your server computer',
    options: { windows: 'Windows 10 or 11', linux: 'Linux' },
    short: { windows: 'Windows', linux: 'Linux' },
  },
  noFiles: 'No files yet?',
  noFilesCta: 'Ask for the free three months',
  contents: 'Steps',
  need: {
    id: 'before',
    title: 'Before you start',
    items: [
      {
        k: 'A server computer',
        v: {
          windows: '64-bit, 40 GB free, on all day.',
          linux: '64-bit with systemd, 40 GB free, on all day.',
        },
      },
      { k: 'A fixed address for it', v: 'Wired to the lab network. Ask IT to reserve its address in the router.' },
      { k: 'The lab computers', v: '64-bit, able to start from a USB stick, each on the network by cable. Their disks are erased.' },
      { k: 'A USB stick', v: '16 GB or more, and balenaEtcher, free at balena.io/etcher.' },
      {
        k: 'The files we send',
        v: {
          windows: 'hoaka-server-windows-amd64.exe and the lab system as a .zip. The links work for 7 days.',
          linux: 'hoaka-server-linux-amd64 and the lab system as a .zip. The links work for 7 days.',
        },
      },
      { k: 'The network', v: 'Ports 8080 for teachers and 8443 for lab computers, on the staff network only, never open to the internet.' },
    ],
  },
  steps: [
    {
      id: 'server',
      title: 'Install the server',
      lines: [
        {
          windows: [
            'Double-click `hoaka-server-windows-amd64.exe`.',
            'If Windows says "Windows protected your PC": [[More info]], then [[Run anyway]], then [[Yes]].',
          ],
          linux: [
            'In a terminal, in the folder with the file:',
            { run: 'chmod +x hoaka-server-linux-amd64' },
            { run: 'sudo ./hoaka-server-linux-amd64 -install' },
            "Open the link it prints after `Finish in the browser`. From another computer, put the server's address in place of `localhost`.",
          ],
        },
        'Note the console address, `http://…:8080/`, and the server key it prints.',
      ],
    },
    {
      id: 'setup',
      title: 'Set up the server',
      lines: ['Fill in [[University name]], [[Your name]] and [[Password]], then press [[Set up and sign in]].'],
      aside: [
        {
          windows: [
            'Closed the page too early? In a Command Prompt opened as administrator:',
            { run: '"C:\\Program Files\\Hoaka\\hoaka-server.exe" -setup-code' },
          ],
          linux: ['Closed the page too early?', { run: 'sudo hoaka-server -setup-code' }],
        },
      ],
    },
    {
      id: 'licence',
      title: 'Load the free licence',
      where: ['Settings', 'Licence'],
      lines: [
        'Press [[Try free for 3 months]], type how many computers, then [[Send by email]].',
        'We answer with a licence file: [[Choose the licence file]], then [[Load]].',
      ],
    },
    {
      id: 'rooms',
      title: 'Add the rooms',
      where: ['Rooms'],
      lines: ['Press [[Create room]] once for each lab, for example "Lab 204".'],
    },
    {
      id: 'stick',
      title: 'Make the install stick',
      where: ['Settings', 'Lab computers', 'Lab installer'],
      lines: [
        {
          windows: [
            'On the server computer, so the large file stays off the network.',
            'Right-click the .zip, then [[Extract All]].',
          ],
          linux: [
            'On the server if it has a desktop, so the large file stays off the network.',
            { run: 'unzip hoaka_*.zip' },
          ],
        },
        'Press [[Choose the file]] and pick the .raw file.',
        'Press [[Download lab installer]].',
        'In balenaEtcher: [[Flash from file]] with the .img, [[Select target]] with the stick, then [[Flash!]]. It erases the stick.',
      ],
    },
    {
      id: 'computers',
      title: 'Install each lab computer',
      lines: [
        'In the BIOS or UEFI settings (often F2, F1 or Del at power-on): turn off [[Secure Boot]] and [[CSM]], and set a BIOS password so nobody starts it from another stick.',
        'Plug in the stick and choose it in the boot menu (often F12, F11, F9 or Esc).',
        'Choose the computer\'s own disk, then [[Install]] and [[Erase and install]].',
        'Pull out the stick when it says so.',
        'Choose the [[Room]], type the [[Computer number]], then [[Continue]]. Check that the [[Server key]] matches the one the server printed, then [[Confirm]].',
        'It shows up under [[Devices]] in the console. On to the next computer.',
      ],
    },
  ],
  run: {
    id: 'run',
    title: 'Running the lab',
    items: [
      { k: 'Rooms', v: 'Switch a room between Open, Lecture and Exam, and send a page to every screen.' },
      { k: 'Exams', v: 'Start one with your exam page\'s link. Its computers open only that page until it ends.' },
      { k: 'People', v: 'Add teacher accounts and give each one their rooms.' },
      { k: 'Updates', v: 'New versions arrive by themselves, never during an exam.' },
    ],
  },
  alt: {
    setup: 'The setup page',
    licence: 'The Licence page with the free trial request',
    'create-room': 'The Create room dialog',
    installer: 'The Lab installer card',
    'installer-disk': "The installer's disk choice",
    name: 'The naming screen',
    enrolled: 'A new computer under Devices',
  },
  copy: 'Copy',
  copied: 'Copied',
  help: {
    title: 'Stuck?',
    body: 'Send a photo of the screen and the step number.',
  },
}
