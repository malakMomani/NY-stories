import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 120,
  },
}));

export default function Logo() {
  const classes = useStyles();
  return (
    <>
      <img src="https://www.logolynx.com/images/logolynx/d2/d2b5bbacea411b764950936e35d1adb3.png" alt="logo" className={classes.logo} />
    </>
  )
};