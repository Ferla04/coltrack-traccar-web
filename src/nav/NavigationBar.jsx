import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Logo from '../resources/images/logo.png';
import './NavigationBar.css';
import Logout from './Logout';
import DropdownMenu from './DropdownMenu';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 5,
  },
  toolbar: {
    display: 'flex',
    gap: 30,
    alignItems: 'center',
    '& > :last-child': {
      marginLeft: 'auto',
    },
  },
  navImg: {
    width: 160,
    [theme.breakpoints.down('md')]: {
      width: 140,
    },
  },
  navSvg: {
    fill: theme.palette.secondary.main,
  },
}));

const NavigationBar = () => {
  const classes = useStyles();

  return (
    <div className="without-bg-i">
      <AppBar className={classes.appBar} position="sticky">
        <Container maxWidth={false}>
          <Toolbar className={classes.toolbar} disableGutters>
            <img src={Logo} className={classes.navImg} alt="coltrack-logo" />

            <DropdownMenu />

            <Logout />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
