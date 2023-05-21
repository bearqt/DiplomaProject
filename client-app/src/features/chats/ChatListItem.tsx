import { Avatar, Button, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import React from 'react';
import { blueGrey } from '@mui/material/colors';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import {Link} from 'react-router-dom';

interface Props {
    title: string;
    body: string;
    id: string;
}

export default observer(function ChatListItem({ title, body, id }: Props) {
    const { chatStore } = useStore();
    const { selectChat } = chatStore;


    return (
        <ListItemButton
            href={`/chats/${id}`}
            alignItems="flex-start"
            selected={chatStore.selectedChat?.id === id}
            onClick={(event) => selectChat(id)}
        >
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ bgcolor: blueGrey[500] }}>
                    <AccountBoxIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >

                        </Typography>
                        {body}
                    </React.Fragment>
                }
            />
        </ListItemButton>
    )
})