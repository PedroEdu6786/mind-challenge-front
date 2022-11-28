import React, { useEffect, useState } from 'react'
import {
  Button,
  Divider,
  HStack,
  List,
  ListItem,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useAdminRoute from 'hooks/useAdminRoute'
import useUserAuth from 'hooks/useUserAuth'
import { teamService } from 'services/teams/teamService'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import useToast from 'hooks/useToast'
import { IUser } from 'dtos/user'
import MemberRegister from 'components/organisms/MemberRegister'
import { memberService } from 'services/member/memberService'
import TeamMembers from 'components/organisms/TeamMembers'
import { logsService } from 'services/logs/logsService'
import TeamLogs from 'components/organisms/TeamLogs'

export interface ITeam {
  id?: number
  accountId: number
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
  const [viewLogs, setViewLogs] = useState(false)
  const [logs, setLogs] = useState(null)

  useAdminRoute()

  const { userData } = authData

  const teamId = searchParams.get('teamId')

  useEffect(() => {
    if (!teamsInfo && userData) {
      const fetchData = {
        token: authData.token,
        accountId: Number(accountId),
      }
      teamService
        .fetchAllTeams({ teamData: fetchData, remember: true })
        .then((data: ITeam[]) => {
          setTeamsInfo(data)
          if (data.length > 0 && !teamId) handleFetchTeam(data[0].id)
          if (teamId) handleFetchTeam(teamId)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, authData, teamsInfo, userData])

  const handleCreateTeam = async () => {
    try {
      const data = await teamService.createTeam({
        teamData: { accountId: Number(accountId), token: authData.token },
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
    setViewLogs(false)

    navigate(`?teamId=${teamId}`)
    try {
      teamService
        .fetchTeamMembers({
          teamData: { accountId: Number(teamId), token: authData.token },
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

  const handleLogs = async () => {
    try {
      const logs = await logsService.getLogsByAccount({
        logsData: { accountId: Number(accountId), token: authData.token },
        remember: true,
      })

      setLogs(logs)
      setViewLogs(true)
    } catch (error) {
      callFailToast('Could not get logs')
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
                data-testid="create-team"
                maxW="150px"
                colorScheme="twitter"
                variant="outline"
                onClick={handleCreateTeam}
              >
                Add Team
              </Button>
            </ListItem>
            <ListItem>
              <Button
                data-testid="view-logs"
                maxW="150px"
                variant="outline"
                onClick={handleLogs}
              >
                View Logs
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
          {viewLogs ? (
            <TeamLogs logs={logs} />
          ) : (
            <TeamMembers
              selectedTeam={selectedTeam}
              onOpen={onOpen}
              handleDeleteTeam={handleDeleteTeam}
              handleDeleteMember={handleDeleteMember}
            />
          )}
        </Stack>
      </HStack>
    </DashboardLayout>
  )
}

export default Teams
