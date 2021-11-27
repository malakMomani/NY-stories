import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { CircularProgress, makeStyles, Grid, Typography } from '@material-ui/core';
import { Paper, Button } from '@material-ui/core';
import axios from 'axios';
import Show from '../../helpers/Show';
import { Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { errorAction, reset } from '../../store/actions/error';
import Error from '../error/Error';

const key = '0DvTEilNOQihCBpF8axA6orukjLuDaAG'
const SEARCH_API = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const items_per_page = 5;

const useStyles = makeStyles((theme) => ({
    search: {
        maxWidth: 350,
        margin: 'auto',
        maxHeight: 600
    },
    root: {

        justifyContent: 'center',
        justifyItems: 'center'
    },
    paper: {
        width: 700,
        height: 150,
        boxShadow: 5

    },
    control: {
        padding: theme.spacing(2),
    },
    inside: {
        margin: 30,
        justifyContent: 'center'
    }
}));

export default function Search() {

    const [lastSearch, setLastSearch] = useState([]);
    const [result, setResult] = useState(lastSearch);
    const [stories, setStories] = useState([]);
    const [currentStories, setCurrentStories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const classes = useStyles();

    const state = useSelector(state => {
        return {
            error: state.error
        }
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setLoading(true);
        let q = event.target.value;
        axios.get(`${SEARCH_API}?q=${q}&api-key=${key}`).then(res => {
            let headlines = res.data.response.docs.map(doc => doc.headline.main)
            setResult(headlines)
            dispatch(reset())
        }).catch(error => {
            dispatch(errorAction(error.response))
        });
        setLoading(false);
    }

    const handleQueryChange = (event, v) => {
        setLoading(true);
        //console.log(v);
        axios.get(`${SEARCH_API}?q=${v}&api-key=${key}`).then(res => {
            setStories(res.data.response.docs);
            setCurrentStories(stories.slice(0, items_per_page));
            setLastSearch([...result, v])
            dispatch(reset())
        }).catch(error => {
            dispatch(errorAction(error.response))
        });;
        setLoading(false);
    }

    const handleChangePage = (event, value) => {
        const indexOfLastItem = value * items_per_page;
        const indexOfFirstItem = indexOfLastItem - items_per_page;
        setCurrentStories(currentStories.slice(indexOfFirstItem, indexOfLastItem));
        setPage(value);
    };

    return (
        <div>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Autocomplete
                        max-width="xs"
                        className={classes.search}
                        disableClearable
                        onChange={handleQueryChange}
                        options={result.map((option) => option)}
                        renderInput={(params) => (
                            <TextField
                                xs={12}
                                margin="normal"
                                onChange={handleChange}
                                {...params}
                                label="Search input"
                                InputProps={{
                                    ...params.InputProps,
                                    type: 'search',
                                }}
                            />

                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Show condition={loading}>
                        <Stack sx={{ color: 'grey.900' }} spacing={2} direction="row">
                            <CircularProgress color="primary" />
                        </Stack>
                    </Show>
                </Grid>
            </Grid>
            <Grid container className={classes.last} spacing={2}>
                {lastSearch.map((v, i) => {
                    <Grid key={i} item xs={12}>
                        <Typography>
                            {v}
                        </Typography>
                    </Grid>
                })}

            </Grid>
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" spacing={2}>
                        {currentStories.map((value, idx) => (
                            <Grid key={idx} item>
                                {console.log({ value })}
                                <Paper className={classes.paper}>
                                    <Grid container Spacing={2} className={classes.inside}>
                                        <Grid item xs={4}>
                                            <Typography variant='h5'>
                                                {value.section_name}
                                            </Typography>
                                            <Typography variant='subtitle1'>
                                                {value.pub_date.split('T')[0]}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography varient='h6'>
                                                {value.headline.main}
                                            </Typography>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {value.byline.original}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button variant="outlined" href={value.web_url}>
                                                Read It
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        ))}
                        <Stack spacing={2}>
                            <Pagination count={Math.ceil(currentStories.length / items_per_page)} page={page} onChange={handleChangePage} />
                        </Stack>
                        <Show condition={state.error.status}>
                            <Error error={state.error} />
                        </Show>
                    </Grid>
                </Grid>
            </Grid >
        </div >
    );
}
