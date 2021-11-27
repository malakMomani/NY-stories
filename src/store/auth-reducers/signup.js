const initialState = {
  signedUp: false,
  user: {}
}

export default (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case 'POST':
      return {
        email: payload.email,
        token: payload.token
      }
    case 'SIGNEDUP':
      let signedUp = payload;
      return { ...state, signedUp };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}