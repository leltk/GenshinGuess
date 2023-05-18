import { Container, FormLabel, FormControl, Button,Select,useDisclosure } from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState, useEffect,useCallback } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import ModalRetrieve from '../ModalRetry';

const schema = z.object({
    name: z.string().min(1, { message: 'Required' }),
});

interface IGameGuess {
    setPixelated:React.Dispatch<React.SetStateAction<number>>
    answer: string;
}


const GameGuess = ({setPixelated, answer}:IGameGuess) => {

    const [personagens, setPersonagens] = useState([])
    const [res, setRes] = useState<string[]>([]);
    const [win, setWin] = useState(false)
    const [lose, setLose] = useState(false)
    const { register, handleSubmit } = useForm({
        resolver: zodResolver(schema)
    });

 
    const onSubmit =  (data) => {
        if (res.length < 2) {
           setRes(prevRes => [...prevRes, data.name]);
          console.log(res);
        }
      
        if (data.name !== answer) {
            console.log('errou');
            toast.warning("Errou!")
          if (res.length ==2) {
            console.log('perdeu');
            setLose(true);
            toast.error("Você é HORRIVEL, nunca mais jogue.")
          }
          console.log(res);
        } else {
          console.log('ganhou');
          setWin(true);
          setPixelated(0)
          toast.success("Parabens! Você ganhou.")
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
        const callApi = async () => {
          const res = await axios.get('https://api.genshin.dev/characters/');
          setPersonagens(res.data);
        };
      
        try {
          callApi();
        } catch (error) {
          console.log(error);
        }
      
        pixelateControl();
      }, [res, pixelateControl]);
      
    const {onOpen,isOpen} = useDisclosure()

    return (
        <Container p={'20px'} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl display={'flex'} flexDirection={'column'} gap={'10px'}  >
                    <FormLabel color={'#fff'}>Digite o nome de um personagem</FormLabel>
                  
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
            <Button margin={"20px 0"} isDisabled={!lose && !win} color={'#fff'} type='submit' size={'sm'} bg={'#e3a15d'}> Tentar Novamente</Button>

        </Container>)
}

export default GameGuess