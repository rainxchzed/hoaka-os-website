import { Hero } from '../sections/Hero'
import { Decay } from '../sections/Decay'
import { Clean } from '../sections/Clean'
import { Policy } from '../sections/Policy'
import { Exam } from '../sections/Exam'
import { Teacher } from '../sections/Teacher'
import { Reports } from '../sections/Reports'
import { HowItWorks } from '../sections/HowItWorks'
import { Cost } from '../sections/Cost'
import { Wallpapers } from '../sections/Wallpapers'
import { Requirements } from '../sections/Requirements'
import { Scope } from '../sections/Scope'
import { FinalCta } from '../sections/FinalCta'

export function Home() {
  return (
    <>
      <Hero />
      <Decay />
      <Clean />
      <Policy />
      <Exam />
      <Teacher />
      <Reports />
      <HowItWorks />
      <Cost />
      <Wallpapers />
      <Requirements />
      <Scope />
      <FinalCta />
    </>
  )
}
