import {Card} from '@chakra-ui/react'
import { useEffect } from 'react'
import { ImagePixelated} from "react-pixelate"

interface IGameCardProps {
  pixel:number
}
const GameCard = ({pixel}:IGameCardProps)=> {

    useEffect(()=>{
      console.log('reload')
    },[pixel])

    return (
    <Card maxW='sm' border={'0.1px solid'} borderColor={'#fff'} display={'flex'} justifyContent={'center'} p={'5px'}>
 
        <ImagePixelated 
         
        width={400}
        height={200}
        pixelSize={pixel}
      src='src/assets/personagens/ayaka.webp'
      
      
    />
   
    
    </Card>)
}

export default GameCard