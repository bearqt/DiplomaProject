import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const {profileStore} = useStore();

    useEffect(() => {
        profileStore.loadProfile(username);
    }, [profileStore])

    return (
      <Card sx={{ maxWidth: 700, mt: 10, ml: 10 }}>
        {/* <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {profileStore.profile?.displayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Написать</Button>
          
        </CardActions>
      </Card>
    );
  })