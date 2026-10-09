import { Hero } from '../sections/Hero'
import { Day } from '../sections/Day'
import { Reports } from '../sections/Reports'
import { Screens } from '../sections/Screens'
import { Offer } from '../sections/Offer'
import { Dusk } from '../sections/Dusk'
import { Seam } from '../components/Seam'

export function Home() {
  return (
    <>
      <Hero />
      <Day />
      <Seam kind="dawn" />
      <Screens />
      <Reports />
      <Offer />
      <Dusk />
    </>
  )
}
