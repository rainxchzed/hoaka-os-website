import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

type Tone = 'solid' | 'ghost' | 'quiet'

type Props = {
  to: string
  children: ReactNode
  tone?: Tone
  size?: 'md' | 'lg'
  className?: string
}

export function Button({ to, children, tone = 'solid', size = 'md', className }: Props) {
  const cls = [styles.btn, styles[tone], styles[size], className].filter(Boolean).join(' ')
  const isExternal = to.startsWith('http') || to.startsWith('mailto:')

  if (isExternal) {
    return (
      <a className={cls} href={to}>
        <span className={styles.label}>{children}</span>
      </a>
    )
  }

  return (
    <Link className={cls} to={to}>
      <span className={styles.label}>{children}</span>
    </Link>
  )
}
