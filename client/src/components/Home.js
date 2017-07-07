import React from 'react';
import { Image, Segment, Embed, Grid, Header, Icon, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Search from './Search';

const Home = ({ site }) => (
  <Segment basic>
    <Grid>
      <Grid.Column computer={8} tablet={16} mobile={16}>
        <Grid.Row>
          <Divider hidden/>
          <Image src={site.main_logo_url} size='large' centered />
          <Divider hidden/>
          <Divider hidden />
          <Header as='h1' textAlign='center' className='gradient-text'>Over 30 Years Experience</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>Solid, Dependable Service</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>Licensed & Insured</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>{ site.street }</Header>
          <Header as='h1' textAlign='center' className='gradient-text'>{site.city} {site.state}, {site.zip}</Header>
        </Grid.Row>
      </Grid.Column>
      <Grid.Column computer={8} tablet={16} mobile={16}>
        <Grid.Row>
          <Divider />
          <a href={site.phone && `tel:${site.phone.replace(/\D/g,'')}`}>
            <Header as='h1' textAlign='center'>{site.phone}</Header>
          </a>
          <Divider />
          <Grid columns={3}>  
            <Grid.Row>
              <Grid.Column>
                <Link to="/services">
                  <Segment basic textAlign="center">
                    <Header as="h4">Services</Header>
                    <Icon inverted size="big" name="settings" />
                  </Segment>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to="/parts">
                  <Segment basic textAlign="center">
                    <Header as="h4">Parts</Header>
                    <Icon inverted size="big" name="wrench" />
                  </Segment>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to="/contact">
                  <Segment basic textAlign="center">
                    <Header as="h4">Contact Us</Header>
                    <Icon inverted size="big" name="mail" />
                  </Segment>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider hidden />
          <Search />
          <Divider />
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

const mapStateToProps = (state) => {
  return { site: state.site };
}

export default connect(mapStateToProps)(Home);
