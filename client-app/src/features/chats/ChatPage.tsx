import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../../stores/store';
import { observer } from 'mobx-react-lite';
import { Avatar, Divider, Fab, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@mui/icons-material/Send';
import MessageItem from '../messages/MessageItem';
import { Profile } from '../../models/profile';
import MessageList from '../messages/MessageList';
import MembersList from './MembersList';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as yup from "yup";
import MyTextField from '../../common/forms/MyTextField';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '100%',
        height: '80vh'
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

export default observer(function ChatPage() {
    const { id } = useParams<{ id: string }>();
    const [adminProfile, setAdminProfile] = useState<Profile>();

    const { chatStore, messageStore } = useStore();

    const classes = useStyles();

    useEffect(() => {
        chatStore.loadChat(id!)
            .then(() => setAdminProfile(new Profile(chatStore.detailedChatLoaded!.adminUsername,
                chatStore.detailedChatLoaded!.members.find(x => x.userName === chatStore.detailedChatLoaded?.adminUsername)?.displayName!)))
            .then(() => {
                messageStore.createHubConnection(chatStore.detailedChatLoaded?.id!);
            });
        return () => {
            messageStore.clearMessages();
        }


    }, [chatStore, messageStore, id])

    return (
        <div style={{ paddingTop: "20px", paddingLeft: "20px" }}>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Админ чата</Typography>
                </Grid>
            </Grid>
            <Grid container component={Paper} className={classes.chatSection}>
                <Grid item xs={3} className={classes.borderRight500}>
                    <List>
                        <ListItemButton key={adminProfile?.userName} href={`/profile/${adminProfile?.userName}`}>
                            <ListItemIcon>
                                <Avatar alt={adminProfile?.displayName} src="hzz" />
                            </ListItemIcon>
                            <ListItemText primary={adminProfile?.displayName}></ListItemText>
                        </ListItemButton>
                    </List>
                    <Divider />
                    <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Поиск по имени" variant="outlined" fullWidth />
                    </Grid>
                    <Divider />
                    <Typography variant="h5" className="header-message">Участники</Typography>
                    <MembersList members={chatStore.detailedChatLoaded?.members!} />
                </Grid>
                <Grid item xs={9}>
                    <MessageList messages={messageStore.messages!} />
                    <Divider />
                    
                        <Formik
                            onSubmit={(values, { resetForm }) =>
                                messageStore.addMessage(values.body).then(() => resetForm())}
                            initialValues={{ body: '' }}
                            validationSchema={yup.object({
                                body: yup.string().required()
                            })}
                        >
                            {({ isSubmitting, isValid, handleSubmit }) => (
                                <Form className='ui form'>
                                    
                                        <MyTextField name='body' id="outlined-basic-email" label="Type Something" style={{maxWidth: "90%", marginRight: "20px"}} />
                                
                                        <Fab color="primary" type='submit' aria-label="add"><SendIcon style={{display: "block"}}/></Fab>
                                </Form>
                            )}
                        </Formik>
                </Grid>
            </Grid>
        </div>
    )
})