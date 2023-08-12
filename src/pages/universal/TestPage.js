import React from 'react'
import Dashboard from '../user/Dashboard'
import { Box, HStack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { TbUserPlus } from 'react-icons/tb'
import Header from '../../components/section/Header'
import Sidebar from '../../components/section/Sidebar'

const TestPage = () => {
  return (
    
    <Box height={"90vh"}>
      {/* <Header /> */}
      <Box display={"flex"} flexDirection={"row"}>
        <Sidebar/>
        <Box maxHeight={"90vh"} width="100%" padding={5} bgColor={"lightgrey"} overflowY={"auto"}>
            <Box padding={5} bgColor={"grey"}>
                <Box borderRadius={15} bgColor={"white"} padding={5}>
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
        </Box>
      </Box>
    </Box>
    
  )
}

export default TestPage