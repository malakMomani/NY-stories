import cookie from 'react-cookies';
import validateToken from '../../helpers/validateToken';
import { errorAction, reset } from './error';

const expires = new Date()
expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
const axios = require('axios').default;
const api = 'http://localhost:5050';

export const logIn = (user) => {
    // get remote data then dispatch an action with the res

    return (dispatch) => {
        axios({
            method: 'post',
            url: `${api}/auth/login`,
            headers: {},
            data: {
                email: user.email,
                password: user.password,
            },

        }).then(async (res) => {
            try {
                let data = { ...user, token: res.data.access_token }
                //validateToken
                let isValidUser = validateToken(data.token);
                if (isValidUser) {
                    dispatch(loginAction(data));
                    dispatch(loggedIn(true));
                    cookie.save('auth-token', data.token, { expires });
                    cookie.save('name', data.email);
                }
                dispatch(reset())
            } catch (error) {
                dispatch(errorAction(error.response));
            }
        })

    }
}


export const loginAction = payload => {
    return {
        type: 'POST',
        payload: payload
    }
}
export const loggedIn = (status) => {
    return {
        type: 'LOGGEDIN',
        payload: status,
    };
};
export const logOut = () => {
    return {
        type: 'LOGOUT',
    }
}