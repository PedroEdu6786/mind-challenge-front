import React, { FC } from 'react'
import { Wrap, WrapItem } from '@chakra-ui/react'

interface IUserSkills {
  skills: string[]
}

export const UserSkills: FC<IUserSkills> = ({ skills }) => {
  return (
    <Wrap>
      {skills.map((skill) => (
        <WrapItem key={skill} border="2px solid #CDCDCD" borderRadius="8px" px=".25rem">
          {skill}
        </WrapItem>
      ))}
    </Wrap>
  )
}
