import { Hero } from '../sections/Hero'
import { Day } from '../sections/Day'
import { Reports } from '../sections/Reports'
import { Ledger } from '../sections/Ledger'
import { Limits } from '../sections/Limits'
import { Dusk } from '../sections/Dusk'

export function Home() {
  return (
    <>
      <Hero />
      <Day />
      <Reports />
      <Ledger />
      <Limits />
      <Dusk />
    </>
  )
}
