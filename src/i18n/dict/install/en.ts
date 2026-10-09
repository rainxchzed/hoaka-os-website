import type { InstallGuide } from './types'

export const installEn: InstallGuide = {
  eyebrow: 'Install guide',
  title: 'Install Hoaka',
  lede: 'From the files we send to a lab of working computers. Plan about an hour for the server and the install stick, then a few minutes for each computer.',
  pick: {
    label: 'Your server computer',
    hint: 'The steps below follow your choice.',
    options: { windows: 'Windows 10 or 11', linux: 'Linux' },
    short: { windows: 'Windows', linux: 'Linux' },
  },
  noFiles: 'No files yet?',
  noFilesCta: 'Ask for the free three months',
  contents: 'On this page',
  need: {
    id: 'before',
    title: 'Before you start',
    items: [
      {
        k: 'A server computer',
        v: {
          windows: 'Windows 10 or 11, 64-bit, with 40 GB free. It stays on all day.',
          linux: 'A 64-bit Linux with systemd and 40 GB free. It stays on all day.',
        },
      },
      {
        k: 'A fixed address for it',
        v: 'Wire it to the lab network and ask IT to reserve its address in the router. Lab computers find the server by that address.',
      },
      {
        k: 'The lab computers',
        v: '64-bit, able to start from a USB stick, each on the network by cable. Their disks are erased.',
      },
      { k: 'A USB stick', v: '16 GB or more, and balenaEtcher, free at balena.io/etcher.' },
      {
        k: 'The files we send',
        v: {
          windows: 'The server, hoaka-server-windows-amd64.exe, and the lab system, a .zip file. The links work for 7 days.',
          linux: 'The server, hoaka-server-linux-amd64, and the lab system, a .zip file. The links work for 7 days.',
        },
      },
      {
        k: 'The network',
        v: 'Teachers reach the server on port 8080 and lab computers on 8443. Keep both on the staff network, never open to the internet.',
      },
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
            'If Windows says "Windows protected your PC", press [[More info]], then [[Run anyway]]. Press [[Yes]] when it asks to make changes.',
            'A window shows the install. The server now starts with the computer and opens its two ports in Windows Firewall.',
            'The setup page opens in your browser. The window stays open until you press Enter.',
          ],
          linux: [
            'Open a terminal in the folder with the file and run:',
            { run: 'chmod +x hoaka-server-linux-amd64' },
            { run: 'sudo ./hoaka-server-linux-amd64 -install' },
            'The server copies itself to `/usr/local/bin/hoaka-server`, now starts with the computer and opens its two ports in the firewall.',
            'Open the link it prints after `Finish in the browser`.',
          ],
        },
        'Keep what it prints: the address teachers open, `http://…:8080/`, and the server key. Each lab computer shows that key when you name it.',
      ],
    },
    {
      id: 'setup',
      title: 'Set up the server',
      lines: [
        'On the setup page, fill in [[University name]], [[Your name]] and a [[Password]] of 8 characters or more. The [[Setup code]] comes filled in from the link.',
        'Press [[Set up and sign in]]. From now on you sign in as `admin` with that password.',
      ],
      aside: [
        {
          windows: [
            'Closed the page before finishing? Open Command Prompt as administrator and run this for a new link:',
            { run: '"C:\\Program Files\\Hoaka\\hoaka-server.exe" -setup-code' },
          ],
          linux: ['Closed the page before finishing? Run this for a new link:', { run: 'sudo hoaka-server -setup-code' }],
        },
      ],
    },
    {
      id: 'licence',
      title: 'Load the free licence',
      where: ['Settings', 'Licence'],
      lines: [
        'Press [[Try free for 3 months]].',
        'Type how many computers to try it on, then press [[Send by email]]. The request goes to licence@hoakaos.com. With no mail program, press [[Copy]] and paste it into an email to that address.',
        'We answer with a licence file. Press [[Choose the licence file]], pick it, then [[Load]].',
      ],
      aside: ['Nothing works until a licence is loaded: the server takes no changes, and lab computers that join stay locked.'],
    },
    {
      id: 'rooms',
      title: 'Add the rooms',
      where: ['Rooms'],
      lines: [
        'Press [[Create room]] once for each lab, for example "Lab 204".',
        'Computers take their names from the room: computer 7 in Lab 204 becomes lab-204-07.',
      ],
    },
    {
      id: 'stick',
      title: 'Make the install stick',
      where: ['Settings', 'Lab computers', 'Lab installer'],
      lines: [
        {
          windows: [
            'Do this step on the server computer: the file is large, and there it never crosses the network.',
            'Right-click the lab system .zip and choose [[Extract All]]. Inside is a .raw file of about 7.5 GB.',
          ],
          linux: [
            'Do this step on a computer that opens the console. On the server itself, if it has a desktop, the large file never crosses the network.',
            'Unpack the lab system. Inside is a .raw file of about 7.5 GB.',
            { run: 'unzip hoaka_*.zip' },
          ],
        },
        'Press [[Choose the file]] and pick the .raw file. Wait until the upload reaches 100%.',
        "If the card says [[This PC's address can change]], ask IT to reserve the address it shows before you go on.",
        'Press [[Download lab installer]]. You get one .img file.',
        'In balenaEtcher: [[Flash from file]] and pick the .img, [[Select target]] and pick the stick, then [[Flash!]]. Everything on the stick is erased.',
      ],
      aside: ['The stick carries your university\'s enrolment token. Keep it like a key, and give it only to whoever sets up computers.'],
    },
    {
      id: 'computers',
      title: 'Install each lab computer',
      lines: [
        'In the BIOS or UEFI settings (often F2, F1 or Del as it starts), turn off [[Secure Boot]] and [[CSM]], also called Legacy boot. Set a BIOS password while you are there, so nobody starts it from another stick. Save and exit.',
        'Plug in the stick, start the computer, open the boot menu (often F12, F11, F9 or Esc) and choose the stick.',
        'On [[Install Hoaka on this computer]], choose the computer\'s own disk, press [[Install]], then [[Erase and install]]. Everything on that disk is erased.',
        'When it says Hoaka is installed, pull out the stick. The computer restarts by itself.',
        'On [[Name this computer]], choose the [[Room]], type the [[Computer number]] and press [[Continue]]. Check that the [[Server key]] at the bottom matches the one the server printed, then press [[Confirm]].',
        'The desktop appears, and the computer shows under [[Devices]] in the console. Take the stick to the next one.',
      ],
      aside: ['A computer that had Hoaka before offers [[Install and keep the name]]. It keeps its name, room, licence seat and installed programs.'],
    },
  ],
  run: {
    id: 'run',
    title: 'Running the lab',
    items: [
      { k: 'Rooms', v: 'Switch a room between Open, Lecture and Exam, and send a page to every screen.' },
      { k: 'Exams', v: 'Start an exam with your exam page\'s link. Its computers open only that page until it ends.' },
      { k: 'People', v: 'Add teacher accounts and give each one their rooms.' },
      { k: 'Updates', v: 'New versions arrive by themselves. Settings › Updates says when the lab computers take one, and nothing installs during an exam.' },
    ],
  },
  copy: 'Copy',
  copied: 'Copied',
  help: {
    title: 'Something not as described?',
    body: 'Send us a photo of the screen and the step you were on, and we will help you finish.',
  },
}
