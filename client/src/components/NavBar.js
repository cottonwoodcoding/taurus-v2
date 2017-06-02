import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Image, Segment, Grid } from 'semantic-ui-react';
import { handleLogout } from '../actions/auth';
import logo from '../images/logo-inverted.png';

class NavBar extends Component {

  state = { activeItem: 'Home' };

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

  handleItemClick = (nav) => {
    this.setState({ activeItem: nav.name });
    this.props.history.push(nav.path)
  }

  buildNavs = (navs) => {
    const { history, dispatch } = this.props;
    const { activeItem } = this.state;

    return navs.map( (nav, i) => {
      const name = nav.name;

      return (
        <Menu.Item
          key={i}
          name={name}
          active={activeItem === name }
          onClick={() => this.handleItemClick(nav)}
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
             <p>{name}</p>
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
                <Menu.Item header>
                  <Image src={logo} size='small' />
                </Menu.Item>
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
