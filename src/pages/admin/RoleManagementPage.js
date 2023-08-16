import { Box, Button, Checkbox, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import RoleForm from '../../components/form/RoleForm'
import { TbPencil, TbShieldCancel, TbShieldCog, TbTrash, TbUserShield } from 'react-icons/tb'
import EditRoleForm from '../../components/form/EditRoleForm'
import ModalBlank from '../../components/modal/ModalBlank'
import ModalRegular from '../../components/modal/ModalRegular'

const RoleManagementPage = () => {
    const modalRoleEdit = useDisclosure();
    const modalRoleDelete = useDisclosure();

    const [role, setRole] = useState([]);

    const [checkedItems, setCheckedItems] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    const [isLoadingDelete, setIsLoadingDelete] = useState(false);
    
    const deleteRole = async () => {
        setIsLoadingDelete(true);
        await axios.delete('http://localhost:8000/api/admin/delete', {
            roleIDDelete: selectedRole
        })
        .then(response => {
            setRole(response.data);
            modalRoleDelete.onClose();
            handleAllCheckboxChange(false);
            setIsLoadingDelete(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            alert('Error fetching data: ', error);
            setIsLoadingDelete(false);
        });
    }

    const fetchData = async () => {
        await axios.get('http://localhost:8000/api/admin/role')
        .then(response => {
            setRole(response.data);
            modalRoleEdit.onClose();
            handleAllCheckboxChange(false);
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const modalTitleRoleDelete = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <TbShieldCancel size={70}/>
        <Text as={"b"} fontSize="2xl">Hapus Peran</Text>
    </Box>;

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
                    <Table variant="simple" gap={0}>
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
                                <Th colSpan={3}>Peran</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                (role.length === 0)? <Tr>
                                    <Td colSpan={2} textAlign={"center"}>Daftar peran akan muncul di sini</Td>
                                </Tr>
                                : role.map((item, index) => (
                                    <Tr key={index} paddingY={0} bgColor={(checkedItems[index])? "orange.200" : ""} sx={{transition: 'background-color 0.25s ease'}}>
                                        <Td width={"5%"}>
                                            <Checkbox 
                                                isChecked={checkedItems[index]}
                                                onChange={() => handleCheckboxChange(index)}
                                            />
                                        </Td>
                                        <Td width={"5%"}>{item.role_id}</Td>
                                        <Td>{item.role_name}</Td>
                                        {
                                            (checkedItems[index])? 
                                                <>
                                                    <Td width={"5%"}>
                                                        <IconButton colorScheme='green' aria-label='Edit Role' icon={<TbPencil />} onClick={() => { setSelectedRole(role[index]); modalRoleEdit.onOpen(); }} marginRight={5}/>
                                                        <IconButton colorScheme='red' aria-label='Delete Role' icon={<TbTrash />} onClick={() => { setSelectedRole(role[index]); modalRoleDelete.onOpen(); }}/>
                                                    </Td>
                                                </> 
                                            : <></>
                                        }
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
            <ModalBlank isOpen={modalRoleEdit.isOpen} onCloseX={modalRoleEdit.onClose}>
                <EditRoleForm fetchData={fetchData} selectedRole={selectedRole}/>
            </ModalBlank>
            <ModalRegular isOpen={modalRoleDelete.isOpen} onCloseX={modalRoleDelete.onClose} title={modalTitleRoleDelete} primaryButton={"Hapus"} primaryButtonColor={"red"} onSubmit={deleteRole} isLoading={isLoadingDelete}>
                <Text as="b" fontSize={"md"}>Apakah anda yakin ingin menghapus peran ini?</Text>
                <Text>Peran yang dihapus tidak dapat kembali lagi</Text>
            </ModalRegular>
        </Dashboard>
    )
}

export default RoleManagementPage