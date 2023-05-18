import { useState } from 'react'
import './App.css'
import GameCard from './components/GameCard'
import GameGuess from './components/GameGuess'
import { Container } from '@chakra-ui/react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [pixelated, setPixelated] = useState(30)
  const [answer, setAnswer]= useState('ayaka')

  const callApi = async () => {
    const res = await axios.get('https://api.genshin.dev/characters/');
    return res.data
  };

  const resetGame =  ()=>{
  
    setPixelated(30)
    // const chars = callApi()
  
    setAnswer('ayaka')
    
}


  return (
    <Container display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <GameCard pixel={pixelated}></GameCard>
      <GameGuess setPixelated={setPixelated} answer={answer} ></GameGuess>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Container>
  )
}

export default App
