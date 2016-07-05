import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import md5 from 'md5';
import UserBox from '../components/UserBox';
import { signOut } from '../actions/signActions';

function mapStateToProps(state) {
  const user = state.entities.users[state.user.id];
  const hash = md5(user.email.toLowerCase());
  const avatar = `https://www.gravatar.com/avatar/${hash}?d=mm`;

  return {
    user,
    avatar,
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
