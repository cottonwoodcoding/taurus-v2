import React from 'react';
import { Image, Segment, Embed, Grid, Header } from 'semantic-ui-react';
import logo from '../images/logo.svg';

const Home = () => (
  <Segment basic>
    <Image src={logo} size='medium' centered />
    <Header as='h1' textAlign='center'>(801) 266-4420</Header>
    <Grid>
      <Grid.Column computer={8} tablet={16} mobile={16}>
        <Grid.Row>
          <Header as='h1' textAlign='center' className='gradient-text'>Over 30 Years Experience</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>Solid, Dependable Service</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>Licensed & Insured</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>4645 S. 500 W.</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>Murray UT, 84123</Header>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column computer={8} tablet={16} mobile={16}>
        <Grid.Row>
          <Embed
            active
            aspectRatio='4:3'
            url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.0807603096064!2d-111.90768358459623!3d40.672189479336254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87528bcabb270509%3A0xf9f1802eee002ebf!2s4645+S+500+W%2C+Murray%2C+UT+84123!5e0!3m2!1sen!2sus!4v1491937353296"
          />
        </Grid.Row>
      </Grid.Column>
    </Grid>
  </Segment>
)

export default Home;
