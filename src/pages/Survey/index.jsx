import { useContext } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { Loader } from '../../utils/style/Atoms'
import { SurveyContext } from '../../utils/context'
import { useFetch, useTheme } from '../../utils/hooks'

const SurveyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const QuestionTitle = styled.h2`
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const QuestionContent = styled.span`
  margin: 30px;
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
`

const LinkWrapper = styled.div`
  padding-top: 30px;
  & a {
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
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
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  border-radius: 30px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.isSelected ? `0px 0px 0px 2px ${colors.primary} inset` : 'none'};
  &:first-child {
    margin-right: 15px;
  }
  &:last-of-type {
    margin-left: 15px;
  }
`

const ReplyWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export default function Survey() {
  const { questionNumber } = useParams()
  const questionNumberInt = parseInt(questionNumber)
  const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
  const nextQuestionNumber = questionNumberInt + 1

  // const [surveyData, setSurveyData] = useState({})
  // const [isDataLanding, setDataIsLanding] = useState(false)
  // const [erreur, setErreur] = useState(false)

  const { theme } = useTheme()
  const { answers, saveAnswers } = useContext(SurveyContext)

  function saveReply(answer) {
    saveAnswers({ [questionNumber]: answer })
  }

  const { data, isLoading, erreur } = useFetch(`http://localhost:8000/survey`)
  const surveyData = data?.surveyData

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

  // useEffect(() => {
  // fetchData()
  // setDataIsLanding(true)
  // fetch('http://localhost:8000/survey').then((response) =>
  //   response.json().then(({ surveyData }) => {
  //     setSurveyData(surveyData)
  //     setDataIsLanding(false)
  //   })
  // )
  // async function fetchSurvey() {
  //   try {
  //     const response = await fetch(`http://localhost:8000/survey`)
  //     const { surveyData } = await response.json()
  //     setSurveyData(surveyData)
  //   } catch (error) {
  //     console.log('----- Erreur -----', error)
  //     setErreur(true)
  //   } finally {
  //     setDataIsLanding(false)
  //   }
  // }
  // fetchSurvey()
  // }, [])

  if (erreur) {
    return <span>Oups, il y a eu un problème</span>
  }

  return (
    <SurveyContainer>
      <QuestionTitle theme={theme}>Question {questionNumber}</QuestionTitle>
      {isLoading ? (
        <Loader />
      ) : (
        <QuestionContent theme={theme}>
          {surveyData[questionNumber]}
        </QuestionContent>
      )}

      <ReplyWrapper>
        <ReplyBox
          onClick={() => saveReply(true)}
          isSelected={answers[questionNumber] === true}
          theme={theme}
          
        >
          Oui
        </ReplyBox>

        <ReplyBox
          onClick={() => saveReply(false)}
          isSelected={answers[questionNumber] === false}
          theme={theme}

          
        >
          Non
        </ReplyBox>
      </ReplyWrapper>

      <LinkWrapper theme={theme}>
        {/* <Link to={`/survey/${prevQuestionNumber}`}>Précédent </Link>
        {questionNumberInt === 10 ? (
          <Link to="/results">Résultats</Link>
        ) : (
          <Link to={`/survey/${nextQuestionNumber}`}>suivant</Link>
        )} */}
        <Link to={`/survey/${prevQuestionNumber}`}>
          Précédent{' '}
        </Link>
        {surveyData && surveyData[questionNumberInt + 1] ? (
          <Link to={`/survey/${nextQuestionNumber}`}>
            suivant
          </Link>
        ) : (
          <Link to="/results">
            Résultats
          </Link>
        )}
      </LinkWrapper>
    </SurveyContainer>
  )
}
