import React from 'react';
import Categories from './Categories';
import { Grid } from 'semantic-ui-react';

const Admin = () => (
  <div className="row">
    <h2 className="center">Admin Dashboard</h2>
    <Grid columns={16}>
      <Grid.Row>
        <Grid.Column computer={8} tablet={8} mobile={1}>
          <Categories name="service" />
        </Grid.Column>
        <Grid.Column computer={8} tablet={8} mobile={1}>
          <Categories name="part" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default Admin;
