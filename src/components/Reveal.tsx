import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../lib/useInView'
import styles from './Reveal.module.css'

type Props = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  as?: ElementType
  delay?: number
  /** `rise` lifts from below, `fade` stays put, `wipe` reveals left to right. */
  variant?: 'rise' | 'fade' | 'wipe'
  amount?: number
}

export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
  className,
  amount = 0.2,
  style,
  ...rest
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>({ amount })

  return (
    <Tag
      ref={ref}
      data-shown={inView ? '' : undefined}
      style={{ '--reveal-delay': `${delay}ms`, ...style } as CSSProperties}
      className={[styles.reveal, styles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  )
}
