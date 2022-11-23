import React, { useEffect, useState } from 'react'
import {
  Button,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
import useToast from 'hooks/useToast'

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
  const { callFailToast, callSuccessToast } = useToast()

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

  const handleDelete = async (user: IUser) => {
    try {
      const fetchData = { token: authData.token, id: user.id }

      await userService.deleteUser({
        userData: fetchData,
        remember: true,
      })
      callSuccessToast('Account deleted')
    } catch (err) {
      callFailToast('The was an error during the request')
    }
  }

  const handleClose = () => {
    setIsUpdate(false)
    setSelectedUser(initValue)
    onClose()
  }

  return (
    <DashboardLayout px={{ base: '.25rem', sm: '.5rem', md: '2rem' }} py="3rem">
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
          <TableContainer overflowY="auto" maxHeight="300px" maxW="80%">
            <Table>
              <Thead position="sticky" top={0} zIndex={1}>
                <Tr bgColor="white">
                  <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                    ID
                  </Th>
                  <Th bgColor={LIGHT_GRAY}>Name</Th>
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
                    <Td>{user.id}</Td>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>{user.englishLevel}</Td>
                    <Td>{user.cvLink}</Td>
                    <Td>
                      <Link to={`${user.id}`}>Ver más</Link>
                    </Td>
                    <Td>
                      <Menu>
                        <MenuButton
                          px={4}
                          py={2}
                          transition="all 0.2s"
                          borderRadius="md"
                          borderWidth="1px"
                          _hover={{ bg: 'gray.400' }}
                          _expanded={{ bg: 'blue.400' }}
                          _focus={{ boxShadow: 'outline' }}
                        >
                          Actions
                        </MenuButton>
                        <MenuList>
                          <MenuItem onClick={() => handleUpdate(user, true)}>
                            Update
                          </MenuItem>
                          <MenuItem onClick={() => handleDelete(user)}>
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
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
