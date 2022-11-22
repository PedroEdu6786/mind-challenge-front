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
} from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useAdminRoute from 'hooks/useAdminRoute'
import { LIGHT_GRAY } from 'constants/colors'
import useUserAuth from 'hooks/useUserAuth'
import { accountService } from 'services/account/accountService'
import { Link } from 'components/atoms/Link'
import { teamService } from 'services/teams/teamService'
import { useParams } from 'react-router-dom'
import useToast from 'hooks/useToast'

interface ITeam {
  id?: number
  idAccount: number
}

const Teams = () => {
  const [authData] = useUserAuth()
  const [teamsInfo, setTeamsInfo] = useState<ITeam[]>(null)
  const { id: teamId } = useParams()
  const { callFailToast, callSuccessToast } = useToast()
  console.log(teamId, 'test')

  useAdminRoute()

  const { userData } = authData
  useEffect(() => {
    if (!teamsInfo && userData) {
      const fetchData = { token: authData.token, idAccount: Number(teamId) }
      teamService
        .fetchAllTeams({ teamData: fetchData, remember: true })
        .then((data: ITeam[]) => {
          setTeamsInfo(data)
        })
    }
  }, [authData, teamsInfo, userData, teamId])

  const handleUpdate = (account: ITeam, isUpdate: boolean) => {}

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

  return (
    <DashboardLayout>
      <Stack h="100%" spacing="2rem">
        <Heading>Teams</Heading>
        <Button maxW="150px" colorScheme="twitter" onClick={handleCreateTeam}>
          Add Team
        </Button>
      </Stack>
    </DashboardLayout>
  )
}

export default Teams
