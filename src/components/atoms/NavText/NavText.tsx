import { Heading, HeadingProps } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface INavigation extends HeadingProps {
  path: string
}

export const NavText: FC<INavigation> = ({
  path,
  children,
  ...restOfProps
}) => {
  return (
    <Link to={path}>
      <Heading
        as="h3"
        fontSize={{base: ".9rem", md: '1rem', lg: '1.125rem'}}
        fontWeight="regular"
        transition=".2s"
        cursor="pointer"
        _focus={{ fontWeight: 'bold' }}
        _hover={{ fontWeight: 'bold' }}
        {...restOfProps}
      >
        {children}
      </Heading>
    </Link>
  )
}
