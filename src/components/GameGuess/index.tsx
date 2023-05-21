import { Container, FormLabel, FormControl, Button,Select, Card,Text} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect,useCallback } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';



const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
});

interface IGameGuess {
    setPixelated:React.Dispatch<React.SetStateAction<number>>
    answer: string;
    setAnswer:React.Dispatch<React.SetStateAction<string>>
}


const GameGuess = ({setPixelated, answer, setAnswer}:IGameGuess) => {

    const [personagens, setPersonagens] = useState<string[]>([])
    const [res, setRes] = useState<string[]>([]);
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    });


    const callApi = async () => {
      const res = await axios.get('https://api.genshin.dev/characters/');
      return res.data
    };
  
  const resetGame = async () => {
    setPixelated(30);
    const charsPromise = callApi();
  
    try {
      const chars = await charsPromise; 
      const filteredData = chars.filter((char:string) =>
      char !== 'traveler-geo' &&
      char !== 'traveler-anemo' &&
      char !== 'traveler-electro' &&
      char !== 'traveler-dendro'
    );
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomChar = chars[randomIndex];
      setRes([])
      setPixelated(30)
      setLose(false)
      setWin(false)
      setAnswer(randomChar);
    } catch (error) {
      console.error(error);
    }
  }
 
    const onSubmit =  (data:Record<string, string>) => {
        if (res.length < 2) {
           setRes(prevRes => [...prevRes, data.name]);
        }
      
        if (data.name !== answer) {
            toast.warning("Errou!")
          if (res.length ==2) {
            setLose(true);
            toast.error("Você Perdeu! :(")
          }
        } else {
          setWin(true);
          setPixelated(0)
          toast.success("Parabens! Você ganhou. :D")
        }
      };
      
      
      const pixelateControl = useCallback(() => {
        if (res.length === 0) {
          setPixelated(30);
        } else if (res.length === 1) {
          setPixelated(20);
        } else if (res.length === 2) {
          setPixelated(10);
        } else {
          setPixelated(0);
        }
        if (win || lose){
            setPixelated(0);
        }
      }, [res, setPixelated,lose,win]);

      useEffect(() => {
        resetGame();
      }, []);
      
      useEffect(() => {
        const callApi = async () => {
          const res = await axios.get('https://api.genshin.dev/characters/');
          const filteredData = res.data.filter((char:string) =>
          char !== 'traveler-geo' &&
          char !== 'traveler-anemo' &&
          char !== 'traveler-electro' &&
          char !== 'traveler-dendro'
        );

          setPersonagens([...filteredData,'traveler']);
          
        };
      
        try {
          callApi();
        } catch (error) {
          console.log(error);
        }
      
        pixelateControl();
      }, [res, pixelateControl]);
      
    return (
        <Container p={'20px'}maxW={'380px'} >
          {(win || lose)&&
            <>
              <Card border={'1px solid #ecdada'} bg={lose?'#ed515a' : 'green'} m={'0px 0 20px 0'}>
                 <Text color={'#fff'}> {answer}</Text>
              </Card>
             
            </>
          }
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl display={'flex'} flexDirection={'column'} gap={'10px'}  >
                    <FormLabel w={'100%'}   color={'#fff'}>Escolha um personagem</FormLabel>
                  
                    <Select  bg={'#329cff7a'} color={'#fff'}   {...register("name")}>
                                    <option className='optionGame' value={""}>Escolha uma opção</option>
                                    {
                                        personagens.map((personagem,i) => {
                                            return <option className='optionGame' key={personagem+i} value={personagem} >{personagem}</option>
                                        })

                                    }
                                </Select>
                        
                        <Button  isDisabled={lose || win} color={'#fff'} type='submit' size={'sm'} bg={'#e3a15d'} >Tentar</Button>

                   
                </FormControl>

            </form>
            {/* <ModalRetrieve isOpen={false}/> */}
            <Button onClick={resetGame} margin={"20px 0"} isDisabled={!lose && !win} color={'#fff'} type='submit' size={'sm'} bg={'#e3a15d'}> Tentar Novamente</Button>

        </Container>)
}

export default GameGuess