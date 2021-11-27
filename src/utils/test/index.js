import { render as rtlRender } from '@testing-library/react'
import { ThemeProvider, SurveyProvider } from '../context'
import { MemoryRouter } from 'react-router-dom'

function Wrapper({ chidren }) {
  return (
    <MemoryRouter>
      <ThemeProvider>
        <SurveyProvider>{chidren}</SurveyProvider>
      </ThemeProvider>
    </MemoryRouter>
  )
}

export function render(ui) {
  rtlRender(ui, { wrapper: Wrapper })
}
