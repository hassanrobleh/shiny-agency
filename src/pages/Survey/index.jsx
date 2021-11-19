import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'

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
const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const LinkWrapper = styled.div`
  padding-top: 30px & a {
    color: black;
  }
  & a:first-of-type {
    margin-right: 20px;
  }
`
const ReplyBox = styled.button`
  border: none;
  height: 100px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundLight};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${({ isSelect }) =>
    isSelect ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'}
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

export default function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1
  const [surveyData, setSurveyData] = useState({})
  const [isDataLanding, setDataIsLanding] = useState(false)
  const [erreur, setErreur] = useState(false)

  const { answers, saveAnswers } = useContext(SurveyContext)



  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

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
    // fetch('http://localhost:8000/survey').then((response) =>
    //   response.json().then(({ surveyData }) => {
    //     setSurveyData(surveyData)
    //     setDataIsLanding(false)
    //   })
    // )
    async function fetchSurvey() {
      try {
        const response = await fetch(`http://localhost:8000/survey`)
        const { surveyData } = await response.json()
        setSurveyData(surveyData)
      } catch (error) {
        console.log('----- Erreur -----', error)
        setErreur(true)
      } finally {
        setDataIsLanding(false)
      }
    }
    fetchSurvey()
  }, [])

  if (erreur) {
    return <span>Oups il y a eu un problème</span>
  }

  console.log(questionNumber);

  return (
    <SurveyContainer>
      <QuestionTitle>Question {questionNumber}</QuestionTitle>
      {isDataLanding ? (
        <Loader />
      ) : (
        <QuestionContent>{surveyData[questionNumber]}</QuestionContent>
      )}

      <ReplyWrapper>
        <ReplyBox
          onclick={() => saveReply(true)}
          isSelect={answers[questionNumber] === true}
        >
          Oui
        </ReplyBox>

        <ReplyBox
          onclick={() => saveReply(false)}
          isSelect={answers[questionNumber] === false}
        >
          Non
        </ReplyBox>
      </ReplyWrapper>

      <LinkWrapper>
        {/* <Link to={`/survey/${prevQuestionNumber}`}>Précédent </Link>
        {questionNumberInt === 10 ? (
          <Link to="/results">Résultats</Link>
        ) : (
          <Link to={`/survey/${nextQuestionNumber}`}>suivant</Link>
        )} */}
        <Link to={`/survey/${prevQuestionNumber}`}>Précédent </Link>
        {surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>suivant</Link>
          ) : (
          <Link to="/results">Résultats</Link>
        )}
      </LinkWrapper>
    </SurveyContainer>

    
  )
}
