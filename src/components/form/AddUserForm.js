import { Box, Button, Input, ModalBody, ModalFooter, ModalHeader, Select, Text } from '@chakra-ui/react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InputWithError from '../input/InputWithError';
import { TbUserPlus } from 'react-icons/tb';

const AddUserForm = (props) => {
    const [role, setRole] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const modalAddUserTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
      <TbUserPlus size={70}/>
      <Text as={"b"} fontSize="2xl">Tambah Pegawai</Text>
    </Box>;

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
    }, [])
    
    const AddUserSchema = useFormik({
        initialValues: {
            email: "",
            fullname: "",
            role: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Format email tidak valid!")
                .required("Email tidak boleh kosong!"),
            fullname: Yup.string()
                .matches(/^[a-zA-Z ]+$/, "Hanya huruf dan spasi yang diperbolehkan!")
                .required("Nama lengkap tidak boleh kosong!"),
            role: Yup.string()
                .required("Peran harus dipilih!"),
        }),
        onSubmit: async values => {
            setIsLoading(true)
            await axios.patch("http://localhost:8000/api/admin/user/addadd", {
                email: values.email,
                fullname: values.fullname,
                role: values.role
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
                <InputWithError margin={"0"} padding={"1"} errors={AddUserSchema.errors.email} touched={AddUserSchema.touched.email}>
                    <Input type="text" name="email" placeholder='Alamat email' bgColor="white" borderColor={"grey"} color={"black"} value={AddUserSchema.values.email} onChange={AddUserSchema.handleChange}/>
                </InputWithError>
                <InputWithError margin={"0"} padding={"1"} errors={AddUserSchema.errors.fullname} touched={AddUserSchema.touched.fullname}>
                    <Input type="text" name="fullname" placeholder='Nama lengkap' bgColor="white" borderColor={"grey"} color={"black"} value={AddUserSchema.values.fullname} onChange={AddUserSchema.handleChange}/>
                </InputWithError>
                <InputWithError margin={"0"} padding={"1"} errors={AddUserSchema.errors.role} touched={AddUserSchema.touched.role}>
                    <Select name='role' placeholder='- - - Pilih peran - - -' bgColor="white" borderColor={"grey"} color={"black"} value={AddUserSchema.values.role} onChange={AddUserSchema.handleChange} >
                        {
                            role.map((item) => (
                                <option value={item.role_id}>{item.role_name}</option>
                            ))
                        }
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