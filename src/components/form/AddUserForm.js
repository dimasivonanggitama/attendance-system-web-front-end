import { Box, Button, Input, ModalBody, ModalFooter, ModalHeader, Select, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import React, { useState } from 'react'
import InputWithError from '../input/InputWithError';
import { TbUserPlus } from 'react-icons/tb';

const AddUserForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const modalAddUserTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <TbUserPlus size={70}/>
      <Text as={"b"} fontSize="2xl">Tambah Pegawai</Text>
    </Box>;
    
    const AddUserSchema = useFormik({
        initialValues: {
            roleNameEdit: props.selectedRole.role_name
        },
        validationSchema: Yup.object({
            roleNameEdit: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
                .required("Peran tidak boleh kosong!"),
        }),
        onSubmit: async values => {
            setIsLoading(true)
            await axios.patch("http://localhost:8000/api/admin/user/update", {
                roleNameEdit: values.roleNameEdit,
                roleIDEdit: props.selectedRole.role_id
            }).then(resp => {
                setIsLoading(false);
                props.fetchData();
            }).catch(error => {
                setIsLoading(false);
                // alert(error.response.data.message);
            });
        }
    });
    return (
        <form onSubmit={AddUserSchema.handleSubmit}>
            <ModalHeader>{modalAddUserTitle}</ModalHeader>
                <ModalBody textAlign={"center"}>
                    <InputWithError errors={AddUserSchema.errors.email} touched={AddUserSchema.touched.email}>
                        <Input type="text" name="email" placeholder='Alamat email' bgColor="white" borderColor={"grey"} color={"black"} value={AddUserSchema.values.email} onChange={AddUserSchema.handleChange}/>
                    </InputWithError>
                    <InputWithError errors={AddUserSchema.errors.fullname} touched={AddUserSchema.touched.fullname}>
                        <Input type="text" name="fullname" placeholder='Nama lengkap' bgColor="white" borderColor={"grey"} color={"black"} value={AddUserSchema.values.fullname} onChange={AddUserSchema.handleChange}/>
                    </InputWithError>
                    <InputWithError errors={AddUserSchema.errors.role} touched={AddUserSchema.touched.role}>
                        <Select name='role' placeholder='- - - Pilih peran - - -' bgColor="white" borderColor={"grey"} color={"black"} >
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>
                        </Select>
                    </InputWithError>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" colorScheme={"green"} isLoading={isLoading}>Simpan</Button>
                </ModalFooter>
        </form>
    )
}

export default AddUserForm