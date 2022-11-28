import axios from 'axios'
import { IMemberCreateAxios } from './member.interface'

export const memberService = Object.freeze({
  addTeamMember: (team: IMemberCreateAxios) => addTeamMember(team),
  deleteTeamMember: (team: IMemberCreateAxios) => deleteTeamMember(team),
})

const addTeamMember = async ({ memberData }: IMemberCreateAxios) => {
  try {
    const { idTeam, idUser } = memberData
    const payload = { idTeam, idUser }
    const res = await axios.post(`/members`, payload, {
      headers: { Authorization: `Bearer ${memberData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}

const deleteTeamMember = async ({ memberData }: IMemberCreateAxios) => {
  try {
    const { idUser } = memberData
    const payload = { idTeam: null, idUser }
    const res = await axios.put(`/members`, payload, {
      headers: { Authorization: `Bearer ${memberData.token}` },
    })
    const { data } = await res

    return data
  } catch (err) {
    throw new Error()
  }
}
