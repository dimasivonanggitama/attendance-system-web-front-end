import { Box, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import RoleForm from '../../components/form/RoleForm'

const RoleManagementPage = () => {
    const [role, setRole] = useState([]);
    
    const fetchData = async () => {
        await axios.get('http://localhost:8000/api/admin/role')
        .then(response => {
            setRole(response.data);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Dashboard>
            <Box bgColor={"white"} borderRadius={15}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th width={"5%"}>ID</Th>
                                <Th>Peran</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                (role.length === 0)? <Tr>
                                    <Td colSpan={2} textAlign={"center"}>Daftar peran akan muncul di sini</Td>
                                </Tr>
                                : role.map(item => (
                                    <Tr>
                                        <Td width={"5%"}>{item.role_id}</Td>
                                        <Td>{item.role_name}</Td>
                                    </Tr>
                                ))
                            }
                            {/* <Tr>
                                <Td width={"5%"}>feet</Td>
                                <Td>centimetres (cm)</Td>
                            </Tr> */}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Td></Td>
                                <Td><RoleForm fetchData={fetchData}/></Td>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </Box>
        </Dashboard>
    )
}

export default RoleManagementPage