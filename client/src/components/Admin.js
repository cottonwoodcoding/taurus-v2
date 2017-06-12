import React from 'react';
import Categories from './Categories';
import AdminServices from './AdminServices';
import AdminParts from './AdminParts';
import AdminSite from './AdminSite';
import { Grid, Menu, Header } from 'semantic-ui-react';

class Admin extends React.Component {
  state = { panel: 'categories' }

  togglePanel = (panel) => {
    this.setState({ panel });
  }

  showPanel = () => {
    let { panel } = this.state;
    switch (panel) {
      case 'categories':
        return (
          <Grid.Row>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Categories name="service" />
            </Grid.Column>
            <Grid.Column computer={8} tablet={16} mobile={16}>
              <Categories name="part" />
            </Grid.Column>
          </Grid.Row>
        )
      case 'services':
        return (
          <AdminServices />
        );
      case 'parts':
        return (
          <AdminParts />
        );
      case 'site':
        return (
          <AdminSite />
        )
      default: return (
        <Header as='h1' centered>Coming Soon!</Header>
      )
    }
  }

  handleItemClick = (e, { name }) => this.setState({ panel: name });

  render() {
    let { panel } = this.state;
    return (
      <div>
        <Header as='h1' textAlign='center'>Admin Dashboard</Header>
        <Menu attached="top" tabular>
          { ['categories', 'services', 'parts', 'site'].map( (name) => {
              return (
                <Menu.Item
                  key={name}
                  name={name}
                  active={panel === name}
                  onClick={this.handleItemClick}
                />
              )
            })
          }
        </Menu>
        <br />
        <br />
        <Grid>
          {this.showPanel()}
        </Grid>
      </div>
    )
  }
}

export default Admin;
