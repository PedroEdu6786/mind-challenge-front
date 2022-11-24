import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  Heading,
  HStack,
  List,
  ListItem,
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
import useUserAuth from 'hooks/useUserAuth'
import { teamService } from 'services/teams/teamService'
import { useParams } from 'react-router-dom'
import useToast from 'hooks/useToast'
import { LIGHT_GRAY } from 'constants/colors'
import { IUser } from 'dtos/user'
import { Link } from 'components/atoms/Link'
import MemberRegister from 'components/organisms/MemberRegister'

export interface ITeam {
  id?: number
  idAccount: number
}

const Teams = () => {
  const [authData] = useUserAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [teamsInfo, setTeamsInfo] = useState<ITeam[]>(null)
  const { id: teamId } = useParams()
  const { callFailToast, callSuccessToast } = useToast()

  useAdminRoute()

  const { userData } = authData
  useEffect(() => {
    if (!teamsInfo && userData) {
      const fetchData = { token: authData.token, idAccount: Number(teamId) }
      teamService
        .fetchAllTeams({ teamData: fetchData, remember: true })
        .then((data: ITeam[]) => {
          setTeamsInfo(data)
          if (data.length > 0) handleFetchTeam(data[0].id)
        })
    }
  }, [authData, teamsInfo, userData, teamId])

  const handleCreateTeam = async () => {
    try {
      await teamService.createTeam({
        teamData: { idAccount: Number(teamId), token: authData.token },
        remember: true,
      })
      callSuccessToast('Team has been created successfully')
    } catch (error) {
      console.log(error)
      callFailToast('Team could not be created')
    }
  }

  const handleFetchTeam = async (teamId) => {
    try {
      const data = await teamService.fetchTeamMembers({
        teamData: { idAccount: Number(teamId), token: authData.token },
        remember: true,
      })
      setSelectedTeam(data)
      console.log(data)
    } catch (error) {
      console.log(error)
      callFailToast('Team could not be created')
    }
  }

  return (
    <DashboardLayout>
      {/* <MemberRegister isOpen={isOpen} onClose={onClose} team={selectedTeam} /> */}
      <HStack w="100%" minH="100%" h="100vh">
        <Stack
          w={{ md: '20%' }}
          maxW="250px"
          h="100%"
          bgColor="gray.50"
          p="1rem"
          spacing="2rem"
          px={{ md: '1rem', lg: '1.5rem' }}
          alignItems="center"
        >
          <List spacing="1.5rem">
            <ListItem>
              <Button
                maxW="150px"
                colorScheme="twitter"
                variant="outline"
                onClick={handleCreateTeam}
              >
                Add Team
              </Button>
            </ListItem>
            <Divider />
            {teamsInfo &&
              teamsInfo.map((team) => (
                <ListItem key={team.id}>
                  <Button
                    w="100%"
                    variant="ghost"
                    onClick={() => handleFetchTeam(team.id)}
                  >
                    {team.id}
                  </Button>
                </ListItem>
              ))}
          </List>
        </Stack>
        <Stack
          alignSelf="start"
          w="100%"
          h="100vh"
          spacing="1rem"
          px={{ base: '.25rem', sm: '.5rem', md: '2rem' }}
          py="3rem"
        >
          <HStack justify="space-between">
            <Heading>Team Members</Heading>
            <Button onClick={onOpen}>Add Member</Button>
          </HStack>
          <TableContainer overflowY="auto" maxHeight="300px">
            <Table>
              <Thead position="sticky" top={1}>
                <Tr bgColor="white">
                  <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                    Name
                  </Th>
                  <Th bgColor={LIGHT_GRAY}>Details</Th>
                  <Th borderRadius="0 1rem 1rem 0" bgColor={LIGHT_GRAY}>
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody maxH="100px" overflowY="scroll">
                {selectedTeam &&
                  selectedTeam.map((user: IUser) => (
                    <Tr key={user.id}>
                      <Td>{user.name}</Td>
                      <Td>
                        <Link to={`users/${user.id}`}>View More</Link>
                      </Td>
                      <Td>
                        <Button colorScheme="red" variant="outline">
                          Remove
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </HStack>
    </DashboardLayout>
  )
}

export default Teams
