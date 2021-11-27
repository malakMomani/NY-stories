import cookie from 'react-cookies';
import validateToken from '../../helpers/validateToken';

const expires = new Date()
expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 1 / 1440)
const axios = require('axios').default;
const api = 'http://localhost:5050';

export const signUp = (user) => {
    // get remote data then dispatch an action with the res

    return (dispatch) => {
        axios({
            method: 'post',
            url: `${api}/auth/register`,
            headers: {},
            data: {
                first_name: user.fname,
                last_name: user.lname,
                email: user.email,
                password: user.password,
            },

        }).then(async (res) => {
            let data = { ...user, token: res.data.access_token }
            //validateToken
            let isValidUser = validateToken(data.token);
            if (isValidUser) {
                dispatch(signUpAction(data));
                dispatch(signedUp(true));
                cookie.save('auth-token', data.token, { expires });
                cookie.save('name', `${data.first_name} ${data.last_name}`);
            }
        })
            .catch(function (error) {
                throw new Error(error)
            });
    }
}
export const signUpAction = payload => {
    return {
        type: 'POST',
        payload: payload
    }
}
export const signedUp = (status) => {
    return {
        type: 'SIGNEDUP',
        payload: status,
    };
};