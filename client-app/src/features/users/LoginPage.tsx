import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import MyTextField from '../../common/forms/MyTextField';
import { Copyright, Label } from '@mui/icons-material';
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import * as yup from "yup";
import { useStore } from '../../stores/store';
import { LoadingButton } from '@mui/lab';
import { observer } from 'mobx-react-lite';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const theme = createTheme();

export default observer(function LoginPage() {
    const { userStore } = useStore();

    const validationSchema = yup.object({
        email: yup.string().required("Обязательное поле")
            .email("Введите корректный Email"),
        password: yup.string().required("Обязательное поле")
            .min(8, "Пароль слишком короткий")
            .max(30, "Пароль слишком длинный")
    });

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.login(values).catch(error => {
                    setErrors({ error: "Неправильный логин или пароль" });
                })
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form
                    style={{ paddingTop: "30px", paddingLeft: "30px" }}
                    className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                    <ThemeProvider theme={theme}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Вход
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                    <MyTextField
                                        margin="normal"
                                        fullWidth
                                        label="Email"
                                        name="email"
                                    />
                                    <MyTextField
                                        margin="normal"

                                        fullWidth
                                        name="password"
                                        label="Пароль"
                                        type="password"
                                    />
                                    {/* <FormControlLabel
                                        control={<Checkbox value="remember" color="primary" />}
                                        label="Remember me"
                                    /> */}
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Войти
                                    </Button>
                                    <Grid container>
                                        {/* <Grid item xs>
                                            <Link href="#" variant="body2">
                                                Forgot password?
                                            </Link>
                                        </Grid> */}
                                        <Grid item>
                                            <Link href="/register" variant="body2">
                                                {"Нет аккаунта? Зарегистрироваться"}
                                            </Link>
                                        </Grid>
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
                    {/* <Typography variant='h4'>
                            Вход
                        </Typography>
                    <MyTextField label='Email' name='email' />
                    <MyTextField label='Пароль' name='password' type='password' />

                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ float: 'inline-start', maxWidth: "100px", marginBottom: "20px" }}
                    >
                        Войти
                    </Button>
                    <br />
                    <Link href="/register">Нет аккаунта? Зарегистрироваться</Link>
                    <ErrorMessage name='error'
                        render={() =>
                            <Alert style={{ marginTop: "20px", maxWidth: "400px" }} severity="error">Произошла ошибка - {errors.error}</Alert>

                        } /> */}
                </Form>
            )}
        </Formik>
    )
})