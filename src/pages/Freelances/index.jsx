import Card from '../../components/Card'
import DefaultPicture from '../../assets/profil.png'


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
            {freelances.map((profil, index) => (
                <Card key={`${profil.name}-${index}`} title={42}  label={profil.jobTitle} picture={profil.picture}/>
            ))}
        </div>
    )
}