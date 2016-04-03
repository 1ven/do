import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { hideNotice } from '../actions/noticeActions';
import Notice from '../components/Notice';

class NoticeContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { notice, onClick } = this.props;

        if (notice) {
            return (
                <Notice
                    {...notice}
                    onClick={onClick}
                />
            );
        }

        return null;
    }
};

NoticeContainer.propTypes = {
    notice: PropTypes.object,
    onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        notice: state.notice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: () => dispatch(hideNotice())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NoticeContainer);
