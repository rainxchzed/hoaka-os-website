import { Hero } from '../sections/Hero'
import { Day } from '../sections/Day'
import { Reports } from '../sections/Reports'
import { Ledger } from '../sections/Ledger'
import { Dusk } from '../sections/Dusk'
import { Seam } from '../components/Seam'

export function Home() {
  return (
    <>
      <Hero />
      <Day />
      <Seam kind="dawn" />
      <Reports />
      <Ledger />
      <Dusk />
    </>
  )
}
