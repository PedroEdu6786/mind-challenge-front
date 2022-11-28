import React from 'react'
import { Avatar, Center, Heading, Stack, Text } from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import { UserPerk } from 'components/molecules/UserPerk'
import { CvLink } from 'components/molecules/CvLink'
import { UserSkills } from 'components/molecules/UserSkills'
import useProtectedRoute from 'hooks/useProtectedRoute'
import useUserFetch from 'hooks/useUserFetch'

const Dashboard = () => {
  useProtectedRoute()
  const { userInfo, isAdmin } = useUserFetch()

  const parsedSkills: string[] =
    userInfo && userInfo['skills'] ? userInfo.skills.split(', ') : []

  return (
    <DashboardLayout px={{ base: '.25rem', sm: '.5rem', md: '2rem' }} py="3rem">
      <Center h="100%">
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
                src={`https://avatars.dicebear.com/api/jdenticon/${userInfo.email}.svg`}
                boxSize={{ base: '150px', md: '200px', lg: '300px' }}
              />
              <Stack spacing=".1rem">
                {isAdmin && (
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
