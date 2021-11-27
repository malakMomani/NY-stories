const initialState = {};

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ERROR':
            return payload;
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}