import { Button, Grid, Icon, IconButton, Stack } from '@mui/material';
import React from 'react';

export default function Home() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
        >
            <Grid item xs={2}>
                <Button href='/createChat' variant="contained" size='large' color='primary'>Создать новый чат</Button>
            </Grid>

            <Grid item xs={2}>
                <Button href='/joinChat' variant="contained" size='large' color='success'>Присоединиться к чату</Button>
            </Grid>

            <Grid item xs={2}>
                <Button variant="contained" size='large' color='secondary'>Создать новый контакт</Button>
            </Grid>

        </Grid>
    )
}