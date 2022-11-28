import React, { FC } from 'react'
import { Badge, Wrap, WrapItem } from '@chakra-ui/react'

interface IUserSkills {
  skills: string[]
}

export const UserSkills: FC<IUserSkills> = ({ skills }) => {
  return (
    <Wrap>
      {skills.map((skill) => (
        <WrapItem key={skill}>
          <Badge ml="1" colorScheme="green">
            {skill}
          </Badge>
        </WrapItem>
      ))}
    </Wrap>
  )
}
