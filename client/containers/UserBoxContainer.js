import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import UserBox from '../components/UserBox';
import { signOut } from '../actions/signActions';

function mapStateToProps(state) {
  return {
    user: state.entities.users[state.user.id] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutClick() {
      dispatch(signOut.request())
    },
    onIndexClick() {
      browserHistory.push('/');
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBox);
