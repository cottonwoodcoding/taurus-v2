import React from 'react';
import Categories from './Categories';
import AdminServices from './AdminServices';
import AdminParts from './AdminParts';
import { Grid, Menu } from 'semantic-ui-react';

class Admin extends React.Component {
  state = { panel: 'categories' }

  togglePanel = (panel) => {
    this.setState({ panel });
  }

  showPanel = () => {
    let { panel } = this.state;
    switch (this.state.panel) {
      case 'categories': 
        return (
          <Grid.Row>
            <Grid.Column computer={8} tablet={8} mobile={1}>
              <Categories name="service" />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={1}>
              <Categories name="part" />
            </Grid.Column>
          </Grid.Row>
        )
      case 'services':
        return (
          <AdminServices />
        )
      case 'parts':
        return (
          <AdminParts />
        )
    }
  }

  handleItemClick = (e, { name }) => this.setState({ panel: name })

  render() {
    let { panel } = this.state;
    return (
      <div className="row">
        <h2 className="center">Admin Dashboard</h2>
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
        <Grid columns={16}>
          {this.showPanel()}
        </Grid>
      </div>
    )
  }
}

export default Admin;
