import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Segment, Grid } from 'semantic-ui-react';
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
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Grid>
            <Grid.Row only='tablet computer'>
              <Grid.Column>
                <Link to='/'>
                  <Menu.Item header>
                    <Image src={logo} size='small' />
                  </Menu.Item>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Menu.Menu position='right'>
            { this.buildNavs(navs) }
          </Menu.Menu>
        </Menu>
      </Segment>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default withRouter(connect(mapStateToProps)(NavBar));
