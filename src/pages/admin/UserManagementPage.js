import React, { useEffect, useState } from 'react'
import Dashboard from '../user/Dashboard'
import { Box, Button, Checkbox, HStack, IconButton, Input, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, VStack, useDisclosure } from '@chakra-ui/react'
import { TbPencil, TbTrash, TbUserPlus } from 'react-icons/tb'
import ModalRegular from '../../components/modal/ModalRegular'
import InputWithError from '../../components/input/InputWithError'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";

const UserManagementPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const modalUserEdit = useDisclosure();
  const modalUserDelete = useDisclosure();

  const [user, setUser] = useState([]);

  const [checkedItems, setCheckedItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const fetchData = async () => {
      await axios.get('http://localhost:8000/api/admin/user')
      .then(response => {
          setUser(response.data);
          modalUserEdit.onClose();
          modalUserDelete.onClose();
          handleAllCheckboxChange(false);
          setIsLoadingDelete(false);
      })
      .catch(error => {
          console.error('Error fetching data: ', error);
      });
  }

  const handleCheckboxChange = (index) => {
    const checkboxStatus = [...checkedItems];
    checkboxStatus[index] = !checkboxStatus[index];
    setCheckedItems(checkboxStatus);
  }

  const handleAllCheckboxChange = (value) => {
      setAllChecked(value);
      setCheckedItems(Array(user.length).fill(value));
      setIndeterminate(false);
  }

  useEffect(() => {
      fetchData();
  }, []);

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
                  <Th>Email</Th>
                  <Th>Password</Th>
                  <Th>Nama Lengkap</Th>
                  <Th>Tanggal Lahir</Th>
                  <Th>Verifikasi Akun</Th>
                  <Th>Bergabung</Th>
                  <Th>Peran</Th>
                  <Th colSpan={3}>Peran</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  (user.length === 0)? <Tr>
                    <Td colSpan={2} textAlign={"center"}>Daftar pegawai akan muncul di sini</Td>
                  </Tr>
                  : user.map((item, index) => (
                    <Tr key={index} paddingY={0} bgColor={(checkedItems[index])? "orange.200" : ""} sx={{transition: 'background-color 0.25s ease'}}>
                      <Td width={"5%"}>
                        <Checkbox 
                            isChecked={checkedItems[index]}
                            onChange={() => handleCheckboxChange(index)}
                        />
                      </Td>
                      <Td width={"5%"}>{item.user_id}</Td>
                      <Td>{item.email}</Td>
                      <Td>{item.password}</Td>
                      <Td>{item.fullname}</Td>
                      <Td>{item.birthday}</Td>
                      <Td>{item.verified}</Td>
                      <Td>{item.createdAt}</Td>
                      <Td>{item.role_id}</Td>
                      {
                        (checkedItems[index])? 
                          <>
                            <Td width={"5%"}>
                              <IconButton colorScheme='green' aria-label='Edit User' icon={<TbPencil />} onClick={() => { setSelectedUser(user[index]); modalUserEdit.onOpen(); }} marginRight={5}/>
                              <IconButton colorScheme='red' aria-label='Delete User' icon={<TbTrash />} onClick={() => { setSelectedUser(user[index]); modalUserDelete.onOpen(); }}/>
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
                  {/* <Td><RoleForm fetchData={fetchData}/></Td> */}
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Dashboard>
  )
}

export default UserManagementPage