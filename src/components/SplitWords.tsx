import { Fragment } from 'react'
import type { CSSProperties } from 'react'
import styles from './SplitWords.module.css'

type Props = {
  text: string
  /** Milliseconds before the first word moves. */
  delay?: number
  step?: number
  className?: string
}

/**
 * Wraps each word so the line can rise in sequence. The spaces stay outside the
 * masks, which clip anything inside them.
 */
export function SplitWords({ text, delay = 0, step = 52, className }: Props) {
  const words = text.split(' ')

  return (
    <span className={[styles.wrap, className].filter(Boolean).join(' ')}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className={styles.mask}>
            <span
              className={styles.word}
              style={{ '--word-delay': `${delay + i * step}ms` } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}
