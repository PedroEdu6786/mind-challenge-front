import { useForm } from 'react-hook-form'
import { Box, Button, Center, FormLabel, Input, Stack } from '@chakra-ui/react'
import authService from '../../services/auth/authService'
import { IAuthLogin } from '../../dtos/user'
import useToast from '../../hooks/useToast'
import { useNavigate } from 'react-router-dom'
import useUserAuth from 'hooks/useUserAuth'
import { Logo } from 'components/atoms/Logo'

const Login = () => {
  const navigate = useNavigate()
  const [, setUserData] = useUserAuth()
  const { register, handleSubmit } = useForm<IAuthLogin>()
  const { callFailToast, callSuccessToast } = useToast()

  const onSubmit = async (authData: IAuthLogin) => {
    const authSubmit = { authFormData: authData, remember: true }
    try {
      const loggedData = await authService.signInUser(authSubmit)
      callSuccessToast('User login has been successful')
      setUserData(loggedData)

      navigate('/dashboard')
    } catch (err) {
      callFailToast('The was an error during the request')
    }
  }

  const onError = (err: any) => {
    const keys = Object.keys(err)
    callFailToast(`Invalid fields: ${keys}`)
  }

  return (
    <Center minH="600px" h="100vh">
      <Stack px="2rem" spacing="2rem">
        <Logo />
        <Stack
          as="form"
          spacing="2rem"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Box>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="john@mail.com"
              size="md"
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
          </Box>
          <Box>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="password"
              size="md"
              {...register('password', { required: true })}
            />
          </Box>
          <Button colorScheme="red" type="submit">
            Login
          </Button>
        </Stack>
      </Stack>
    </Center>
  )
}

export default Login
