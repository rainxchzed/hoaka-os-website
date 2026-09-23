import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@fontsource-variable/montserrat'
import '@fontsource-variable/onest'
import './styles/tokens.css'
import './styles/base.css'
import { App } from './App'

const container = document.getElementById('root')

if (container) {
  document.documentElement.setAttribute('data-js', '')

  const tree = (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  )

  if (container.firstElementChild) {
    hydrateRoot(container, tree)
  } else {
    createRoot(container).render(tree)
  }
}
