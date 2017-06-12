import React from 'react';
import { connect } from 'react-redux';
import PartForm from './PartForm';
import { Menu, Table, Image, Button, Header, Divider, Grid, Dimmer, Loader, Segment } from 'semantic-ui-react';
import missingImg from '../images/missing.png';
import $ from 'jquery';

class Part extends React.Component {
  state = { edit: false, tabs: [], tab: '' }

  componentDidMount() {
    let { dispatch, match: { params: { id }}} = this.props;
    $.ajax({
      url: `/api/parts/${id}`,
      type: 'GET'
    }).done( part => {
      dispatch({ type: 'PART', part });
      let tabs = [];
      if (part.specifications)
        tabs.push('specifications')
      if (part.features.length)
        tabs.push('features')
      this.setState({ tabs, tab: tabs[0] });
    });
  }

  componentWillUnmount() {
    this.props.dispatch({ type: 'PART', part: {} })
  }

  toggleEdit = () => {
    this.setState( (state) => {
      return { edit: !state.edit }
    });
  }

  priceCell = (price, sale_price, phone) => {
    if (price) {
      if (sale_price) {
        return (
          <div>
            <Header as="h3">${sale_price.toPrecision(4)}</Header>
            <Header
              as="h4"
              style={{ color: 'red', textDecoration: 'line-through' }}
            >
              Was ${price.toPrecision(4)}
            </Header>
          </div>
        )
      } else {
        return <Header as="h3">${price.toPrecision(4)}</Header>
      }
    } else {
      return <Header as="h3">Call for price {phone}</Header>
    }
  }

  activeTab = () => {
    let { tab } = this.state;
    let data = this.props.part[tab];
    if (data) {
      if (data.constructor === String) 
        data = JSON.parse(data.replace(/=>/g, ":"))
    } else {
      data = []
    }

    return (
      <Table singleLine>
        <Table.Body>
          { data.map( (d,i) => {
              if (d.specName) {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      {d.specName}:
                    </Table.Cell>
                    <Table.Cell>
                      {d.specValue}
                    </Table.Cell>
                  </Table.Row>
                )
              } else {
                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      {d}
                    </Table.Cell>
                  </Table.Row>
                )
              }
            })
          }
        </Table.Body>
      </Table>
    )
  }

  edit() {
    return (
      <PartForm part={this.props.part} toggleEdit={this.toggleEdit} />
    )
  }

  show() {
    let { 
      admin,
      category,
      phone,
      part: { id, image, part_category_id, name, description, number, price, sale_price }
    } = this.props;

    let { tab } = this.state;
    
    if (id) {
      return (
        <Grid columns={16}>
          <Grid.Row>
            <Divider hidden />
            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Image src={image ? image : missingImg} />
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} mobile={16}>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                      <Header as="h3">{name}</Header>
                      <Header sub>{description}</Header>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      Category
                    </Table.Cell>
                    <Table.Cell>
                      {category}
                    </Table.Cell>
                  </Table.Row>
                  { number &&
                    <Table.Row>
                      <Table.Cell>
                        Part #
                      </Table.Cell>
                      <Table.Cell>
                        {number}
                      </Table.Cell>
                    </Table.Row>
                  }
                  <Table.Row>
                    <Table.Cell colSpan="2">
                      { this.priceCell(price, sale_price, phone) }
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={16}>
              <Divider hidden />
            </Grid.Column>
            { this.state.tabs.length > 0 &&
              <Grid.Column width={16}>
                <Menu pointing secondary>
                  { this.state.tabs.map( (name) => {
                      return (
                        <Menu.Item
                          key={name}
                          name={name}
                          active={name === tab}
                          onClick={ () => { this.setState({ tab: name }) }}
                        />
                      )
                    })
                  }
                </Menu>
                {this.activeTab()}
              </Grid.Column>
            }
            { admin && 
                <Grid.Column width={16}>
                  <Divider />
                  <Button 
                    fluid 
                    basic 
                    color="blue" 
                    type="button" 
                    onClick={this.toggleEdit}
                  >
                    Edit
                  </Button>
                </Grid.Column>
            }
          </Grid.Row>
        </Grid>
      )
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      )
    }
  }

  render() {
    return this.state.edit ? this.edit() : this.show()
  }
}

const mapStateToProps = (state) => {
  const part = state.part;
  const category = state.partCategories.find( c => c.id === part.part_category_id )
  return { 
    admin: state.auth.isAuthenticated, 
    part,
    category: category ? category.name : null,
    phone: state.site.phone
  }
}

export default connect(mapStateToProps)(Part);
