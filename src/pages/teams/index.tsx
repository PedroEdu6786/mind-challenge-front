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
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useToast from 'hooks/useToast'
import { LIGHT_GRAY } from 'constants/colors'
import { IUser } from 'dtos/user'
import { Link } from 'components/atoms/Link'
import MemberRegister from 'components/organisms/MemberRegister'
import { memberService } from 'services/member/memberService'

export interface ITeam {
  id?: number
  idAccount: number
}

const Teams = () => {
  const [authData] = useUserAuth()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedTeam, setSelectedTeam] = useState<IUser[]>(null)
  const [teamsInfo, setTeamsInfo] = useState<ITeam[]>(null)
  const { id: accountId } = useParams()
  const { callFailToast, callSuccessToast } = useToast()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  // const { state, dispatch } = useContext(AccountContext)

  useAdminRoute()

  const { userData } = authData

  const teamId = searchParams.get('teamId')

  useEffect(() => {
    if (!teamsInfo && userData) {
      const fetchData = {
        token: authData.token,
        idAccount: Number(accountId),
      }
      teamService
        .fetchAllTeams({ teamData: fetchData, remember: true })
        .then((data: ITeam[]) => {
          setTeamsInfo(data)
          if (data.length > 0 && !teamId) handleFetchTeam(data[0].id)
          if (teamId) handleFetchTeam(teamId)
        })
    }
  }, [accountId, authData, teamsInfo, userData])

  const handleCreateTeam = async () => {
    try {
      const data = await teamService.createTeam({
        teamData: { idAccount: Number(accountId), token: authData.token },
        remember: true,
      })
      setTeamsInfo([...teamsInfo, data])
      callSuccessToast('Team has been created successfully')
    } catch (error) {
      console.log(error)
      callFailToast('Team could not be created')
    }
  }

  const handleFetchTeam = async (teamId) => {
    navigate(`?teamId=${teamId}`)
    try {
      teamService
        .fetchTeamMembers({
          teamData: { idAccount: Number(teamId), token: authData.token },
          remember: true,
        })
        .then((data) => setSelectedTeam(data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteMember = async (userId: number) => {
    try {
      await memberService.deleteTeamMember({
        memberData: { idUser: userId, token: authData.token },
        remember: true,
      })
      const newTeam = selectedTeam.filter((data) => data.id !== userId)
      setSelectedTeam([...newTeam])
      callSuccessToast('Team has been created successfully')
    } catch (error) {
      console.log(error)
      callFailToast('Team could not be created')
    }
  }

  const handleDeleteTeam = async () => {
    try {
      await teamService.deleteTeamMembers({
        teamData: { id: Number(teamId), token: authData.token },
        remember: true,
      })

      const newTeams = teamsInfo.filter((team) => team.id !== Number(teamId))

      navigate('')
      setSelectedTeam(null)
      setTeamsInfo(newTeams)
    } catch (error) {
      callFailToast('Could not delete team')
    }
  }

  return (
    <DashboardLayout>
      <MemberRegister
        isOpen={isOpen}
        onClose={onClose}
        addMember={setSelectedTeam}
      />
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
            <HStack>
              <Button isDisabled={Boolean(!selectedTeam)} onClick={onOpen}>Add Member</Button>
              <Button isDisabled={Boolean(!selectedTeam)} onClick={handleDeleteTeam} variant="outline">
                Delete Team
              </Button>
            </HStack>
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
                        {/* <Link to={`users/${user.id}`}>View More</Link> */}
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          variant="outline"
                          onClick={() => handleDeleteMember(user.id)}
                        >
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
