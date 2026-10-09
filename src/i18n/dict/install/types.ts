export type Server = 'windows' | 'linux'

export type Varies<T> = { windows: T; linux: T }

// In text, [[Label]] is a word on a screen or a button, and `code` is a file name or command.
export type Line = string | { run: string }

export type Entry = Line | Varies<Line[]>

export type InstallStep = {
  id: string
  title: string
  where?: string[]
  lines: Entry[]
  aside?: Entry[]
}

export type InstallGuide = {
  title: string
  lede: string
  pick: { label: string; options: Record<Server, string>; short: Record<Server, string> }
  noFiles: string
  noFilesCta: string
  contents: string
  need: { id: string; title: string; items: { k: string; v: string | Varies<string> }[] }
  steps: InstallStep[]
  run: { id: string; title: string; items: { k: string; v: string }[] }
  copy: string
  copied: string
  help: { title: string; body: string }
}
