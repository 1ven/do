import { connect } from 'react-redux';
import { removeNotification } from '../actions/notificationsActions';
import Notifications from '../components/Notifications';

function mapDispatchToProps(dispatch) {
  return {
    onNotificationClick(id) {
      clearTimeout(id);
      dispatch(removeNotification(id));
    },
  };
}

function mapStateToProps(state) {
  return {
    items: state.notifications,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
