import React from 'react';
import { connect } from 'react-redux';
import { clearFlash } from '../actions/flash.js';
import '../styles/flash.css';

const fadeFlash = (dispatch) => {
  setTimeout( () => {
    dispatch(clearFlash())
  }, 15000)
}

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    return (
      <div
        id="alert"
        className={`alert alert-${flash.msgType} center`}
        style={{ width: '90%', margin: '0 auto'}}
        onClick={ (e) => {
          e.preventDefault();
          dispatch(clearFlash())
        }}
      >
        {flash.message}
        { fadeFlash(dispatch) }
      </div>
    )
  } else {
    return null
  }
}

const mapStateToProps = (state) => {
  return { flash: state.flash }
}

export default connect(mapStateToProps)(Flash);
