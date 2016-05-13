import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import SignIn from '../components/SignIn';

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: function (formData) { console.log(formData); }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
