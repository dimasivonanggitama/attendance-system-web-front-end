import React from 'react'
import Dashboard from '../user/Dashboard'
import { Box, Button, HStack, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import { TbUserPlus } from 'react-icons/tb'
import ModalRegular from '../../components/modal/ModalRegular'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";

const UserManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);

  const addEmployeeSchema = useFormik({
      initialValues: {
          email: "",
          fullname: "",
          role_id: ""
      },
      validationSchema: Yup.object({
          email: Yup.string()
              .email("Format email tidak benar!")
              .required("Username tidak boleh kosong!"),
          password: Yup.string()
              .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+=,{}[\]|:;'"><>?/])[a-zA-Z\d`~!@#$%^&*()_+=,{}[\]|:;'"><>?/]+$/, "Kata sandi harus kombinasi alphanumerik dan karakter spesial!")
              .min(6, "Kata sandi setidaknya minimal 6 karakter!")
              .required("Kata sandi tidak boleh kosong!")
      }),
      onSubmit: async values => {
          // alert(JSON.stringify(values, null, 2));

          // const axios = require("axios");
          await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
              username: values.username,
              password: values.password
          }).then(resp => {
              alert(`[resp.data]: ${resp.data}`);
          }).catch(error => {
              alert(`[error.response.data.err] ${error.response.data.err}`);
          });
          alert("Done");
      }
  });

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