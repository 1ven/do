import Menu from '../components/Menu';
import { connect } from 'react-redux';
import { signOut } from '../actions/signActions';

function mapDispatchToProps(dispatch) {
  return {
    onSignOutClick() {
      dispatch(signOut.request());
    },
  };
}

export default connect(null, mapDispatchToProps)(Menu);
