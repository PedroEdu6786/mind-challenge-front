import React, { FC } from 'react'
import { Image, ImageProps } from '@chakra-ui/react'

export const Logo: FC<ImageProps> = ({ ...restOfProps }) => {
  return (
    <Image
      src="https://uploads-ssl.webflow.com/5e94eacec7d8c21e2cbbe093/616f539cc4710faaaab29c20_mind-home_Logo-06.svg"
      alt="Mind logo"
      {...restOfProps}
    />
  )
}
