import {
  Box, Collapse, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import NavRoutes from './constants';

const useStyles = makeStyles((theme) => ({
  drawer: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.background.main,
    },
    '& a': {
      color: '#fff',
      textDecoration: 'none',
    },
    '& svg': {
      color: '#fff',
    },
  },
}));

const SideNavigationSingleLevel = ({ closeDrawer, route, selected }) => (
  <Link to={route} onClick={closeDrawer}>
    <ListItemButton selected={selected}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Sent mail" />
    </ListItemButton>
  </Link>
);

const SideNavigationMultiLevel = ({ closeDrawer, route, selected }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <SideNavigationSingleLevel closeDrawer={closeDrawer} route={route} selected={selected} />
      </Collapse>
    </div>
  );
};

const SideNavigationList = ({ closeDrawer }) => {
  const routes = Object.values(NavRoutes());
  const location = useLocation();
  console.log(location.pathname);
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {
        routes.map(({ title, route, dropdown, active }) => {
          const activeDropdown = dropdown.length > 0;
          if (active === false) return null;
          return null;
        })
      }
      <SideNavigationSingleLevel closeDrawer={closeDrawer} route="/reports/combined" selected={location.pathname === '/reports/combined'} />
      <SideNavigationMultiLevel closeDrawer={closeDrawer} route="/" selected={location.pathname === '/'} />
      <SideNavigationMultiLevel closeDrawer={closeDrawer} route="/" selected={location.pathname === '/'} />

    </List>
  );
};

const Prueba = () => {
  const classes = useStyles();
  const [statusDrawer, setStatusDrawer] = useState(true);
  const [statusList, setStatusList] = useState(true);

  const handleClick = () => {
    setStatusList(!statusList);
  };

  const toggleDrawer = (newOpen) => () => {
    setStatusDrawer(newOpen);
  };

  const closeDrawer = () => {
    setStatusDrawer(false);
  };

  return (
    <>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
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

      <Drawer className={`${classes.drawer} without-bg-i`} open={statusDrawer} anchor="right" onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <SideNavigationList closeDrawer={closeDrawer} />
          {/* <List
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Sent mail" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItemButton>
            <div>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {statusList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={statusList} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          </List> */}
        </Box>
      </Drawer>
    </>
  );
};

export default Prueba;
