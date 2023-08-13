import React from 'react'
import Dashboard from '../user/Dashboard'
import { Box, Button, HStack, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import { TbUserPlus } from 'react-icons/tb'
import ModalRegular from '../../components/modal/ModalRegular'
import InputWithError from '../../components/input/InputWithError'

const UserManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const modalTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
    <TbUserPlus size={70}/>
    <Text as={"b"} fontSize="2xl">Tambah Pegawai</Text>
  </Box>;
  return (
    <Dashboard>
      <Box >
        <Box display={"flex"} marginBottom={5}>
          <HStack borderRadius={15} boxShadow={"md"} padding={"3"} width={"auth"} bgColor={"white"} _hover={{background: "gray.200", cursor: "pointer"}} onClick={onOpen}>
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
          <ModalRegular title={modalTitle} isOpen={isOpen} onCloseX={onClose} primaryButton="Tambah" primaryButtonColor="green">
            <InputWithError errors={addEmployeeSchema.errors.email} touched={addEmployeeSchema.touched.email}>
              <Input type="text" name="email" placeholder='Alamat email' bgColor="white" borderColor={"grey"} color={"black"} value={addEmployeeSchema.values.email} onChange={addEmployeeSchema.handleChange}/>
            </InputWithError>
            <InputWithError errors={addEmployeeSchema.errors.fullname} touched={addEmployeeSchema.touched.fullname}>
              <Input type="text" name="fullname" placeholder='Nama lengkap' bgColor="white" borderColor={"grey"} color={"black"} value={addEmployeeSchema.values.fullname} onChange={addEmployeeSchema.handleChange}/>
            </InputWithError>
            <InputWithError errors={addEmployeeSchema.errors.role} touched={addEmployeeSchema.touched.role}>
              <Select name='role' placeholder='- - - Pilih peran - - -' bgColor="white" borderColor={"grey"} color={"black"} >
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </Select>
            </InputWithError>
          </ModalRegular>
        </Box>
      </Box>
    </Dashboard>
  )
}

export default UserManagementPage