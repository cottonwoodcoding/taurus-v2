import Auth from 'j-toker';

const logout = () => {
  return { type: 'LOGOUT' }
}

const login = (user) => {
  return { type: 'LOGIN', user }
}

const authErrors = (errors) => {
  let message = '';
  let msgType = 'error';
  errors.forEach( error => {
    message += `${error} `
  });
  return { type: 'SET_FLASH', message, msgType }
}

export const handleLogin = (email, password, history) => {
  return(dispatch) => {
    Auth.emailSignIn({
      email,
      password
    }).then( user => {
      dispatch(login(user.data));
      history.push('/');
    }).fail( res => {
      dispatch(authErrors(res.data.errors));
    });
  }
}

export const handleLogout = (history) => {
  return(dispatch) => {
    Auth.signOut()
      .then( res => {
        dispatch(logout());
        history.push('/login');
      });
  }
}
