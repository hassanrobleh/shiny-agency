import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'
import Home from './'

describe('The Home Component', () => {
  it('Should render title', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>
    )
    screen.getByRole('heading', {
      level: 2,
      text: `Repérez vos besoins, on s'occupe du reste, avec les meilleurs talents`,
    })
    // screen.debug()
  })
})
