import ProgressBar from '../components/ProgressBar';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    value: state.progressBar,
  };
}

export default connect(
  mapStateToProps
)(ProgressBar);
