import React, { useMemo } from 'react';
import {
  AppBar, Toolbar, Container, useMediaQuery,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';

import Logo from '../resources/images/logo.png';
import './NavigationBar.css';
import Logout from './Logout';
import DropdownMenu from './DropdownMenu';

import NavRoutes from './constants';
import SideNavigation from './SideNavigation';

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: 5,
  },
  toolbar: {
    display: 'flex',
    gap: 30,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      '& > :nth-child(3)': {
        marginLeft: 'auto',
      },
    },
    [theme.breakpoints.down('md')]: {
      gap: 10,
      '& > :nth-child(2)': {
        marginLeft: 'auto',
      },

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

const NavigationBarView = ({ desktop, routes }) => {
  const classes = useStyles();

  return (
    <div className="without-bg-i">
      <AppBar className={classes.appBar} position="sticky">
        <Container maxWidth={false}>
          <Toolbar className={classes.toolbar} disableGutters>
            <img src={Logo} className={classes.navImg} alt="coltrack-logo" />

            {desktop ? <DropdownMenu routes={routes} /> : <SideNavigation />}

            <Logout />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const NavigationBar = () => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const routes = NavRoutes();

  return useMemo(() => (<NavigationBarView routes={routes} desktop={desktop} />), [desktop, routes]);
};

export default NavigationBar;
