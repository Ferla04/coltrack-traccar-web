import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Logo from '../resources/images/logo.png';
import LoginImage from '../resources/images/login-image.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  triangle: {
    position: 'fixed',
    width: 0,
    height: 0,
    borderRight: '50vw solid transparent',
    borderLeft: `50vw solid ${theme.palette.background.main}`,
    borderBottom: '50vh solid transparent',
    borderTop: `50vh solid ${theme.palette.background.main}`,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  imgLogo: {
    position: 'fixed',
    top: 0,
    left: 0,
    marginTop: 30,
    marginLeft: 30,
    width: 230,
    [theme.breakpoints.down('md')]: {
      width: 200,
    },
    [theme.breakpoints.down('sm')]: {
      width: 170,
    },
  },
  imgLoginImage: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    width: 600,
    [theme.breakpoints.down('lg')]: {
      width: 400,
    },
    [theme.breakpoints.down('md')]: {
      width: 350,
    },
    [theme.breakpoints.down('sm')]: {
      width: 230,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'transparent',
  },
  form: {
    maxWidth: theme.spacing(52),
    padding: theme.spacing(5),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
    },
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <div style={{ zIndex: -1 }}>
        <div className={classes.triangle} />
        <img src={Logo} alt="logo-coltrack" className={classes.imgLogo} />
        <img src={LoginImage} alt="logo-coltrack" className={classes.imgLoginImage} />
      </div>
      <div className={classes.paper}>
        <form className={classes.form}>{children}</form>
      </div>
    </main>
  );
};

export default LoginLayout;
