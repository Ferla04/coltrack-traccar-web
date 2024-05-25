import React, { useState } from 'react';
import {
  Box, Drawer, IconButton,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import SideNavigationItems from './SideNavigationItems';

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.main,
    },
  },
}));

export const SideNavigationButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton color="inherit" onClick={() => setOpen(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          width="23.5"
          height="23.5"
          fill="#fff"
        >
          <path d="M0 88C0 74.7 10.7 64 24 64H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24C10.7 112 0 101.3 0 88z" />
          <path fill="#00B5F1" d="M0 248c0-13.3 10.7-24 24-24H424c13.3 0 24 10.7 24 24s-10.7 24-24 24H24c-13.3 0-24-10.7-24-24z" />
          <path d="M448 408c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H424c13.3 0 24 10.7 24 24z" />
        </svg>
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
    <Drawer className={`${classes.drawer} without-bg-i`} open={open} anchor="right" onClose={toggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
        <SideNavigationItems />
      </Box>
    </Drawer>
  );
};

export default SideNavigation;
