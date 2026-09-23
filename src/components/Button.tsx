import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

type Props = {
  to: string
  children: ReactNode
  tone?: 'solid' | 'link'
  className?: string
}

export function Button({ to, children, tone = 'solid', className }: Props) {
  const cls = [tone === 'solid' ? styles.btn : styles.link, className].filter(Boolean).join(' ')
  const body = (
    <>
      <span>{children}</span>
      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </>
  )

  if (to.startsWith('mailto:') || to.startsWith('http')) {
    return (
      <a className={cls} href={to}>
        {body}
      </a>
    )
  }
  return (
    <Link className={cls} to={to}>
      {body}
    </Link>
  )
}
