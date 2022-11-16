import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

const toastBaseConfig = (message: string): UseToastOptions => ({
  duration: 6000,
  isClosable: true,
  position: 'top-right',
  description: message,
})

const useToast = () => {
  const toast = useChakraToast()

  const callAlertToast = (message: string) => {
    return toast({
      title: 'Warning',
      status: 'warning',
      ...toastBaseConfig(message),
    })
  }

  const callSuccessToast = (message: string) => {
    return toast({
      title: 'Success request',
      status: 'success',
      ...toastBaseConfig(message),
    })
  }

  const callFailToast = (message: string) => {
    return toast({
      title: 'Failed request',
      status: 'error',
      ...toastBaseConfig(message),
    })
  }

  return { callFailToast, callSuccessToast, callAlertToast }
}

export default useToast
