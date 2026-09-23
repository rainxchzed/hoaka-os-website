import styles from './Reports.module.css'

// October 2026 starts on a Thursday; Sundays stay empty.
const HOURS = [72, 81, 38, 0, 77, 69, 84, 75, 88, 41, 0, 79, 73, 90, 82, 71, 36, 0, 86, 78, 74, 91, 80, 44, 0, 83, 70, 87, 76, 68, 30]
const ROWS = ['A', 'B', 'C']
const SEATS = [1, 2, 3, 4, 5, 6, 7, 8]
const ROOMS = [
  ['101', '24', '1.4.2'],
  ['102', '24', '1.4.2'],
  ['204', '16', '1.4.1'],
]

function Lines({ widths }: { widths: number[] }) {
  return (
    <span className={styles.lines}>
      {widths.map((w, i) => (
        <span key={i} className={styles.line} style={{ width: `${w}%` }} />
      ))}
    </span>
  )
}

export function UsageSheet() {
  return (
    <>
      <svg className={styles.chart} viewBox="0 0 310 96" aria-hidden="true">
        {HOURS.map((h, i) =>
          h ? <rect key={i} x={i * 10 + 1.5} y={92 - h} width="7" height={h} rx="1.5" /> : null,
        )}
        <line x1="0" y1="92.5" x2="310" y2="92.5" />
      </svg>
      <Lines widths={[92, 76, 84]} />
    </>
  )
}

export function ExamSheet() {
  return (
    <>
      <span className={styles.seats} aria-hidden="true">
        {ROWS.flatMap((row) =>
          SEATS.map((seat) => {
            const id = `${row}${seat}`
            const state = id === 'B3' ? 'left' : id === 'C6' ? 'gone' : 'ok'
            return <span key={id} className={styles.seat} data-state={state} />
          }),
        )}
      </span>
      <span className={styles.log}>
        <span className={styles.logRow} data-state="left">
          <i />B3<b className="tabular">2:29</b>
        </span>
        <span className={styles.logRow} data-state="gone">
          <i />C6<b className="tabular">—</b>
        </span>
      </span>
    </>
  )
}

export function InventorySheet() {
  return (
    <span className={`tabular ${styles.rooms}`}>
      {ROOMS.map(([room, count, version]) => (
        <span key={room} className={styles.room}>
          <b>{room}</b>
          <span>{count}</span>
          <span>{version}</span>
        </span>
      ))}
      <span className={styles.room} data-total>
        <b>Σ</b>
        <span>64</span>
        <span />
      </span>
    </span>
  )
}
