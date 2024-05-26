import React from 'react';
import {
  AppBar, Toolbar, Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { SideNavigationButton } from './SideNavigation';

import Logo from '../resources/images/logo.png';
import './NavigationBar.css';
import Logout from './Logout';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 5,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
          <Toolbar id="navigation-bar" disableGutters>
            <SideNavigationButton />

            <img src={Logo} className={classes.navImg} alt="coltrack-logo" />

            <Logout />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default NavigationBar;
