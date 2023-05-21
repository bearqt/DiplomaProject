import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { useStore } from '../../stores/store';
import { Message } from '../../models/message';
import { List } from '@mui/material';
import MessageItem from './MessageItem';

interface Props {
    messages: Message[];
}

export default observer(function MessageList({ messages }: Props) {
    const scrollRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return (
        <List style={{ height: '70vh', overflowY: 'auto' }}>
            {messages?.map(item => (
                <MessageItem message={item} key={item.id} />
            ))}
            <div ref={scrollRef} />
        </List>
    )
})