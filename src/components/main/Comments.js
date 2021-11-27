import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Container, Divider } from '@material-ui/core';
import comments from '../../helpers/comments'

const key = '0DvTEilNOQihCBpF8axA6orukjLuDaAG'
const COMMENTS_API = `http://api.nytimes.com/svc/community/v3/user-content/url.json?api-key=${key}&offset=0&url=`
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function Comments(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    //const [comments, setComments] = useState([]);

    // const getComments = async () => {
    //     //https://api.nytimes.com/svc/community/v3/user-content/url.json?api-key={your-API-key}&url={url}[&offset=int]

    //     console.log(props.story)
    //     const res = await axios.get(`${COMMENTS_API}${props.story.url}`, {
    //         mode: 'cors',
    //         headers: {
    //             Authorization: key,
    //             'Access-Control-Allow-Origin': '*'
    //         }
    //     })
    //     setComments(res.data.results);
    //     console.log({ comments })
    // };

    // useEffect(() => {
    //     //const token = cookie.load('auth-token');
    //     getComments();
    // }, [])

    return (
        <Container>
            {comments.map((comment, idx) => {
                return (
                    <Typography key={idx}>
                        {bull}<b>{comment.userDisplayName}{bull}</b>
                        <Divider light />
                        {comment.commentBody}
                    </Typography>
                )
            })}
        </Container>
    );
}