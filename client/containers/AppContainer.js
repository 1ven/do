import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import { fetchActivity } from '../actions/activityActions';
import App from '../components/App';

class AppContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchUser.request());
    this.props.dispatch(fetchActivity.request());
  }

  componentDidUpdate() {
    if (this.props.loaded) {
      this.hidePreloader();
    }
  }

  hidePreloader() {
    const preloader = document.querySelector('.b-preloader');
    preloader.classList.add('b-preloader_hidden');
    setTimeout(() => preloader.style.display = 'none', 1050);
  }

  render() {
    const { children, loaded } = this.props;
    return loaded ? (
      <App>
        {children}
      </App>
    ) : <div />;
  }
};

AppContainer.propTypes = {
  children: PropTypes.node.isRequired,
  loaded: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: !! (state.activity.lastUpdated && state.user.lastUpdated),
  };
}

export default connect(mapStateToProps)(AppContainer);
