import React from 'react';
import { Profile } from '../../models/profile';
import { ListItemButton, ListItemIcon, Avatar, ListItemText } from '@mui/material';
import MembersListItem from './MembersListItem';

interface Props {
    members: Profile[];
}

export default function MembersList({ members }: Props) {

    return (
        <>
        {members?.map((item, index) => (
            <MembersListItem key={index} member={item} />
            ))}
        </>
    )
}