import {
  Button,
  Heading,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { LIGHT_GRAY } from 'constants/colors'
import { IUser } from 'dtos/user'
import React from 'react'

const TeamMembers = ({
  selectedTeam,
  onOpen,
  handleDeleteTeam,
  handleDeleteMember,
}) => {
  return (
    <>
      <HStack justify="space-between">
        <Heading>Team Members</Heading>
        <HStack>
          <Button isDisabled={Boolean(!selectedTeam)} onClick={onOpen}>
            Add Member
          </Button>
          <Button
            isDisabled={Boolean(!selectedTeam)}
            onClick={handleDeleteTeam}
            variant="outline"
          >
            Delete Team
          </Button>
        </HStack>
      </HStack>
      <TableContainer overflowY="auto" maxHeight="300px">
        <Table>
          <Thead position="sticky" top={1}>
            <Tr bgColor="white">
              <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                Name
              </Th>
              <Th bgColor={LIGHT_GRAY}>Details</Th>
              <Th borderRadius="0 1rem 1rem 0" bgColor={LIGHT_GRAY}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody maxH="100px" overflowY="scroll">
            {selectedTeam &&
              selectedTeam.map((user: IUser) => (
                <Tr key={user.id}>
                  <Td>{user.name}</Td>
                  <Td>
                    {/* <Link to={`users/${user.id}`}>View More</Link> */}
                  </Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      onClick={() => handleDeleteMember(user.id)}
                    >
                      Remove
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TeamMembers
