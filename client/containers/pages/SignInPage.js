import { connect } from 'react-redux';
import SignIn from '../../components/SignIn';
import { signIn } from '../../actions/signActions';

function mapDispatchToProps(dispatch) {
  return {
    onSubmit(formData) {
      dispatch(signIn.request({ formData }));
    },
  };
}

function mapStateToProps(state) {
  return {
    errors: state.pages.signIn.errors,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
