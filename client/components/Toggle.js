import React, { PropTypes, Component } from 'react';

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            isActive: false
        };
    }

    handleLinkClick(e) {
        e.preventDefault();

        const { isActive } = this.state;

        this.setState({
            isActive: !isActive
        });
    }

    render() {
        const { link, content } = this.props;
        const { isActive } = this.state;

        let className = 'b-toggle';

        className = className + (isActive ? ' b-toggle_active' : '');

        return (
            <div>
                <a
                    className={className}
                    onClick={this.handleLinkClick}
                >{link}</a>
                {isActive ? content : null}
            </div>
        );
    }
}

Toggle.propTypes = {
    link: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
};

export default Toggle;
