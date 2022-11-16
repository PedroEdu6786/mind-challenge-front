import React, { useEffect, useState } from 'react'
import {
  Button,
  Heading,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useAdminRoute from 'hooks/useAdminRoute'
import { LIGHT_GRAY } from 'constants/colors'
import useUserAuth from 'hooks/useUserAuth'
import { accountService } from 'services/account/accountService'

interface IAccount {
  id: number
  accountName: string
  clientName: string
  headOfOperation: string
}

const accounts: IAccount[] = [
  {
    id: 1,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 2,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 3,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 4,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 5,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 6,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 7,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 8,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
  {
    id: 9,
    accountName: 'Kueski',
    clientName: 'Johnathan Smith',
    headOfOperation: 'John Doe',
  },
]

const Account = () => {
  const [authData] = useUserAuth()
  const [accountsInfo, setUserInfo] = useState<IAccount[]>(null)

  useAdminRoute()

  useEffect(() => {
    const fetchData = { token: authData.token }
    if (!accountsInfo) {
      accountService
        .fetchAccounts({ userData: fetchData, remember: true })
        .then((data: IAccount[]) => {
          setUserInfo(data)
          console.log(data)
        })
    }
  }, [authData, accountsInfo])

  return (
    <DashboardLayout>
      <Stack h="100%" spacing="2rem">
        <Heading>Accounts</Heading>
        <Button maxW="150px" colorScheme="twitter">Add Account</Button>
        {accountsInfo && (
          <TableContainer overflowY="auto" maxHeight="300px">
            <Table>
              <Thead position="sticky" top={0}>
                <Tr bgColor="white">
                  <Th borderRadius="1rem 0 0 1rem" bgColor={LIGHT_GRAY}>
                    Name
                  </Th>
                  <Th bgColor={LIGHT_GRAY}>Client Name</Th>
                  <Th bgColor={LIGHT_GRAY}>Head of operation</Th>
                  <Th borderRadius="0 1rem 1rem 0" bgColor={LIGHT_GRAY}>
                    Team
                  </Th>
                </Tr>
              </Thead>
              <Tbody maxH="100px" overflowY="scroll">
                {accountsInfo.map((account: IAccount) => (
                  <Tr key={account.id}>
                    <Td>{account.accountName}</Td>
                    <Td>{account.clientName}</Td>
                    <Td>{account.headOfOperation}</Td>
                    <Td>Ver más</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </DashboardLayout>
  )
}

export default Account
