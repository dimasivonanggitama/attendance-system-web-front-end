import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import React from 'react';

const EditRoleForm = (props) => {
    const editRoleSchema = useFormik({
        initialValues: {
            roleNameEdit: props.selectedRole
        },
        validationSchema: Yup.object({
            roleNameEdit: Yup.string()
                .matches(/^[a-zA-Z]+$/, "Hanya huruf yang diperbolehkan!")
                .required("Peran tidak boleh kosong!"),
        }),
        onSubmit: async values => {
            await axios.post("http://localhost:8000/api/admin/role/test", {
                roleNameEdit: values.roleNameEdit
            }).then(resp => {
                setIsModalEditOpened(false);
                fetchData();
            }).catch(error => {
                console.log(error.response.data.error);
                alert(error.response.data.message);
            });
        }
    });
    return (
        <div>EditRoleForm</div>
    )
}

export default EditRoleForm