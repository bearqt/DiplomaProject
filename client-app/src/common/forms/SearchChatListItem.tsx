import React from 'react';
import { Chat } from '../../models/chat';
import { ListItemButton, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import { useStore } from '../../stores/store';

interface Props {
    chat: Chat
}

export default function SearchChatListItem({chat}: Props) {
    const {chatStore} = useStore();

    return (
        <ListItemButton onClick={() => chatStore.joinChat(chat.id)}>
            <ListItemText primary={chat.title}>{chat.title}</ListItemText>
            <ListItemText secondary="в сети" ></ListItemText>
        </ListItemButton>
    )
}