import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import styles from './SectionHead.module.css'

type Props = {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'start' | 'center'
  /** The first head on a page is its `h1`; every later one stays an `h2`. */
  level?: 1 | 2
  children?: ReactNode
}

export function SectionHead({ eyebrow, title, lede, align = 'start', level = 2, children }: Props) {
  return (
    <header className={styles.head} data-align={align}>
      {eyebrow ? (
        <Reveal as="p" className="eyebrow">
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal as={level === 1 ? 'h1' : 'h2'} delay={70} className={styles.title}>
        {title}
      </Reveal>
      {lede ? (
        <Reveal as="p" delay={140} className={`lede ${styles.lede}`}>
          {lede}
        </Reveal>
      ) : null}
      {children}
    </header>
  )
}
