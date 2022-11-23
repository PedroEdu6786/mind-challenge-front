import React, { FC } from 'react'
import { Button, HStack, List, Stack, StackProps } from '@chakra-ui/react'
import { Logo } from 'components/atoms/Logo'
import { NavItem } from 'components/atoms/NavItem'
import { NavText } from 'components/atoms/NavText'
import { DARK_BLUE, WHITE_FONT } from 'constants/colors'
import useUserAuth from 'hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'

const DashboardLayout: FC<StackProps> = ({ children, ...rest }) => {
  const navigate = useNavigate()

  const [userData, , logout] = useUserAuth()

  const { isAdmin } = userData

  const onLogout = () => {
    logout()
    navigate('/auth/login')
  }

  return (
    <HStack w="100%" minH="100%" h="100vh" spacing={0}>
      <Stack
        w={{ md: '20%' }}
        maxW="250px"
        h="100%"
        bgColor={DARK_BLUE}
        p="1rem"
        spacing="2rem"
        px={{ md: '1rem', lg: '1.5rem' }}
      >
        <Logo w="10vw" minW="70px" maxW="150px" />
        <List color={WHITE_FONT} spacing="1.5rem">
          <NavItem>
            <NavText path="/dashboard">Home</NavText>
          </NavItem>
          {isAdmin && (
            <>
              <NavItem>
                <NavText path="/accounts">Accounts</NavText>
              </NavItem>
              <NavItem>
                <NavText path="/users">Users</NavText>
              </NavItem>
            </>
          )}
        </List>
        <Button justifySelf="flex-end" colorScheme="red" onClick={onLogout}>
          Sign out
        </Button>
      </Stack>
      <Stack alignSelf="start" w="100%" h="100vh" {...rest}>
        {children}
      </Stack>
    </HStack>
  )
}

export default DashboardLayout
