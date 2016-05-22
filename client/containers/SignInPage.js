import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { signIn } from '../actions/signActions';
import SignIn from '../components/SignIn';

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) {
            dispatch(signIn(formData))
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
        errors: state.pages.signIn
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
