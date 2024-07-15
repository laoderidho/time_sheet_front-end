import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'

const Toast = ({title, description, status, duration, isClosed, setIsClosed}) => {
    const toast = useToast()
    useEffect(()=>{
        if(!isClosed){
            toast({
                title: title,
                description: description,
                status: status,
                duration: duration,
                isClosable: true,
                position: 'top-right',
                onCloseComplete: ()=> setIsClosed(true)
            })
        }
    },[isClosed, title, description, status, duration, setIsClosed, toast])

    return null
}

export default Toast