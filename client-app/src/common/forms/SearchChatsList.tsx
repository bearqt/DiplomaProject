import { observer } from 'mobx-react-lite';
import React from 'react';
import { Chat } from '../../models/chat';
import SearchChatListItem from './SearchChatListItem';

interface Props {
    chats: Chat[]
}

export default observer(function SearchChatsList({ chats }: Props) {

    return (
        <>
            {chats?.map((item, index) => (
                <SearchChatListItem key={index} chat={item} />
            ))}
        </>
    )
})