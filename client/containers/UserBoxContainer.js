import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signOut } from '../actions/signActions';
import { getUser } from '../actions/usersActions';
import UserBox from '../components/UserBox';

class UserBoxContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.user) {
      this.props.loadUser();
    }
  }

  render() {
    const {
      isFetching,
      lastUpdated,
      user,
      onSignOutClick,
      onIndexClick,
    } = this.props;

    return isFetching || (!lastUpdated && !user) ? (
      <div>Loading...</div>
    ) : !user ? (
      <div>Something went wrong</div>
    ) : (
      <UserBox
        {...user}
        onSignOutClick={onSignOutClick}
        onIndexClick={onIndexClick}
      />
    );
  }
}

UserBoxContainer.propTypes = {
  loadUser: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  onSignOutClick: PropTypes.func.isRequired,
  onIndexClick: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
  }),
};

function mapStateToProps(state) {
  const { id, isFetching, lastUpdated } = state.user;
  return {
    user: state.entities.users[id],
    isFetching,
    lastUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutClick() {
      dispatch(signOut())
        .then(action => {
          if (!action.payload.error) {
            browserHistory.push('/sign-in');
          }
        });
    },
    onIndexClick() {
      browserHistory.push('/');
    },
    loadUser() {
      dispatch(getUser());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserBoxContainer);
