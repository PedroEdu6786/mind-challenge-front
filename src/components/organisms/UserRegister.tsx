import React, { useRef } from 'react'
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from '@chakra-ui/react'
import useToast from 'hooks/useToast'
import useUserAuth from 'hooks/useUserAuth'
import { useForm } from 'react-hook-form'
import { IUser } from 'dtos/user'
import { userService } from 'services/user'

const UserRegister = ({ isOpen, onClose }) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [authData] = useUserAuth()
  const { register, handleSubmit } = useForm<IUser>()
  const { callFailToast, callSuccessToast } = useToast()

  const onSubmit = async (newUser: IUser) => {
    try {
      const userData = { ...newUser, token: authData.token }
      await userService.createUser({
        userData,
        remember: true,
      })
      callSuccessToast('User has been successfully created')
      onClose()
    } catch (err) {
      callFailToast('The was an error during the request')
    }
  }

  const onError = (err: any) => {
    const keys = Object.keys(err)
    callFailToast(`Invalid fields: ${keys}`)
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit, onError)}>
          <ModalHeader>Add a new account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  name="name"
                  placeholder="User's name"
                  {...register('name', { required: true })}
                />
              </Box>
              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                  type="text"
                  name="email"
                  placeholder="email"
                  {...register('email', {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
              </Box>
              <Box>
                <FormLabel>English Level</FormLabel>
                <Select
                  placeholder="Select option"
                  {...register('englishLevel', { required: true })}
                >
                  <Box as="option" value="beginner">
                    Beginner
                  </Box>
                  <Box as="option" value="intermediate">
                    Intermediate
                  </Box>
                  <Box as="option" value="advanced">
                    Advanced
                  </Box>
                </Select>
              </Box>
              <Box>
                <FormLabel>Skills</FormLabel>
                <Input
                  type="text"
                  name="skills"
                  placeholder="John Smith"
                  {...register('skills', { required: true })}
                />
              </Box>
              <Box>
                <FormLabel>CV Link</FormLabel>
                <Input
                  type="text"
                  name="cvLink"
                  placeholder="https://"
                  {...register('cvLink', { required: true })}
                />
              </Box>
              <Box>
                <Checkbox {...register('cvLink', { required: true })}>
                  admin
                </Checkbox>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save account
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UserRegister