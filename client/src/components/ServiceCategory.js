import React from 'react';
import { connect } from 'react-redux';
import { Card, Feed, Header, Icon, Button, Divider } from 'semantic-ui-react';
import { deleteService } from '../actions/services';

const Services = ({ catId, name, services, isAuthenticated, dispatch, Modal }) => (
  <Card fluid>
    <Card.Content>
      <Card.Header>
        { name }
      </Card.Header>
    </Card.Content>
    { services.length > 0 && 
      <Card.Content>
          <Feed size="large">
            { services.map( s => {
                return (
                  <Feed.Event key={s.id}>
                    <Feed.Label>
                      <Icon color="green" name="checkmark" />
                    </Feed.Label>
                    <Feed.Content>
                      <Feed.Summary>
                        <Header as="h4">
                          { s.name }
                        </Header>
                      </Feed.Summary>
                      <Feed.Meta>
                        { s.description }
                      </Feed.Meta>
                      { isAuthenticated &&
                          <div>
                            <Divider hidden />
                            <Button 
                              floated="right" 
                              basic color="red"
                              onClick={ () => {
                                const choice = confirm('Really delete this service'); // eslint-disable-line no-restricted-globals
                                if (choice)
                                  dispatch(deleteService(catId, s.id)) 
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                      }
                      <Divider clearing />
                    </Feed.Content>
                  </Feed.Event>
                )
              })
            }
          </Feed>
        </Card.Content>
      }
  </Card>
)

const mapStateToProps = (state, props) => {
  return { 
    services: state.services.filter( s => s.service_category_id === props.catId ),
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Services);
