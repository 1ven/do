import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { signUp } from '../actions/signActions';
import SignUp from '../components/SignUp';

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(signUp(formData))
                /* .then(action => { */
                /*     if (!action.payload.error) { */
                /*         browserHistory.push('/'); */
                /*     } */
                /* }); */
        }
    };
};

function mapStateToProps(state) {
    return {
        errors: state.pages.signUp
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
