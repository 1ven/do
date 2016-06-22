import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import values from 'lodash/values';
import moment from 'moment';
import { connect } from 'react-redux';
import Activity from '../components/Activity';

function mapStateToProps(state) {
  const { activity } = state.entities;

  const items = isEmpty(activity) ? null : values(activity)
    .sort((a, b) => b.createdAt - a.createdAt)
    .filter((item, i) => i < 15)
    .map(item => {
      const date = moment.unix(item.createdAt).format('D MMM [at] HH:mm');
      const noLink = item.action === 'Removed' ? true : false;
      return {
        ...omit({ ...item, noLink }, ['createdAt']),
        date,
      };
    });

  return { items };
}

export default connect(
  mapStateToProps
)(Activity);
