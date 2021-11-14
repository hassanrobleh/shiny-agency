import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

export default function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  
  return (
    <>
      <div>Questionnaire</div>
      <div>Question {questionNumber}</div>

      {/* <Link to={`/survey/${prevQuestionNumber}`} >Précédent</Link> */}
      <Link to={`/survey/${prevQuestionNumber}`}>Précédent </Link>
      {questionNumberInt === 10 ? (
        <Link to="/results">Résultats</Link>
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>suivant</Link>
      )}

     
    </>
  )
}
