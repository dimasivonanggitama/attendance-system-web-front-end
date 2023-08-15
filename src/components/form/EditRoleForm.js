import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import React from 'react';
import ModalRegular from '../modal/ModalRegular';
import InputWithError from '../input/InputWithError';
import { Box, Input, Text } from '@chakra-ui/react';
import { TbShieldCog } from 'react-icons/tb';

const EditRoleForm = (props) => {
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
            await axios.post("http://localhost:8000/api/admin/role/test", {
                roleNameEdit: values.roleNameEdit,
                roleIDEdit: props.selectedRole.role_id
            }).then(resp => {
                props.fetchData();
            }).catch(error => {
                console.log(error.response.data.error);
                alert(error.response.data.message);
            });
        }
    });
    return (
        <InputWithError margin={"0"} padding={"1"} errors={editRoleSchema.errors.roleNameEdit} touched={editRoleSchema.touched.roleNameEdit}>
            <Input type="text" name="roleNameEdit" placeholder='Ubah peran' bgColor="white" borderColor={"grey"} color={"black"} value={editRoleSchema.values.roleNameEdit} onChange={editRoleSchema.handleChange}/>
        </InputWithError>
    )
}

export default EditRoleForm