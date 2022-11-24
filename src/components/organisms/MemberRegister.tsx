import React, { useEffect, useMemo, useRef } from 'react'
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
  Select,
  Stack,
} from '@chakra-ui/react'
import { IAccount, IAccountFetch } from 'dtos/account'
import useToast from 'hooks/useToast'
import useUserAuth from 'hooks/useUserAuth'
import { useForm } from 'react-hook-form'
import { accountService } from 'services/account/accountService'
// import { handleUserEffect } from 'pages/users'
import { teamService } from 'services/teams/teamService'
import { memberService } from 'services/member/memberService'
import { useParams } from 'react-router-dom'
import { ITeam } from 'pages/teams'

interface IAccountRegister {
  isOpen: any
  onClose: any
  team: ITeam
}

const MemberRegister = ({ isOpen, onClose, team }: IAccountRegister) => {
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [authData] = useUserAuth()
  const { register, handleSubmit } = useForm()
  const { callFailToast, callSuccessToast } = useToast()

  // useEffect(
  //   () => handleUserEffect({ users: data, fetchUsers }),
  //   [data, fetchUsers]
  // )

  const handleCreateAccount = async (data) => {
    console.log(data)
    console.log(team)
    // const memberData = {
    //   idUser: data.idUser,
    //   idTeam: team.id,
    //   token: authData.token,
    // }
    // await memberService.addTeamMember({ memberData, remember: true })
    callSuccessToast('Member has been added successfully')
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
        <ModalContent
          as="form"
          onSubmit={handleSubmit(handleCreateAccount, onError)}
        >
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
                  {/* {data &&
                    data.map((data) => (
                      <Box as="option" value={data.id} key={data.id}>
                        {data.name}
                      </Box>
                    ))} */}
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
    </>
  )
}

export default MemberRegister
