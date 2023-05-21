import { Button, Checkbox, FormControl, FormHelperText, Input, InputLabel, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useStore } from '../../stores/store';
import agent from '../../api/agent';
import { CreateFormValues } from './createFormValues';
import * as yup from "yup";
import { Form, Formik, useFormik } from 'formik';
import MyTextField from './MyTextField';
import {history} from "../../index";


export default function CreateChatForm() {
    const { chatStore } = useStore();

    const validationSchema = yup.object({
        title: yup.string().required("Обязательное поле").min(5, "Поле должно содержать хотя бы 5 символов"),
        description: yup.string().required("Обязательное поле")
    });

    return (

            <Formik
                initialValues={{ title: "", description: "" }}
                onSubmit={(values, { setErrors }) => {
                    chatStore
                        .createChat(values).catch(error => {
                            setErrors(error);
                        });
                    history.push("/");
                }}
                validationSchema={validationSchema}

            >
                {({ handleSubmit, errors }) => (
                    <Form style={{ paddingTop: "70px", paddingLeft: "70px" }} onSubmit={handleSubmit}>
                        <Typography variant='h4' gutterBottom>
                            Создать новый чат
                        </Typography>

                        <MyTextField name='title' label='Название чата' />
                        <MyTextField name='description' label="Описание" multiline rows={5} />

                        <Button
                            variant="contained"
                            type='submit'
                            sx={{ float: 'inline-start', maxWidth: "100px" }}
                        >
                            Создать
                        </Button>
                    </Form>
                )}
            </Formik>

    )
}