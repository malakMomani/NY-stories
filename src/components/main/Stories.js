import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Link, TextField, Typography } from '@material-ui/core';
import Pagination from '@mui/material/Pagination';
import { Stack, CircularProgress, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import Show from '../../helpers/Show';
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { errorAction, reset } from '../../store/actions/error';
import Error from '../error/Error';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

const items_per_page = 7;
const key = '0DvTEilNOQihCBpF8axA6orukjLuDaAG';
const API_SERVER_WORLD = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${key}`;
const API_SERVER_SCIENCE = `https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${key}`;
const useStyles = makeStyles((theme) => ({
    root: {
        justifyContent: 'center',
        justifyItems: 'center'
    },
    stories: {
        width: '75%'
    },
    paper: {
        width: '500',
        height: 300,
        backgroundColor: 'grey'
    },
    control: {
        padding: theme.spacing(2),
    },
    cat: {

    }
}));

export function Stories(props) {
    const classes = useStyles();

    //const history = useHistory();

    const categories = ['World', 'Science']
    const [category, setCategory] = useState('World');
    const [stories, setStories] = useState([]);
    const [currentStories, setCurrentStories] = useState([]);
    const [details, setDetails] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const state = useSelector(state => {
        return {
            login: state.login,
            error: state.error
        }
    });

    const dispatch = useDispatch()

    const getArticles = async () => {
        if (category === 'Science') {
            await axios.get(API_SERVER_WORLD).then(res => {
                setStories(res.data.results);;
                setCurrentStories(stories.slice(0, items_per_page));
                setLoading(false);
                dispatch(reset())

            })
                .catch(error => {
                    //console.log(error.response)
                    dispatch(errorAction(error.response))
                });

        } else if (category === 'World') {
            await axios.get(API_SERVER_SCIENCE).then(res => {
                setStories(res.data.results);
                setCurrentStories(stories.slice(0, items_per_page));
                setLoading(false);
                dispatch(reset())
            })
                .catch(error => {
                    //console.log(error.response)
                    dispatch(errorAction(error.response))
                });

        }
    };

    useEffect(() => {
        //const token = cookie.load('auth-token');

        getArticles();
        dispatch(reset())
    }, [])



    const handleChange = async (event, v) => {
        setCategory(v);
        setLoading(true);
        getArticles().then(() => {
            dispatch(reset())
            setCurrentStories(stories.slice(0, items_per_page));
            setLoading(false)
        });
    };

    const handleChangePage = (event, value) => {
        const indexOfLastItem = value * items_per_page;
        const indexOfFirstItem = indexOfLastItem - items_per_page;
        setCurrentStories(stories.slice(indexOfFirstItem, indexOfLastItem));
        setPage(value);
    };



    return (

        <div className={classes.stories}>
            <Autocomplete
                disablePortal
                className={classes.cat}
                id="category"
                onChange={handleChange}
                options={categories}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Choose Category" />}
            />

            {loading ? (
                <Stack sx={{ color: 'grey.900' }} spacing={2} direction="row">
                    <CircularProgress color="primary" />
                </Stack>
            ) : (
                <>
                    <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
                        {currentStories.map((value, idx) => (
                            <Container key={idx} >
                                
                                <ListItem key={idx} alignItems="flex-start">
                                    <Container>
                                        <ListItemText item>
                                            <Typography variant='h6'>
                                                {value.item_type}
                                            </Typography>
                                            <Typography variant='subtitle1'>
                                                {value.created_date.split('T')[0]}
                                            </Typography>
                                        </ListItemText>
                                    </Container>

                                    <Container>
                                        <ListItemText
                                            primary={value.title}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        {value.byline}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                        <Button variant="outlined" href={value.short_url}>
                                            Read It
                                        </Button>
                                        <Button variant="outlined" onClick={() => {
                                            setCurrentIndex(idx);
                                            setDetails(true)
                                        }}>
                                            See Comments
                                        </Button>
                                    </Container>
                                    <Divider variant="inset" component="li" />
                                </ListItem>
                                <Show condition={details && idx == currentIndex}>
                                    <Comments story={value} />
                                </Show>
                            </Container>
                        ))};
                    </List>
                    <Stack spacing={2}>
                        <Pagination count={Math.ceil(stories.length / items_per_page)} page={page} onChange={handleChangePage} />
                    </Stack>
                    <Show condition={state.error.status}>
                        <Error error={state.error} />
                    </Show>
                </>
            )
            }

        </div >
    );
}

const mapStateToProps = state => ({
    user: state.login.user
});
export default connect(mapStateToProps)(Stories);
