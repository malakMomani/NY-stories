import { createStore, combineReducers, applyMiddleware } from "redux";
import login from './auth-reducers/login';
import signup from './auth-reducers/signup';
import error from './auth-reducers/error'

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';

const reducers = combineReducers({
    login: login,
    signup: signup,
    error: error
})
const store = () => {
    return createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
}

export default store;
//const store = createStore(()=>[], {}, applyMiddleware());