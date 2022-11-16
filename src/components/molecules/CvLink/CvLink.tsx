import React from 'react'
import { Link, Text } from '@chakra-ui/react'
import { LIGHT_BLUE } from 'constants/colors'

export const CvLink = ({ cvLink }) => {
  return (
    <Link href={`${cvLink}`} isExternal>
      <Text color={LIGHT_BLUE}>{cvLink}</Text>
    </Link>
  )
}
