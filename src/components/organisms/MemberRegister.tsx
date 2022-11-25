import React, { useContext, useEffect } from 'react'
import {
  Box,
  Button,
  FormLabel,
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
import { memberService } from 'services/member/memberService'
import { useSearchParams } from 'react-router-dom'
import { UserContext } from 'context/users/UserContext'
import { handleFetchUsers } from 'pages/users'

interface IAccountRegister {
  isOpen: any
  onClose: any
  addMember: any
}

const MemberRegister = ({ isOpen, onClose, addMember }: IAccountRegister) => {
  const [authData] = useUserAuth()
  const { register, handleSubmit } = useForm()
  const { callFailToast, callSuccessToast } = useToast()
  const { state, dispatch } = useContext(UserContext)
  const [searchParams] = useSearchParams()

  const { users } = state
  useEffect(() => {
    handleFetchUsers({ users, authData, dispatch })
  }, [users, authData, dispatch])

  const handleAddMember = async (data) => {
    try {
      const memberData = {
        idUser: data.idUser,
        idTeam: Number(searchParams.get('teamId')),
        token: authData.token,
      }
      await memberService.addTeamMember({ memberData, remember: true })
      const newMember = users.filter((user) => user.id === Number(data.idUser))
      addMember((prevMembers) => {
        return [...prevMembers, ...newMember]
      })
      callSuccessToast('Member has been added successfully')
    } catch (err) {
      callFailToast('User has already been added to a team')
    }
  }

  const onError = (err: any) => {
    const keys = Object.keys(err)
    callFailToast(`Invalid fields: ${keys}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(handleAddMember, onError)}>
        <ModalHeader>Add a new account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Stack>
            <Box>
              <FormLabel>Account Name</FormLabel>
              <Select
                placeholder="Select option"
                {...register('idUser', { required: true })}
              >
                {users &&
                  users.map((data) => (
                    <Box as="option" value={data.id} key={data.id}>
                      {data.name}
                    </Box>
                  ))}
              </Select>
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

export default MemberRegister
