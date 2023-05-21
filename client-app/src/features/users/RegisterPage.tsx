import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import * as yup from "yup";
import MyTextField from '../../common/forms/MyTextField';
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useStore } from '../../stores/store';
import { Copyright } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default observer(function RegisterPage() {
    const { userStore } = useStore();

    const validationSchema = yup.object({
        username: yup.string().required("Обязательное поле").min(5, "Минимум 5 символов").max(20, "Максимум 20 символов"),
        displayName: yup.string().required("Обязательное поле").min(5, "Минимум 5 символов").max(20, "Максимум 20 символов"),
        email: yup.string().required("Обязательное поле").email("Введите корректный Email"),
        password: yup.string().required("Обязательное поле").min(8, "Минимум 8 символов").max(15, "Максимум 15 символов"),
        bio: yup.string().required("Обязательное поле")
    });

    const theme = createTheme();

    return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{ email: '', password: '', username: '', displayName: '', bio: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.register(values).catch(error => {
                    setErrors({ error: "Неправильный логин или пароль" });
                })
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form
                    style={{ paddingTop: "30px", paddingLeft: "30px" }}
                    className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                    {/* <Typography variant='h4'>
                            Регистрация
                        </Typography>
                    
                    <MyTextField label='Имя пользователя' name='username' />
                    <MyTextField label='Отображаемое имя' name='displayName' />
                    <MyTextField label='Email' name='email' />
                    <MyTextField label='Пароль' name='password' type='password' />
                    <MyTextField label='О себе' name='bio'/>

                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ float: 'inline-start', maxWidth: "100px" }}
                    >
                        Войти
                    </Button>
                    <ErrorMessage name='error'
                        render={() =>
                            <Alert style={{ marginTop: "20px", maxWidth: "400px" }} severity="error">Произошла ошибка - {errors.error}</Alert>

                        } /> */}
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
                                    Регистрация
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>

                                            <MyTextField
                                                label='Имя пользователя'
                                                name='username'
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="username"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <MyTextField
                                                label='Отображаемое имя'
                                                name='displayName'
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="displayName"
                                                
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <MyTextField
                                                label='Email'
                                                name='email'
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="email"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MyTextField
                                                label='Пароль'
                                                name='password'
                                                type='password'
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="password"
                                                
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MyTextField

                                                label='О себе'
                                                name='bio'
                                                autoComplete="given-name"
                                                required
                                                fullWidth
                                                id="bio"
                                                
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                                label="I want to receive inspiration, marketing promotions and updates via email."
                                            />
                                        </Grid> */}
                                    </Grid>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Зарегистрироваться
                                    </Button>
                                    <Grid container justifyContent="flex-end">
                                        <Grid item>
                                            <Link href="/login" variant="body2">
                                                Уже есть аккаунт? Войти
                                            </Link>
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