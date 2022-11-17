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
  useDisclosure,
} from '@chakra-ui/react'

import DashboardLayout from 'components/templates/DashboardLayout'
import useAdminRoute from 'hooks/useAdminRoute'
import { LIGHT_GRAY } from 'constants/colors'
import useUserAuth from 'hooks/useUserAuth'
import { accountService } from 'services/account/accountService'
import AccountRegister from 'components/organisms/AccountRegister'
import { Link } from 'components/atoms/Link'

interface IAccount {
  id: number
  accountName: string
  clientName: string
  headOfOperation: string
}

const Account = () => {
  const [authData] = useUserAuth()
  const [accountsInfo, setAccountsInfo] = useState<IAccount[]>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  useAdminRoute()

  const { userData } = authData
  useEffect(() => {
    if (!accountsInfo && userData) {
      const fetchData = { token: authData.token }
      accountService
        .fetchAccounts({ userData: fetchData, remember: true })
        .then((data: IAccount[]) => {
          setAccountsInfo(data)
        })
    }
  }, [authData, accountsInfo, userData])

  return (
    <DashboardLayout>
      <AccountRegister isOpen={isOpen} onClose={onClose} />
      <Stack h="100%" spacing="2rem">
        <Heading>Accounts</Heading>
        <Button maxW="150px" colorScheme="twitter" onClick={onOpen}>
          Add Account
        </Button>
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
                    <Td>
                      <Link to={`${account.id}`}>Ver más</Link>
                    </Td>
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
