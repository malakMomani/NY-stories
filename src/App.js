import SignUp from './components/auth/signup';
import LogIn from './components/auth/login'
import Header from './components/basics/Header';
import Stories from './components/main/Stories'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './components/basics/Home';
import { useEffect } from 'react';
import cookie from 'react-cookies'
import validateToken from './helpers/validateToken';
import { useDispatch, useSelector } from 'react-redux';
import { signUpAction, signedUp } from './store/actions/signup';
import { loginAction, loggedIn } from './store/actions/login';
import Search from './components/main/Search';
import { connect } from 'react-redux';
import { Alert } from '@mui/material';
import Show from './helpers/Show';

function App() {

  const state = useSelector(state => {
    return {
      error: state.error,
    }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const token = cookie.load('auth-token');
    const user = validateToken(token);
    if (user) {
      dispatch(signUpAction({ ...user, token: token }))
      dispatch(signedUp(true));
      dispatch(loginAction({ ...user, token: token }))
      dispatch(loggedIn(true))
    }
  }, [])
  return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/login">
            <LogIn />
          </Route>
          <Route exact path="/stories">
            <Stories />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Switch>
      </BrowserRouter>
  );
}
const mapStateToProps = state => ({
  error: state.error
});
export default connect(mapStateToProps)(App);

