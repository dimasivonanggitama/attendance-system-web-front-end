import React from 'react'
import Dashboard from '../user/Dashboard'
import { Box, HStack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import { TbUserPlus } from 'react-icons/tb'

const UserManagementPage = () => {
  return (
    <Dashboard>
      <Box >
        <Box display={"flex"} marginBottom={5}>
          <HStack borderRadius={15} boxShadow={"md"} padding={"3"} width={"auth"} bgColor={"white"} _hover={{background: "gray.200"}} >
            <TbUserPlus size={25}/>
            <Text>Tambah Pegawai</Text>
          </HStack>
        </Box>
        <Box bgColor={"white"} borderRadius={15}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th >into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
                <Tr>
                  <Td>feet</Td>
                  <Td>centimetres (cm)</Td>
                  <Td isNumeric>30.48</Td>
                </Tr>
                <Tr>
                  <Td>yards</Td>
                  <Td>metres (m)</Td>
                  <Td isNumeric>0.91444</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Dashboard>
  )
}

export default UserManagementPage