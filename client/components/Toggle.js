import React, { PropTypes, Component } from 'react';

class Toggle extends Component {
    constructor(props) {
        super(props);

        this.handleLinkClick = this.handleLinkClick.bind(this);

        this.state = {
            isVisible: false
        };
    }

    handleLinkClick(e) {
        e.preventDefault();

        const { isVisible } = this.state;

        this.setState({
            isVisible: !isVisible
        });
    }

    render() {
        const { link, content } = this.props;
        const { isVisible } = this.state;

        let className = 'b-toggle';

        className = className + (isVisible ? ' b-toggle_visible' : '');

        return (
            <div>
                <a
                    className={className}
                    onClick={this.handleLinkClick}
                >{link}</a>
                {isVisible ? content : null}
            </div>
        );
    }
}

Toggle.propTypes = {
    link: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired
};

export default Toggle;
