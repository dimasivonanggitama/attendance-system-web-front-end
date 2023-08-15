import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import React, { useState } from 'react';
import ModalRegular from '../modal/ModalRegular';
import InputWithError from '../input/InputWithError';
import { Box, Button, Input, ModalBody, ModalFooter, ModalHeader, Text } from '@chakra-ui/react';
import { TbShieldCog } from 'react-icons/tb';

const EditRoleForm = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const modalRoleEditTitle = <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <TbShieldCog size={70}/>
        <Text as={"b"} fontSize="2xl">Ubah Peran</Text>
    </Box>;
    
    const editRoleSchema = useFormik({
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
            await axios.patch("http://localhost:8000/api/admin/role/update", {
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
        <form onSubmit={editRoleSchema.handleSubmit}>
            <ModalHeader>{modalRoleEditTitle}</ModalHeader>
                <ModalBody textAlign={"center"}>
                    <InputWithError margin={"0"} padding={"1"} errors={editRoleSchema.errors.roleNameEdit} touched={editRoleSchema.touched.roleNameEdit}>
                        <Input type="text" name="roleNameEdit" placeholder='Ubah peran' bgColor="white" borderColor={"grey"} color={"black"} value={editRoleSchema.values.roleNameEdit} onChange={editRoleSchema.handleChange}/>
                    </InputWithError>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" colorScheme={"green"} isLoading={isLoading}>Simpan</Button>
                </ModalFooter>
        </form>
    )
}

export default EditRoleForm