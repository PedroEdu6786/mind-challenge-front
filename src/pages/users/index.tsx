import React, { useEffect, useState } from 'react'
import {
  Button,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useAdminRoute from 'hooks/useAdminRoute'
import { LIGHT_GRAY } from 'constants/colors'
import useUserAuth from 'hooks/useUserAuth'
import { Link } from 'components/atoms/Link'
import UserRegister from 'components/organisms/UserRegister'
import { userService } from 'services/user'
import { EnglishLevel, IUser } from 'dtos/user'

const initValue: IUser = {
  name: '',
  email: '',
  cvLink: '',
  skills: '',
  englishLevel: EnglishLevel.beginner,
  isAdmin: false,
}
const User = () => {
  const [authData] = useUserAuth()
  const [isUpdate, setIsUpdate] = useState(false)
  const [userInfo, setUserInfo] = useState<IUser[]>(null)
  const [selectedUser, setSelectedUser] = useState<IUser>(initValue)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useAdminRoute()

  const { userData: auth } = authData

  useEffect(() => {
    if (!userInfo && auth) {
      const userData = { token: authData.token }
      userService
        .fetchAllUsers({ userData, remember: true })
        .then((data: IUser[]) => {
          setUserInfo(data)
        })
    }
  }, [authData, userInfo, auth])

  const handleUpdate = (user: IUser, isUpdate: boolean) => {
    setSelectedUser(user)
    setIsUpdate(isUpdate)
    onOpen()
  }

  const handleClose = () => {
    setIsUpdate(false)
    setSelectedUser(initValue)
    onClose()
  }

  return (
    <DashboardLayout>
      <UserRegister
        isOpen={isOpen}
        onClose={handleClose}
        user={selectedUser}
        isUpdate={isUpdate}
      />
      <Stack h="100%" spacing="2rem">
        <Heading>Users</Heading>
        <Button
          maxW="150px"
          colorScheme="twitter"
          onClick={() => handleUpdate(initValue, false)}
        >
          Create User
        </Button>
        {userInfo && (
          <TableContainer overflowY="auto" maxHeight="300px">
            <Table>
              <Thead position="sticky" top={0} zIndex={1}>
                <Tr bgColor="white">
                  <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                    Name
                  </Th>
                  <Th bgColor={LIGHT_GRAY}>Email</Th>
                  <Th bgColor={LIGHT_GRAY}>English Level</Th>
                  <Th bgColor={LIGHT_GRAY}>Cv Link</Th>
                  <Th bgColor={LIGHT_GRAY}>View more</Th>
                  <Th borderRadius="0 1rem 1rem 0" bgColor={LIGHT_GRAY}></Th>
                </Tr>
              </Thead>
              <Tbody maxH="100px" overflowY="scroll">
                {userInfo.map((user: IUser) => (
                  <Tr key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.englishLevel}</Td>
                    <Td>{user.cvLink}</Td>
                    <Td>
                      <Link to={`${user.id}`}>Ver más</Link>
                    </Td>
                    <Td>
                      <Button
                        zIndex={0}
                        onClick={() => handleUpdate(user, true)}
                      >
                        Update
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </DashboardLayout>
  )
}

export default User
