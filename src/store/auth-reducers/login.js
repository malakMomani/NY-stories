const initialState = {
    loggedIn: false,
    user: {}
};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'POST':
            return {
                email: payload.email,
                token: payload.token
            }
        case 'LOGGEDIN':
            let loggedIn = payload;
            return { ...state, loggedIn };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}