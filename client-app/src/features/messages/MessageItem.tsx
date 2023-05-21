import React from 'react';
import { Message } from '../../models/message';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

interface Props {
    message: Message;
}

export default function MessageItem({ message }: Props) {
    return (
        // Чтобы сделать отображение сообщений автора с правой стороны, добавить style={{textAlign: "right"}} и что нибудь потому придумать с аватаркой
        <ListItem>
            <ListItemAvatar>
                <Avatar alt={message.authorDisplayName} src="/static/images/avatar/1.jpg"/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography color="primary">{message.authorDisplayName}</Typography>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {message.body}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}