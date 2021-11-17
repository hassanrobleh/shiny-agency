import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Survey from './pages/Survey'
import Header from './components/Header'
import Error from './components/Error'
import Results from './pages/Results'
import Freelances from './pages/Freelances'
import { createGlobalStyle } from 'styled-components'
import Footer from './components/Footer'
import { ThemeProvider } from './utils/context'

const GlobalStyled = createGlobalStyle`
  * {
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
  }

  body {
    margin: 0;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <GlobalStyled />
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/survey/:questionNumber" element={<Survey />} />

          <Route path="/results" element={<Results />} />
          <Route path="/freelances" element={<Freelances />} />

          <Route path="*" element={<Error />} />
        </Routes>
          <Footer />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
