import { Box, Button, FormControl, HStack, Input } from '@chakra-ui/react'
import React from 'react'
import InputWithError from '../input/InputWithError'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from "yup";

const RoleForm = () => {
    const addRoleSchema = useFormik({
        initialValues: {
            roleName: ""
        },
        validationSchema: Yup.object({
            roleName: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
                .required("Peran tidak boleh kosong!"),
        }),
        onSubmit: async values => {
            // alert(JSON.stringify(values, null, 2));
  
            // const axios = require("axios");
            await axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", {
                roleName: values.roleName
            }).then(resp => {
                alert(`[resp.data]: ${resp.data}`);
            }).catch(error => {
                alert(`[error.response.data.err] ${error.response.data.err}`);
            });
            alert("Done");
        }
    });
  return (
    <form onSubmit={addRoleSchema.handleSubmit}>
        <HStack>
            <InputWithError margin={"0"} padding={"1"} errors={addRoleSchema.errors.roleName} touched={addRoleSchema.touched.roleName}>
                <Input type="text" name="roleName" placeholder='Tambahkan peran ...' bgColor="white" borderColor={"grey"} color={"black"} value={addRoleSchema.values.email} onChange={addRoleSchema.handleChange}/>
            </InputWithError>
            <Button type="submit" colorScheme={"green"}>Tambah</Button>
        </HStack>
    </form>
  )
}

export default RoleForm