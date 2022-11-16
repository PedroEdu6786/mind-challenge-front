import { ListItem, ListItemProps } from '@chakra-ui/react'
import React, { FC } from 'react'

export const NavItem: FC<ListItemProps> = ({ children, ...restOfProps }) => {
  return <ListItem {...restOfProps}>{children}</ListItem>
}
