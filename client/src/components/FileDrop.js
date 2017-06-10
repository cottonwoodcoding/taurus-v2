import React, { Component }  from 'react';
import { setFlash } from '../actions/flash';
import { Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import request from 'superagent';
import Dropzone from 'react-dropzone';

class FileDrop extends Component {
  onDrop = (files, column) => {
    let file = files[0];
    let req = request.put(this.props.url);
    let { dispatch } = this.props;
    req.attach('file', file);
    req.end( (err, res) => {
      if (res.body) {
        dispatch(this.props.action(res.body));
      }
      else
        dispatch(setFlash(`File failed to upload`, 'error'));
    });
  }

  render() {
    let { column, imgSrc } = this.props;

    return(
      <Dropzone style={{ border: 'none' }} onDrop={(files) => this.onDrop(files, column)}>
        <Image centered src={imgSrc} size='small' />
      </Dropzone>
    );
  }
}

export default connect()(FileDrop);
