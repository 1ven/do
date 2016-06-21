import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import { fetchActivity } from '../actions/activityActions';
import App from '../components/App';

class AppContainer extends Component {
  /* constructor(props) { */
  /*   super(props); */
  /* } */

  componentWillMount() {
    this.props.dispatch(fetchUser.request());
    this.props.dispatch(fetchActivity.request());
  }

  render() {
    const { children, isFetching, didUpdated } = this.props;
    return !didUpdated || isFetching ? (
      <div>Loading...</div>
    ) : (
      <App>
        {children}
      </App>
    );
  }
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isFetching: state.activity.isFetching || state.user.isFetching,
    didUpdated: state.activity.lastUpdated && state.user.lastUpdated,
  };
}

export default connect(mapStateToProps)(AppContainer);
