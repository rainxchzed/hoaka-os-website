import { Fragment, useEffect, useMemo, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Check, ChevronRight, Copy } from 'lucide-react'
import { useI18n } from '../i18n'
import { CONTACT } from '../lib/contact'
import { Seam } from '../components/Seam'
import { Button } from '../components/Button'
import type { Entry, Line, Server, Varies } from '../i18n/dict/install/types'
import styles from './Install.module.css'

const SERVERS: readonly Server[] = ['windows', 'linux']
const REMEMBER = 'hoaka-install-server'
const MARK = /(\[\[.+?\]\]|`[^`]+`)/g

function isPair(entry: Entry): entry is Varies<Line[]> {
  return typeof entry === 'object' && 'windows' in entry
}

function textFor(value: string | Varies<string>, server: Server): string {
  return typeof value === 'string' ? value : value[server]
}

function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(MARK).map((part, i) => {
        if (part.startsWith('[[') && part.endsWith(']]')) {
          return (
            <span key={i} className={styles.ui}>
              {part.slice(2, -2)}
            </span>
          )
        }
        if (part.length > 1 && part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className={styles.code}>
              {part.slice(1, -1)}
            </code>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function Command({ cmd }: { cmd: string }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 1800)
    return () => window.clearTimeout(id)
  }, [copied])

  // Where the clipboard is refused, the command stays selectable by hand.
  const copy = () => {
    navigator.clipboard?.writeText(cmd).then(
      () => setCopied(true),
      () => undefined,
    )
  }

  return (
    <div className={styles.cmd}>
      <code className={styles.cmdText}>{cmd}</code>
      <button type="button" className={styles.copy} onClick={copy}>
        {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
        <span className={styles.copyLabel} aria-live="polite">
          {copied ? t.install.copied : t.install.copy}
        </span>
      </button>
    </div>
  )
}

function Lines({ entries, server, className }: { entries: Entry[]; server: Server; className: string }) {
  return (
    <ol className={className}>
      {entries.flatMap((entry, i) =>
        isPair(entry)
          ? entry[server].map((line, j) => <Item key={`${server}-${i}-${j}`} line={line} swapped />)
          : [<Item key={i} line={entry} />],
      )}
    </ol>
  )
}

function Item({ line, swapped }: { line: Line; swapped?: boolean }) {
  const run = typeof line !== 'string'
  return (
    <li className={styles.line} data-run={run ? '' : undefined} data-swap={swapped ? '' : undefined}>
      {run ? <Command cmd={line.run} /> : <Rich text={line} />}
    </li>
  )
}

function Picker({ server, onPick, compact }: { server: Server; onPick: (s: Server) => void; compact?: boolean }) {
  const { t } = useI18n()

  const onKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return
    event.preventDefault()
    const next = server === 'windows' ? 'linux' : 'windows'
    onPick(next)
    event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]')[SERVERS.indexOf(next)]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.install.pick.label}
      className={styles.picker}
      data-compact={compact ? '' : undefined}
      data-at={server}
      onKeyDown={onKey}
    >
      <span className={styles.thumb} aria-hidden="true" />
      {SERVERS.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={server === s}
          tabIndex={server === s ? 0 : -1}
          className={styles.option}
          onClick={() => onPick(s)}
        >
          {compact ? t.install.pick.short[s] : t.install.pick.options[s]}
        </button>
      ))}
    </div>
  )
}

export function Install() {
  const { t, href } = useI18n()
  const g = t.install
  const [server, setServer] = useState<Server>('windows')

  const index = useMemo(
    () => [
      { id: g.need.id, n: '', title: g.need.title },
      ...g.steps.map((step, i) => ({ id: step.id, n: String(i + 1).padStart(2, '0'), title: step.title })),
      { id: g.run.id, n: '', title: g.run.title },
    ],
    [g],
  )
  const [active, setActive] = useState(index[0].id)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(REMEMBER)
      if (saved === 'windows' || saved === 'linux') setServer(saved)
    } catch {
      // A private window or blocked storage starts on the first choice every time.
    }
  }, [])

  // A link to one step lands on it, after ScrollReset has taken the page to the top.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const seen = new IntersectionObserver(
      (records) => {
        for (const record of records) if (record.isIntersecting) setActive(record.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const { id } of index) {
      const el = document.getElementById(id)
      if (el) seen.observe(el)
    }
    return () => seen.disconnect()
  }, [index])

  const pick = (next: Server) => {
    setServer(next)
    try {
      window.localStorage.setItem(REMEMBER, next)
    } catch {
      // Nothing to keep it in; the choice still holds for this visit.
    }
  }

  return (
    <>
      <header className={styles.top} data-deep>
        <div className="shell">
          <h1 className="h-2xl">{g.title}</h1>
          <p className={`lede ${styles.lede}`}>{g.lede}</p>
          <div className={styles.choose}>
            <span className={styles.chooseLabel}>{g.pick.label}</span>
            <Picker server={server} onPick={pick} />
          </div>
          <p className={styles.noFiles}>
            <span>{g.noFiles}</span>
            <Button to={href('pilot')} tone="link">
              {g.noFilesCta}
            </Button>
          </p>
        </div>
      </header>
      <Seam kind="dawn" />

      <section className="section">
        <div className={`shell ${styles.layout}`}>
          <aside className={styles.rail}>
            <div className={styles.railPick}>
              <Picker server={server} onPick={pick} compact />
            </div>
            <nav className={styles.index} aria-label={g.contents}>
              <ol>
                {index.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className={styles.indexLink}
                      aria-current={active === entry.id ? 'location' : undefined}
                    >
                      <span className={`tabular ${styles.indexN}`}>{entry.n}</span>
                      <span>{entry.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className={styles.flow}>
            <section id={g.need.id} className={styles.block}>
              <h2 className={styles.blockTitle}>{g.need.title}</h2>
              <ul className={styles.need}>
                {g.need.items.map((item) => (
                  <li key={item.k} className={styles.needItem}>
                    <span className={styles.box} aria-hidden="true" />
                    <span className={styles.needText}>
                      <strong>{item.k}</strong>
                      <span
                        key={typeof item.v === 'string' ? 'same' : server}
                        data-swap={typeof item.v === 'string' ? undefined : ''}
                      >
                        {textFor(item.v, server)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {g.steps.map((step, i) => (
              <section key={step.id} id={step.id} className={styles.step}>
                <span className={`tabular ${styles.n}`}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.stepBody}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  {step.where ? (
                    <p className={styles.where}>
                      {step.where.map((part, j) => (
                        <Fragment key={part}>
                          {j ? <ChevronRight size={14} aria-hidden="true" /> : null}
                          <span>{part}</span>
                        </Fragment>
                      ))}
                    </p>
                  ) : null}
                  <Lines entries={step.lines} server={server} className={styles.lines} />
                  {step.aside ? (
                    <div className={styles.aside}>
                      <Lines entries={step.aside} server={server} className={styles.asideLines} />
                    </div>
                  ) : null}
                </div>
              </section>
            ))}

            <section id={g.run.id} className={styles.block}>
              <h2 className={styles.blockTitle}>{g.run.title}</h2>
              <dl className={styles.run}>
                {g.run.items.map((item) => (
                  <div key={item.k} className={styles.runItem}>
                    <dt>{item.k}</dt>
                    <dd>{item.v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className={styles.help}>
              <h2 className={styles.helpTitle}>{g.help.title}</h2>
              <p>{g.help.body}</p>
              <div className={styles.helpLinks}>
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}>{CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
