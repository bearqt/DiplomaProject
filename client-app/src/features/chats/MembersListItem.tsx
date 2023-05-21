import React from 'react';
import { Profile } from '../../models/profile';
import { ListItemButton, ListItemIcon, Avatar, ListItemText } from '@mui/material';

interface Props {
    member: Profile;
}

export default function MembersListItem({ member }: Props) {

    return (
        <ListItemButton href={`/profile/${member.userName}`}>
            <ListItemIcon>
                <Avatar alt={member.displayName} src="/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary={member.displayName}>{member.displayName}</ListItemText>
            <ListItemText secondary="в сети" ></ListItemText>
        </ListItemButton>
    )
}