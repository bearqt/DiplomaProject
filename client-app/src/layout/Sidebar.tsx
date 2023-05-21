import React from 'react';
import Drawer from '@mui/material/Drawer';
import ChatList from '../features/chats/ChatList';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export default function Sidebar({ isOpen, handleClose }: Props) {

  return (
    <div>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={handleClose}
      >
        <ChatList />
      </Drawer>
    </div>
  );
}
