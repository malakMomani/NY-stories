import React, { useContext } from 'react';
import { makeStyles, createTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Logo from './Logo';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, connect } from 'react-redux';
import { Button, Grid } from '@material-ui/core';
import { logOut } from '../../store/actions/login'

const appTheme = createTheme({
    palette: {
        primary: {
            light: '#6179b9',
            main: '#ffffff',
            dark: '#141a2c',
            contrastText: '#fff',
        },
        secondary: {
            light: '#f6ee34',
            main: '#9ccac5',
            dark: '#bdb508',
            contrastText: '#000',
        },
    },
});

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: appTheme.palette.secondary.main
    },

    inputRoot: {
        color: appTheme.palette.primary.light,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    header: {
        position: 'relative',
        backgroundColor: appTheme.palette.primary.main,
        height: '20vh',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        boxShadow: '0px 0px',
    },
    icons: {
        color: appTheme.palette.secondary.main
    },
    auth: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        right: 5,
        "@media (min-width: 1280px)": {
            right: 5
        },
        [theme.breakpoints.down("sm", "md")]: {
            right: 5
        }
    },
    tabs: {
        width: 'min-content',
        margin: '0 auto',
        // marginTop: '-50px',
        position: 'absolute',
        top: 50,
        zIndex: 10000,
        left: '25%',
        "@media (max-width: 900px)": {
            top: 100,
            left: '15%'
        },
        "@media (max-width: 500px)": {
            top: 100,
            left: '15%'
        },
    },
    tabss: {
        width: 'min-content',
        margin: '0 auto',
        position: 'absolute',
        top: 50,
        zIndex: 10000,
        left: '25%',
        "@media (max-width: 900px)": {
            top: 100,
            left: '15%'
        },
        "@media (max-width: 500px)": {
            top: 100,
            left: '15%'
        },
        logout: {
            float: 'left'
        }
    }
}));

function Header() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    const state = useSelector(state => {
        return {
            SignUp: state.signup,
            LogIn: state.login,
            error: state.error
        }
    });
    const dispatch = useDispatch();

    const handleChanges1 = (event, newValue) => {
        setValue(newValue);
        if (newValue == 0) {
            history.push('/')
        } else if (newValue == 1) {
            history.push('/login')
        } else if (newValue == 2) {
            history.push('/signup')
        }

    };

    const handleChanges = (event, newValue) => {
        setValue(newValue);
        if (newValue == 0) {
            history.push('/')
        } else if (newValue == 1) {
            history.push('/stories')
        } else if (newValue == 2) {
            history.push('/search')
        }
    }



    return (
        <>
            <div className={classes.grow}>
                <AppBar position="static" className={classes.header} >
                    <Toolbar>
                        <Logo />
                    </Toolbar>

                </AppBar>

            </div>

            <Grid container spacing={10}>
                <Grid item xs={12} sm={6} >
                    <Paper square>
                        {state.LogIn.loggedIn ? (
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChanges}
                                className={classes.tabs}
                            >
                                <Tab label="Home" />
                                <Tab label="Stories" />
                                <Tab label="Search" />
                            </Tabs>

                        ) : (
                            <Tabs
                                value={value}
                                indicatorColor="primary"
                                textColor="primary"
                                onChange={handleChanges1}
                                className={classes.tabs}
                            >
                                <Tab label="Home" />
                                <Tab label="Sign In" />
                                <Tab label="Sign Up" />


                            </Tabs>)}
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.logout}>
                    <Button onClick={() => dispatch(logOut())}>Logout</Button>
                </Grid>
            </Grid>
        </>
    );
}
const mapStateToProps = state => ({
    user: state.login.user
});
export default connect(mapStateToProps)(Header);