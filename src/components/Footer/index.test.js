import Footer from './'
import { render } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

describe('Footer', () => {
  it('should render without crash', async () => {
    render(
      <ThemeProvider>
        <Footer />
      </ThemeProvider>
    )
  })
})
