import { connect } from 'react-redux';
import SignUp from '../../components/SignUp';
import { signUp } from '../../actions/signActions';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(formData) {
      dispatch(signUp.request({ formData }))
    },
  };
}

function mapStateToProps(state) {
  return {
    errors: state.pages.signUp.errors,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
