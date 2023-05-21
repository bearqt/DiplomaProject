import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Sidebar from './Sidebar';
import { useStore } from '../stores/store';
import { history } from '..';
import { observer } from 'mobx-react-lite';
import { Button, Link } from '@mui/material';

export default observer(function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [sidebarIsOpen, setSidebarIsOpen] = React.useState(false);
    const { userStore } = useStore();

    const toggleSideBar = () =>
        setSidebarIsOpen(!sidebarIsOpen);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        userStore.logout();
        setAnchorEl(null);
        history.push("/");
    };

    return (
        <>
            <Sidebar isOpen={sidebarIsOpen} handleClose={toggleSideBar} />
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            onClick={toggleSideBar}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link href='/' underline='none' color='white'>
                                Главная
                            </Link>
                        </Typography>

                        <div>


                            {userStore.isLoggedIn &&
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    style={{ fontSize: "20px" }}
                                >
                                    <AccountCircle style={{ marginRight: "5px" }} />
                                    {userStore.user?.displayName}

                                </IconButton>
                            }
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>
            </Box>
        </>

    );
})