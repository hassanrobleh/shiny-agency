import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`

const QuestionContent = styled.span`
  margin: 30px;
`

export default function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [surveyData, setSurveyData] = useState({})
  const [isDataLanding, setDataIsLanding] = useState(false)

  // async function fetchData() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     // console.log(surveyData)
  //     setSurveyData(surveyData)
  //   } catch (error) {
  //     console.log('===== error =====', error)
  //     setDataIsLanding(true)
  //   }
  // }

  useEffect(() => {
    // fetchData()
    setDataIsLanding(true)
    fetch('http://localhost:8000/survey').then((response) =>
      response.json().then(({ surveyData }) => {
        setSurveyData(surveyData)
        setDataIsLanding(false)
      })
    )
  }, [])

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLanding ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}

      <Link to={`/survey/${prevQuestionNumber}`}>Précédent </Link>
      {questionNumberInt === 10 ? (
        <Link to="/results">Résultats</Link>
      ) : (
        <Link to={`/survey/${nextQuestionNumber}`}>suivant</Link>
      )}
    </SurveyContainer>
  )
}
