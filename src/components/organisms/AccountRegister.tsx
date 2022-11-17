import React, { useRef } from 'react'
import {
  Box,
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { IAccount } from 'dtos/account'
import useToast from 'hooks/useToast'
import useUserAuth from 'hooks/useUserAuth'
import { useForm } from 'react-hook-form'
import { accountService } from 'services/account/accountService'

const AccountRegister = ({ isOpen, onClose }) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [authData] = useUserAuth()
  const { register, handleSubmit } = useForm<IAccount>()
  const { callFailToast, callSuccessToast } = useToast()

  const onSubmit = async (newAccount: IAccount) => {
    try {
      const accountData = { ...newAccount, token: authData.token }
      await accountService.createAccount({
        accountData,
        remember: true,
      })
      callSuccessToast('Account has been successfully created')
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
                <FormLabel>Account Name</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  name="accountName"
                  placeholder="My Account Name"
                  {...register('accountName', { required: true })}
                />
              </Box>
              <Box>
                <FormLabel>Client's Name</FormLabel>
                <Input
                  type="text"
                  name="clientName"
                  placeholder="John Doe"
                  {...register('clientName', { required: true })}
                />
              </Box>
              <Box>
                <FormLabel>Head of Operation</FormLabel>
                <Input
                  type="text"
                  name="headOfOperation"
                  placeholder="John Smith"
                  {...register('headOfOperation', { required: true })}
                />
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

export default AccountRegister