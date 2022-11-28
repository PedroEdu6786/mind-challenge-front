import { Stack, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

interface IUserPerk {
  perkName: string
  perkContent: string | React.ReactNode
}
export const UserPerk: FC<IUserPerk> = ({ perkName, perkContent }) => {
  return (
    <Stack spacing=".1rem">
      <Text fontSize={{ md: 'xl', lg: '2xl' }} fontWeight="bold">
        {perkName}
      </Text>
      {perkContent instanceof Object ? perkContent : <Text>{perkContent}</Text>}
    </Stack>
  )
}

export default UserPerk
