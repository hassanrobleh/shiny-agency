// import { useState, useEffect } from 'react'
// import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import Card from '../../components/Card'
// import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch, useTheme } from '../../utils/hooks'
// CardsContainer
const ContainerCard = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
`

const PageTitle = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => (theme === 'ligth' ? '#000000' : '#ffffff')};
  text-align: center;
  padding-bottom: 30px;
`
const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => (theme === 'ligth' ? '#000000' : '#ffffff')};
  font-weight: 300;
  text-align: center;
  padding-bottom: 30px;
`

// const freelances = [
//   {
//     name: 'Jane Doe',
//     jobTitle: 'Devops',
//     picture: DefaultPicture,
//   },
//   {
//     name: 'John Doe',
//     jobTitle: 'Developpeur frontend',
//     picture: DefaultPicture,
//   },
//   {
//     name: 'Jeanne Biche',
//     jobTitle: 'Développeuse Fullstack',
//     picture: DefaultPicture,
//   },
//   {
//     name: 'Robleh Hassan',
//     jobTitle: 'Développeuse Fullstack',
//     picture: DefaultPicture,
//   },
// ]

export default function Freelances() {
  // const [freelances, setFreelances] = useState([])
  // const [isDataLanding, setDataIsLanding] = useState(false)
  // const [erreur, setErreur] = useState(false)

  const { theme } = useTheme()
  const { data, isLoading, erreur } = useFetch(
    `http://localhost:8000/freelances`
  )
  const freelanceList = data?.freelancersList

  // useEffect(() => {
  // setDataIsLanding(true)
  // fetch('http://localhost:8000/freelances').then((response) =>
  //   response.json().then(({ freelancersList }) => {
  //     setFreelances(freelancersList)
  //     setDataIsLanding(false)
  //   })
  // )
  //   async function fetchfreelance() {
  //     setDataIsLanding(true)
  //     try {
  //       const response = await fetch('http://localhost:8000/freelances');
  //       const {freelancersList} = await response.json()
  //       setFreelances(freelancersList)
  //     } catch (error) {
  //       console.log('------- erreur --------', error);
  //       setErreur(true)
  //     } finally {
  //       setDataIsLanding(false)
  //     }
  //   }
  //   fetchfreelance()
  // }, [])

  if (erreur) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle theme={theme}>Trouvez votre prestataire</PageTitle>
      <PageSubtitle theme={theme}>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      {isLoading ? (
        <Loader theme={theme} data-testid="loader" />
      ) : (
        // console.log(freelanceList)
        <ContainerCard>
          {freelanceList?.map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              label={profile.job}
              title={profile.name}
              picture={profile.picture}
            />
          ))}
        </ContainerCard>
      )}
    </div>
  )
}
