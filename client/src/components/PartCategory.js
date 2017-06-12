import React from 'react'
import { Divider, Header, Grid, Icon, Card, Image, Segment, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getParts, deletePart } from '../actions/parts';
import { clearSearch } from '../actions/search';
import missingImg from '../images/missing.png';

class PartCategory extends React.Component {
  componentDidMount() {
    let { dispatch, category: { id }, query } = this.props;
    if (!query || query.length < 2)
      dispatch(getParts(id))
  }

  componentWillUnmount() {
    this.props.dispatch(clearSearch());
  }

  componentWillReceiveProps(nextProps) {
    let { parts, query, dispatch, category: { id } } = this.props;
    let validQuery = query.length > 2

    if (nextProps.category.id !== this.props.category.id)
        dispatch(getParts(nextProps.category.id))

    if (validQuery && nextProps.query.length <= 2) {
      if (!parts.length)
        dispatch(getParts(id))
    }
  }

  deletePart = (id) => {
    if (confirm('Really delete this part?')) { // eslint-disable-line no-restricted-globals
      this.props.dispatch(deletePart(id))
    }
  }

  categories = () => {
    return this.props.categories.map( c => {
      return { key: c.id, text: c.name, value: c.id }
    });
  }

  changeCategory = (e, data) => {
    let { value, options } = data;
    let name = options.find( o => value === o.value ).text
    this.props.dispatch(clearSearch())
    this.props.toggleCategory(value, name)
  }

  render() {
    let { category: { name, id }, parts, admin, search, dispatch, query } = this.props;
    let validQuery = query.length > 2
    let visibleParts = validQuery ? search : parts
    return (
      <div>
        <Header as="h3">Category: {name}</Header>
        <Form onSubmit={ e => { e.preventDefault() } }>
          <Form.Select options={this.categories()} value={id} onChange={this.changeCategory} />
        </Form>
        <Divider />
        { validQuery &&
          <Header
            as="h4"
            textAlign="center"
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={() => {
              dispatch(getParts(id))
              dispatch(clearSearch())
            }}
          >
            Show All
          </Header>
        }
        <Grid divided='vertically' columns={12}>
          <Grid.Row>
            { visibleParts.map( p => {
                return (
                  <Grid.Column computer={4} mobile={12} key={p.id}>
                    <Card>
                      <Link to={`/parts/${p.id}`}>
                        <Segment textAlign="center">
                          <Image 
                            height="150px" 
                            width="150px" 
                            verticalAlign="middle"
                            src={p.image_thumb || missingImg} 
                          />
                        </Segment>
                      </Link>
                      <Card.Content>
                        <Card.Header>
                          <Link to={`/parts/${p.id}`}>
                            {p.name}
                          </Link>
                        </Card.Header>
                      </Card.Content>
                      { admin &&
                        <Card.Content extra>
                          <Icon
                            color="red"
                            name="trash"
                            style={{ cursor: 'pointer' }}
                            onClick={ () => this.deletePart(p.id) }
                          />
                        </Card.Content>
                      }
                    </Card>
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { 
    admin: state.auth.isAuthenticated, 
    parts: state.parts, 
    search: state.search, 
    query: state.query,
    categories: state.partCategories,
  }
}

export default connect(mapStateToProps)(PartCategory);
