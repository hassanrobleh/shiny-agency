import { rest } from 'react'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import Freelances from './'
import { ThemeProvider } from '../../utils/context'

const freelancersMockedData = [
    {
        name: 'Harry Potter',
        job: 'Magicien frontend',
        picture: '',
    },
    {
        name: 'Hermione Granger',
        job: 'Magicienne fullstack',
        picture: '',
    },
]

const server = setupServer(
  // On precise ici l'url qu'il faudra intercepter
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    // Là, on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return res(ctx.json({freelancesList: freelancersMockedData}))
  })
)

// Activer la simulation d'API avant le tests depuis server
beforeAll(() => server.listen())

// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())

// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())


it('Should display freelances names', async () => {
  render(
    <ThemeProvider>
      <Freelances />
    </ThemeProvider>
  )

  screen.getByTestId('loader')
  // expect(screen.getByTestId('loader')).toBeTruthy()

  
  // await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
  await waitFor(() => {
    expect(screen.getByTest('Harry Potter')).toBeTruthy()
    expect(screen.getByText('Hermione Granger')).toBeTruthy()
  })
})


