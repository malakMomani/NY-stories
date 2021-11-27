import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles((theme) => ({
    error: {
        maxWidth: 'inherit',
    },
}));

export default function Error(props) {
    const classes = useStyles();
    console.log(props)
    return (
        <>
            <Alert severity="error" className={classes.error}>
                <AlertTitle><strong>Error - {props.error.statusText}</strong></AlertTitle>
                {props.error.data.message}
            </Alert>
        </>
    )
};