import React from 'react'
import { Center } from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useProtectedRoute from 'hooks/useProtectedRoute'
import useUserFetch from 'hooks/useUserFetch'
import UserDisplay from 'components/organisms/UserDisplay'

const Dashboard = () => {
  useProtectedRoute()
  const { userInfo } = useUserFetch()

  return (
    <DashboardLayout px={{ base: '.25rem', sm: '.5rem', md: '2rem' }} py="3rem">
      <Center h="100%">
        {userInfo && <UserDisplay userInfo={userInfo} />}
      </Center>
    </DashboardLayout>
  )
}

export default Dashboard
