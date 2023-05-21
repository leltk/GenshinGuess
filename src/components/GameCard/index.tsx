import {Card} from '@chakra-ui/react'
import { ImagePixelated} from "react-pixelate"

interface IGameCardProps {
  pixel:number
  char:string
}


const GameCard = ({pixel,char}:IGameCardProps)=> {
    const charFormat: string = char[0].toUpperCase() + char.slice(1) || '';


    return (
    <Card maxW='sm' border={'0.1px solid'} borderColor={'#fff'} display={'flex'} justifyContent={'center'} p={'5px'}>
 
        <ImagePixelated 
         
        width={400}
        height={200}
        pixelSize={pixel}
        src={`../../assets/${charFormat}.png`}
      
      
    />
   
    
    </Card>)
}

export default GameCard