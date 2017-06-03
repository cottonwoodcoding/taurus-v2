import React from 'react';
import PartForm from './PartForm';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PartCategory from './PartCategory';

class AdminParts extends React.Component {
  state = { category: { id: 0 }}

  toggleCategory = (id, name) => {
    this.setState({ category: { id, name }});
  }

  alpha = (a, b) => {
    if (a.name < b.name)
      return -1
    if (a.name > b.name)
      return 1
    return 0
  }

  render() {
    let { category } = this.state
    let { categories } = this.props;
    if (category.name) {
      return (
        <div>
          <a 
            style={{ cursor: 'pointer' }}
            onClick={ () => this.toggleCategory({ id: 0 }) }
          >
            Back
          </a>
          <PartCategory category={category} />
        </div>
      )
    } else {
      return (
        <Grid.Row>
          <Grid.Column computer={8}>
            <PartForm />
          </Grid.Column>
          <Grid.Column computer={8}>
            { categories.sort(this.alpha).map( c => {
                return (
                  <span key={c.id} style={{ fontSize: '2rem' }}>
                    <a
                      key={c.id}
                      style={{ cursor: 'pointer' }}
                      onClick={ () => this.toggleCategory(c.id, c.name) }
                    >
                      {c.name}
                    </a>
                    {' | ' }
                  </span>
                )
              })
            }
          </Grid.Column>
        </Grid.Row>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return { categories: state.partCategories }
}

export default connect(mapStateToProps)(AdminParts);
