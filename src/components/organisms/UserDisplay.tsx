import { Avatar, Heading, Stack, Text } from '@chakra-ui/react'
import { CvLink } from 'components/molecules/CvLink'
import { UserPerk } from 'components/molecules/UserPerk'
import { UserSkills } from 'components/molecules/UserSkills'
import React from 'react'

const UserDisplay = ({ userInfo }) => {
  const parsedSkills: string[] =
    userInfo && userInfo['skills'] ? userInfo.skills.split(', ') : []
  return (
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
          {userInfo.isAdmin && (
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
        <UserPerk perkName="Team" perkContent={userInfo.teamId} />
      </Stack>
      {/*  */}
    </Stack>
  )
}

export default UserDisplay
