import React from 'react'
import {
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
import { useSortData } from 'hooks/useSortData'

const TeamLogs = ({ logs }) => {
  const [newLogs, SortDropdown] = useSortData(logs)
  console.log(newLogs)

  return (
    <>
      <HStack justify="space-between">
        <Heading>Logs</Heading>
        <SortDropdown />
      </HStack>
      <TableContainer overflowY="auto" maxHeight="300px">
        <Table>
          <Thead position="sticky" top={1}>
            <Tr bgColor="white">
              <Th bgColor={LIGHT_GRAY}>User Name</Th>
              <Th bgColor={LIGHT_GRAY}>Team Id</Th>
              <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                Status
              </Th>
              <Th borderRadius="0 1rem 1rem 0" bgColor={LIGHT_GRAY}>
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody maxH="100px" overflowY="scroll">
            {newLogs &&
              newLogs.map((log) => (
                <Tr key={log.id}>
                  <Td>{log.user.name}</Td>
                  <Td>{log.teamId}</Td>
                  <Td>{log.status}</Td>
                  <Td>{log.createdAt}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  )
}

export default TeamLogs
