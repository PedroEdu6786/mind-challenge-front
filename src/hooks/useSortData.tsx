import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useState } from 'react'

export const useSortData = (data) => {
  const [sortData, setSortData] = useState(data)

  const sortByName = () => {
    const data = sortData.sort((a, b) => a.user.name.localeCompare(b.user.name))
    setSortData([...data])
  }

  const sortByDate = () => {
    const data = sortData.sort((a, b) => {
      const dateB = new Date(b.createdAt)
      const dateA = new Date(a.createdAt)
      return dateB.getTime() - dateA.getTime()
    })
    setSortData([...data])
  }

  const sortByStatus = () => {
    const data = sortData.sort((a, b) => a.status.localeCompare(b.status))
    setSortData([...data])
  }

  const sortByTeam = () => {
    const data = sortData.sort((a, b) => b.teamId - a.teamId)
    setSortData([...data])
  }

  const FilterDropdown = () => {
    return (
      <Menu>
        <MenuButton as={Button}>Sort</MenuButton>
        <MenuList>
          <MenuItem onClick={sortByDate}>Date</MenuItem>
          <MenuItem onClick={sortByName}>Name</MenuItem>
          <MenuItem onClick={sortByTeam}>Team</MenuItem>
          <MenuItem onClick={sortByStatus}>Status</MenuItem>
        </MenuList>
      </Menu>
    )
  }

  return [sortData, FilterDropdown]
}
