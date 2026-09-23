import styles from './Seam.module.css'

// rise: sky into night; dawn: night into day; nightfall: day into the dusk sky;
// settle: sky into the footer; dusk: day into the footer.
type Kind = 'rise' | 'dawn' | 'nightfall' | 'settle' | 'dusk'

export function Seam({ kind, at = 'flow' }: { kind: Kind; at?: 'flow' | 'top' | 'bottom' }) {
  return <div className={styles.seam} data-kind={kind} data-at={at} aria-hidden="true" />
}
