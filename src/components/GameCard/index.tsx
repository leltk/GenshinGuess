import {Card,Image} from '@chakra-ui/react'
import { ImagePixelated} from "react-pixelate"

interface IGameCardProps {
  pixel:number
  char:string
}


const GameCard = ({pixel,char}:IGameCardProps)=> {
    const charFormat: string = char[0].toUpperCase() + char.slice(1) || '';


    return (
    <Card maxW='sm' border={'0.1px solid'} borderColor={'#fff'} display={'flex'} justifyContent={'center'} p={'5px'}>
      {pixel> 0? 
        <ImagePixelated 
         
        width={400}
        height={200}
        pixelSize={pixel}
        src={`static/images/${charFormat}.png`}
      
    />:
        <Image w={400} h={200} src={`static/images/${charFormat}.png`}/>
      }
      
   
    
    </Card>)
}

export default GameCard