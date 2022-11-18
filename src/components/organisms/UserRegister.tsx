import React, { useEffect, useMemo, useRef } from 'react'
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
import { IUserCreate } from 'dtos/user'

interface IUserRegister {
  isOpen: any
  onClose: any
  user: IUser
  isUpdate?: boolean
}

const UserRegister = ({
  isOpen,
  onClose,
  user,
  isUpdate = false,
}: IUserRegister) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [authData] = useUserAuth()
  const { register, reset, handleSubmit } = useForm<IUser>({
    defaultValues: useMemo(() => user, [user]),
  })
  const { callFailToast, callSuccessToast } = useToast()
  useEffect(() => {
    reset(user)
  }, [user, reset])

  const onSubmit = async (newUser: IUser) => {
    try {
      const userData = { ...newUser, token: authData.token }
      if (!isUpdate) {
        await createUser(userData)
      } else {
        await updateUser(userData)
      }
      onClose()
    } catch (err) {
      callFailToast('The was an error during the request')
    }
  }

  const updateUser = async (userData: IUserCreate) => {
    await userService.updateUser({
      userData,
      remember: true,
    })
    callSuccessToast('User has been successfully updated')
  }

  const createUser = async (userData: IUserCreate) => {
    await userService.createUser({
      userData,
      remember: true,
    })
    callSuccessToast('User has been successfully created')
  }

  const onError = (err: any) => {
    const keys = Object.keys(err)
    callFailToast(`Invalid fields: ${keys}`)
  }

  console.log(isUpdate)

  return (
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
              <Select placeholder="Select option" {...register('englishLevel')}>
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
                {...register('skills')}
              />
            </Box>
            <Box>
              <FormLabel>CV Link</FormLabel>
              <Input
                type="text"
                name="cvLink"
                placeholder="https://"
                {...register('cvLink')}
              />
            </Box>
            <Box>
              <Checkbox {...register('isAdmin')}>admin</Checkbox>
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
  )
}

export default UserRegister
