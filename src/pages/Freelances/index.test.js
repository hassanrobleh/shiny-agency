import React from 'react'
import { rest } from 'msw'
import '@testing-library/jest-dom/extend-expect'
import { setupServer } from 'msw/node'
import { waitForElementToBeRemoved, screen } from '@testing-library/react'
import { render } from '../../utils/test'
import Freelances from './'

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

// const server = setupServer(
// On precise ici l'url qu'il faudra intercepter
// rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
// Là, on va pouvoir passer les datas mockées dans ce qui est retourné en json
//     return res(ctx.json({ freelancersList: freelancersMockedData }))
//   })
// )

const server = setupServer(
  rest.get('http://localhost:8000/freelances', (req, res, ctx) => {
    return res(ctx.json({ freelancersList: freelancersMockedData }))
  })
)

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// Activer la simulation d'API avant le tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display freelances names', async () => {
  render(<Freelances />)

  // screen.getByTestId('loader')
  // expect(screen.queryByTestId('loader')).toBeDefined()

  await waitForElementToBeRemoved(() => screen.getByTestId('loader'))

  // await waitFor(() => {
  expect(screen.getByText('Harry Potter')).toBeInTheDocument()
  expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
  expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
  // })
})

// it('Should display freelancers names after loader is removed', async () => {
//   render(<Freelances />)

// await waitForElementToBeRemoved(() => screen.getByTestId('loader'))
// await waitFor(() => {
// expect(screen.getByText('Harry Potter')).toBeInTheDocument()
// expect(screen.getByText('Hermione Granger')).toBeInTheDocument()
// expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
// })
// })
