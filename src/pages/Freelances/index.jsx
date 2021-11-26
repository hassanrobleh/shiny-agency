// import { useState, useEffect } from 'react'
// import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import Card from '../../components/Card'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { useFetch } from '../../utils/hooks'

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
  color: black;
  text-align: center;
  padding-bottom: 30px;
`
const PageSubtitle = styled.h2`
  font-size: 20px;
  color: ${colors.secondary};
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

  const { data, isLoading, erreur } = useFetch('http://localhost:8000/freelances')

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

  if(erreur) {
    return <span>Oups il y a eu un problème</span>
  }

  return (
    <div>
      <PageTitle>Trouvez votre prestataire</PageTitle>
      <PageSubtitle>
        Chez Shiny nous réunissons les meilleurs profils pour vous.
      </PageSubtitle>
      <ContainerCard>
        {isLoading ? (
          <Loader />
        ) : (
          // console.log(freelances)
          data.map((profil) => (
            <Card
              key={profil.id}
              title={profil.name}
              label={profil.job}
              picture={profil.picture}
            />
          ))
        )}
      </ContainerCard>
    </div>
  )
}
