import { Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import RoleForm from '../../components/form/RoleForm'

const RoleManagementPage = () => {
    const [role, setRole] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/admin/role')
        .then(response => {
            setRole(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }, []);
    console.log(role)
    return (
        <Dashboard>
            {/* <RoleForm> */}
            <Box bgColor={"white"} borderRadius={15}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th width={"5%"}>iD</Th>
                                <Th>Peran</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                (role.length === 0)? 
                                    <Tr>
                                        <Td colSpan={2} textAlign={"center"}>Daftar peran akan muncul di sini</Td>
                                    </Tr>
                                : <></>
                            }
                            {/* <Tr>
                                <Td width={"5%"}>feet</Td>
                                <Td>centimetres (cm)</Td>
                            </Tr> */}
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