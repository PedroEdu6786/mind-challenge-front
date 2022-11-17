import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { LIGHT_BLUE } from 'constants/colors'

export const Link = ({ to, children }) => {
  return (
    <RouterLink to={to} style={{ color: LIGHT_BLUE }}>
      <ChakraLink>{children}</ChakraLink>
    </RouterLink>
  )
}
