import { Box, Checkbox, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import RoleForm from '../../components/form/RoleForm'

const RoleManagementPage = () => {
    const [role, setRole] = useState([]);
    const [checkedItems, setCheckedItems] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    // const indeterminate = checkedItems.includes(true) && checkedItems.includes(false);
    const [indeterminate, setIndeterminate] = useState(false);
    
    const fetchData = async () => {
        await axios.get('http://localhost:8000/api/admin/role')
        .then(response => {
            setRole(response.data);
            handleAllCheckboxChange(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckboxChange = (index) => {
        const checkboxStatus = [...checkedItems];
        checkboxStatus[index] = !checkboxStatus[index];
        setCheckedItems(checkboxStatus);
    }

    const handleAllCheckboxChange = (value) => {
        setAllChecked(value);
        setCheckedItems(Array(role.length).fill(value));
        setIndeterminate(false);
    }

    useEffect(() => {
        if (checkedItems.includes(true) && checkedItems.includes(false)) {
            setAllChecked(false);
            setIndeterminate(true);
        }
        else if (checkedItems.includes(true) && checkedItems.includes(false) === false) {
            setAllChecked(true);
            setIndeterminate(false);
        } else {
            setAllChecked(false);
            setIndeterminate(false);
        }
    }, [checkedItems]);
    return (
        <Dashboard>
            <Box bgColor={"white"} borderRadius={15}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th width={"5%"}>
                                    <Checkbox
                                        isChecked={allChecked}
                                        isIndeterminate={indeterminate}
                                        onChange={() => handleAllCheckboxChange(!allChecked)}
                                    />
                                </Th>
                                <Th width={"5%"}>ID</Th>
                                <Th>Peran</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                (role.length === 0)? <Tr>
                                    <Td colSpan={2} textAlign={"center"}>Daftar peran akan muncul di sini</Td>
                                </Tr>
                                : role.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <Checkbox 
                                                isChecked={checkedItems[index]}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </Td>
                                        <Td width={"5%"}>{item.role_id}</Td>
                                        <Td>{item.role_name}</Td>
                                    </Tr>
                                ))
                            }
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                <Td></Td>
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