import React, { useEffect, useState } from 'react'
import { Avatar, Center, Heading, Stack, Text } from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useUserAuth from 'hooks/useUserAuth'
import { UserPerk } from 'components/molecules/UserPerk'
import { CvLink } from 'components/molecules/CvLink'
import { UserSkills } from 'components/molecules/UserSkills'
import { userService } from 'services/user'
import useProtectedRoute from 'hooks/useProtectedRoute'
import { IUser } from 'dtos/user'

const initialState: IUser = null

const Dashboard = () => {
  const [authData] = useUserAuth()
  const [userInfo, setUserInfo] = useState<IUser>(initialState)
  useProtectedRoute()

  const { userData } = authData
  useEffect(() => {
    const fetchData = { id: userData.id, token: authData.token }
    if (!userInfo) {
      userService
        .fetchUser({ userData: fetchData, remember: true })
        .then((data: IUser) => {
          setUserInfo(data)
        })
    }
  }, [userData, authData, userInfo])

  const parsedSkills = []

  return (
    <DashboardLayout>
      <Center h="100%" >
        {userInfo && (
          <Stack
            width="80%"
            maxW="650px"
            justifyContent="space-between"
            flexDirection={['column', 'row']}
            spacing={{ base: '1rem', md: 0 }}
          >
            {/*  */}
            <Stack>
              <Avatar
                src={`https://avatars.dicebear.com/api/jdenticon/${'tesft'}.svg`}
                boxSize={{ base: '150px', md: '200px', lg: '300px' }}
              />
              <Stack spacing=".1rem">
                {authData.isAdmin && (
                  <Text
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="semibold"
                    color="red"
                  >
                    Admin
                  </Text>
                )}
                <Heading as="h2" size="lg">
                  {userInfo.name}
                </Heading>
                <Text>{userInfo.email}</Text>
              </Stack>
              <UserPerk
                perkName="CV"
                perkContent={<CvLink cvLink={userInfo.cvLink} />}
              />
            </Stack>

            {/*  */}
            <Stack spacing="1rem">
              {/*  */}
              <UserPerk
                perkName="English Level"
                perkContent={userInfo.englishLevel}
              />
              <UserPerk
                perkName="Skills"
                perkContent={<UserSkills skills={parsedSkills} />}
              />
              <UserPerk perkName="Team" perkContent={userInfo.team} />
            </Stack>
            {/*  */}
          </Stack>
        )}
      </Center>
    </DashboardLayout>
  )
}

export default Dashboard
