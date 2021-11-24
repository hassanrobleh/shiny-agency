import { useContext } from 'react'
import { SurveyContext } from '../../utils/context'
import styled from 'styled-components'
import colors from '../../utils/style/colors'
import { useFetch, useTheme } from '../../utils/hooks'
import { Loader, StyledLink } from '../../utils/style/Atoms'

const LoadinWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 60px 90px;
  padding: 30px;
  background-color: ${({ theme }) =>
    theme === 'light' ? `${colors.backgroundLight}` : `${colors.backgroundDark}`};
`
const ResultsTitle = styled.h2`
  color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  font-weight: bold;
  font-size: 28px;
  max-width: 60%;
  text-align: center;
  & > span {
    padding-left: 10px;
  }
`
const JobTitle = styled.span`
  color: ${({ theme }) =>
    theme === 'light' ? colors.primary : colors.backgroundLight};
  text-transform: capitalize;
`
const DescriptionWrapper = styled.div`
  padding: 60px;
`
const JobDescription = styled.div`
  font-size: 18px;
  & > p {
    color: ${({ theme }) => (theme === 'light' ? colors.secondary : '#ffffff')};
    margin-block-start: 5px;
  }
  & > span {
    font-size: 20px;
  }
`
export function formatListJob(title, listLength, index) {
  if(index === listLength - 1) {
    return title
  }
  return `${title},`
}

function formatFetchParams(answers) {
  const answerNumbers = Object.keys(answers)
  return answerNumbers.reduce((previousParams, answerNumber, index) => {
    const isFirstParams = index === 0
    const separator = isFirstParams ? '' : '&'
    return `${previousParams}${separator}a${answerNumber}=${answers[answerNumber]}`
  }, '')
}

export default function Results() {
  //   const { theme } = useContext(ThemeContext)
  const { theme } = useTheme()
  const { answers } = useContext(SurveyContext)
  // console.log(answers);
  const fetchParams = formatFetchParams(answers)

  const { data, isLoading, erreur } = useFetch(
    `http://localhost:8000/results?${fetchParams}`
  )
  console.log(data)
  if (erreur) {
    return <span>Il y a un problème</span>
  }

  const resultsData = data?.resultsData

   

  return isLoading ? (
    <LoadinWrapper>
      <Loader />
    </LoadinWrapper>
  ) : (
    <ResultsContainer theme={theme}>
      <ResultsTitle theme={theme}>
        Les compétences dont vous avez besoin :
        {resultsData &&
          resultsData.map((result, index) => (
            <JobTitle
              key={`result-title-${index}-${result.title}`}
              theme={theme}
            >
              {/* {result.title}
              {index === resultsData.length - 1 ? '' : ','} <===>*/}
              {formatListJob(result.title, resultsData.length, index)}
            </JobTitle>
          ))}
      </ResultsTitle>
      <StyledLink $isFullLink to="/freelances">
        Découvrez nos profils
      </StyledLink>
      <DescriptionWrapper>
        {resultsData &&
          resultsData.map((result, index) => (
            <JobDescription key={`result-detail-${index}-${result.title}`}>
              <JobTitle theme={theme}>{result.title}</JobTitle>
              <p>{result.description}</p>
            </JobDescription>
          ))}
      </DescriptionWrapper>
      {console.log(resultsData)}
    </ResultsContainer>
  )
}
