import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
} from '@chakra-ui/react'

import React from 'react'
import UserDisplay from './UserDisplay'

const UserInfo = ({ drawerHandler, selectedUser }) => {
  const { onClose, isOpen } = drawerHandler

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>User Info</Heading>
        </DrawerHeader>
        <DrawerBody>
          <UserDisplay userInfo={selectedUser} />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default UserInfo
