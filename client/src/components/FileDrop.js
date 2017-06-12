import React, { Component }  from 'react';
import { setFlash } from '../actions/flash';
import { Image, Button, Loader, Segment, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import request from 'superagent';
import Dropzone from 'react-dropzone';

class FileDrop extends Component {
  state = { loading: false }

  onDrop = (files, column) => {
    this.setState({ loading: true })

    let file = files[0];
    let req = request.put(this.props.url);
    let { dispatch } = this.props;
    req.attach('file', file);
    req.end( (err, res) => {
      if (res.body) {
        if (this.props.action) 
          dispatch(this.props.action(res.body));
        else
          this.props.cb()

        this.setState({ loading: false })
      }
      else {
        dispatch(setFlash(`File failed to upload`, 'error'));
        this.setState({ loading: false });
      }
    });
  }

  render() {
    let { column, imgSrc } = this.props;
    let { loading } = this.state;

    if (loading) {
      return (
         <Segment>
           <Dimmer active>
             <Loader />
           </Dimmer>
         </Segment>
      )
    }

    return(
      <Dropzone style={{ border: 'none' }} onDrop={(files) => this.onDrop(files, column)}>
        { imgSrc ? 
          <Image centered src={imgSrc} size='small' />
          :
          <Button type="button" fluid basic>Drop Image Here To Add</Button>
        }
      </Dropzone>
    );
  }
}

export default connect()(FileDrop);
