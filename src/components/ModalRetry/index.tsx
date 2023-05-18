import { Button, Modal,ModalBody, ModalContent, ModalFooter, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import WinContentModal from "../WinContentModal"


const ModalRetrieve= (isOpen:boolean) => {
    const { onClose} = useDisclosure()
    return (
        <>
        
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              
              <ModalBody>
               
              </ModalBody>
    
              <ModalFooter display={'flex'} justifyContent={'center'}>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Tentar Novamente
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>
          </>
       
      )
}





export default ModalRetrieve