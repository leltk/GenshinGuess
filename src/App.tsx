import { useState } from 'react'
import './App.css'
import GameCard from './components/GameCard'
import GameGuess from './components/GameGuess'
import { Container } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Credits from './components/Credits'

function App() {
  const [pixelated, setPixelated] = useState(30)
  const [answer, setAnswer]= useState('')


  return (
    <Container display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <GameCard pixel={pixelated} char={answer} ></GameCard>
      <GameGuess setPixelated={setPixelated} answer={answer} setAnswer={setAnswer} ></GameGuess>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Credits/>
    </Container>
  )
}

export default App
