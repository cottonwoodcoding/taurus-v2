import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image } from 'semantic-ui-react';
import { handleLogout } from '../actions/auth';
import logo from '../images/logo-inverted.png';

class NavBar extends Component {

  links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Parts', path: '/parts' },
    { name: 'Contact', path: '/contact' },
  ]

  authenticatedLinks = [
    { name: 'Admin Actions', path: '/admin' },
    { name: 'Logout' },
  ]

  unAuthenticatedLinks = [
    { name: 'Login', path: '/login' },
  ]

  buildNavs = (navs) => {
    const { history, dispatch } = this.props;

    return navs.map( (nav, i) => {
      const { name, path } = nav
      const { location: { pathname }} = this.props;

      return (
        <Menu.Item
          key={i}
          name={name}
          active={name !== 'Logout' && path === pathname }
        >
          { nav.name === 'Logout' ?
             <a
               style={{ cursor: 'pointer' }}
               onClick={ () => {
                 dispatch(handleLogout())
                 history.push('/login')
               }}
             >
               {name}
             </a>
             :
             <Link to={path}>{name}</Link>
           }
         </Menu.Item>
       );
     });
  }

  render() {
    let navs;
    const { auth } = this.props;

    if (auth && auth.isAuthenticated)
      navs = [...this.links, ...this.authenticatedLinks];
    else
      navs = [...this.links, ...this.unAuthenticatedLinks];

    return (
      <Menu inverted stackable>
        <Link to='/'>
          <Menu.Item name='logo' active={false}>
            <Image src={logo} size='small' />
          </Menu.Item>
        </Link>
          { this.buildNavs(navs) }
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(NavBar));
