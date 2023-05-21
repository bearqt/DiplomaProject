import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, Link, ThemeProvider, Typography, createTheme } from '@mui/material';
import { Formik, Form, ErrorMessage } from 'formik';
import React, { useState } from 'react';
import userStore from '../../stores/userStore';
import MyTextField from './MyTextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as yup from "yup";
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import SearchChatsList from './SearchChatsList';
import { Chat } from '../../models/chat';


const theme = createTheme();

export default observer(function JoinChatForm() {

    const { chatStore } = useStore();
    const [chats, setChats] = useState<Chat[]>();

    const validationSchema = yup.object({
        chatName: yup.string().required("Обязательное поле")
    });

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ chatName: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                chatStore.searchChats(values.chatName).then(() => setChats(chatStore.searchedChats!)).catch(error => {
                    setErrors({ error: "Неправильный логин или пароль" });
                })
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form
                    // style={{ paddingTop: "30px", paddingLeft: "30px" }}
                    className='ui form' autoComplete='off'>

                    <ThemeProvider theme={theme}>
                        <Container component="main" style={{ margin: "0" }}>
                            <CssBaseline />
                            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Вход
                                </Typography> */}
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >

                                <Box sx={{ mt: 1, ml: 2 }}>
                                    <MyTextField
                                        margin="normal"
                                        fullWidth={false}
                                        style={{ width: "300px" }}
                                        label="Название чата"
                                        name="chatName"
                                    />

                                    <Button
                                        type="submit"

                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, ml: 3 }}
                                    >
                                        Найти
                                    </Button>
                                    <SearchChatsList chats={chats!} />
                                    <Grid container>

                                        <Grid item>
                                            <ErrorMessage name='error'
                                                render={() =>
                                                    <Alert style={{ marginTop: "20px", maxWidth: "400px" }} severity="error">Произошла ошибка - {errors.error}</Alert>
                                                } />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Box>
                        </Container>
                    </ThemeProvider>
                    
                </Form>
            )}
            
        </Formik>
        
    )
})