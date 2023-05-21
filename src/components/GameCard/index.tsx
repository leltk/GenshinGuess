import {Card} from '@chakra-ui/react'
import { ImagePixelated} from "react-pixelate"

interface IGameCardProps {
  pixel:number
  char:string
}


const GameCard = ({pixel,char}:IGameCardProps)=> {


    return (
    <Card maxW='sm' border={'0.1px solid'} borderColor={'#fff'} display={'flex'} justifyContent={'center'} p={'5px'}>
 
        <ImagePixelated 
         
        width={400}
        height={200}
        pixelSize={pixel}
      src={`src/assets/chars/${char}.png`}
      
      
    />
   
    
    </Card>)
}

export default GameCard