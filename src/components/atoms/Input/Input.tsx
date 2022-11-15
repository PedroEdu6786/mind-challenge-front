import { FC } from 'react'
import { Input as BaseInput } from '@chakra-ui/react'

interface IInput {
  children: JSX.Element
}

export const Input: FC<IInput> = ({ children, ...restOfProps }) => {
  return <BaseInput {...restOfProps}>{children}</BaseInput>
}
