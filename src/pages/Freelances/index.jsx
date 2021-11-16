import DefaultPicture from '../../assets/profile.png'
import styled from 'styled-components'
import Card from '../../components/Card'

const ContainerCard = styled.div`
  display: grid;
  gap: 24px;
  grid-template-rows: 350px 350px;
  grid-template-columns: repeat(2, 1fr);
`

const freelances = [
  {
    name: 'Jane Doe',
    jobTitle: 'Devops',
    picture: DefaultPicture,
  },
  {
    name: 'John Doe',
    jobTitle: 'Developpeur frontend',
    picture: DefaultPicture,
  },
  {
    name: 'Jeanne Biche',
    jobTitle: 'Développeuse Fullstack',
    picture: DefaultPicture,
  },
]

export default function Freelances() {
  return (
    <div>
      <h1>Freelances</h1>
      <ContainerCard>
        {freelances.map((profil, index) => (
          <Card
            key={`${profil.name}-${index}`}
            title={profil.name}
            label={profil.jobTitle}
            picture={profil.picture}
          />
        ))}
      </ContainerCard>
    </div>
  )
}
