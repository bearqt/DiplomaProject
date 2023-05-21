import React, { useEffect } from 'react';
import ChatListItem from './ChatListItem';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Box } from '@mui/material';


export default observer(function ChatList() {
    const { chatStore } = useStore();

    useEffect(() => {
        chatStore.loadChats();
    }, [chatStore])

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {chatStore.chats?.map(item => (
                <ChatListItem title={item.title} body={item.lastMessageBody} key={item.id} id={item.id}/>
            ))}
        </Box>
    )
})