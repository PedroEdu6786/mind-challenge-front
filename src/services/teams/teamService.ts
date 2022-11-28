import axios from 'axios'
import { ITeamCreateAxios } from './team.interfaces'

export const teamService = Object.freeze({
  fetchAllTeams: (team: ITeamCreateAxios) => fetchAllTeams(team),
  createTeam: (team: ITeamCreateAxios) => createTeam(team),
  deleteTeamMembers: (team: ITeamCreateAxios) => deleteTeamMembers(team),
  fetchTeamMembers: (team: ITeamCreateAxios) => fetchTeamMembers(team),
})

const createTeam = async ({ teamData, config }: ITeamCreateAxios) => {
  try {
    const { accountId } = teamData
    const payload = { accountId }
    const res = await axios.post(`/teams`, payload, {
      headers: { Authorization: `Bearer ${teamData.token}` },
      ...config,
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const fetchAllTeams = async ({ teamData }: ITeamCreateAxios) => {
  try {
    const res = await axios.get(`/teams?accountId=${teamData.accountId}`, {
      headers: { Authorization: `Bearer ${teamData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const fetchTeamMembers = async ({ teamData }: ITeamCreateAxios) => {
  try {
    const res = await axios.get(`/members?teamId=${teamData.accountId}`, {
      headers: { Authorization: `Bearer ${teamData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const deleteTeamMembers = async ({ teamData }: ITeamCreateAxios) => {
  try {
    const res = await axios.delete(`/teams/${teamData.id}`, {
      headers: { Authorization: `Bearer ${teamData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
