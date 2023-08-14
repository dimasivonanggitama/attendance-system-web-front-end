import { Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import RoleForm from '../../components/form/RoleForm'

const RoleManagementPage = () => {
    const [data, setData] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/role')
            .then(response => {
                alert(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);
    return (
        <Dashboard>
            {/* <RoleForm> */}
            <Box bgColor={"white"} borderRadius={15}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th width={"5%"}>To convert</Th>
                                <Th >into</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td width={"5%"}>inches</Td>
                                <Td>millimetres (mm)</Td>
                            </Tr>
                            <Tr>
                                <Td width={"5%"}>feet</Td>
                                <Td>centimetres (cm)</Td>
                            </Tr>
                            <Tr>
                                <Td width={"5%"}>yards</Td>
                                <Td>metres (m)</Td>
                            </Tr>
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Td></Td>
                                <Td><RoleForm /></Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </Dashboard>
    )
}

export default RoleManagementPage