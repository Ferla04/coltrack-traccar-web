import React, { useState } from 'react';
import {
  Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { makeStyles } from '@mui/styles';
import RefreshIcon from '@mui/icons-material/Refresh';

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.main,
    },
  },
  fontColor: {
    color: '#fff',
  },
}));

export const SideNavigationButton = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <RefreshIcon />
      </IconButton>

      <SideNavigation open={open} setOpen={setOpen} />
    </>
  );
};

const SideNavigation = ({ open, setOpen }) => {
  const classes = useStyles();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Drawer className={classes.drawer} open={open} anchor="right" onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon className={classes.fontColor}>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText className={classes.fontColor} primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideNavigation;
