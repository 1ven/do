import React, { PropTypes, Component } from 'react';
import Animation from './Animation';

class Toggle extends Component {
  constructor(props) {
    super(props);

    this.handleLinkClick = this.handleLinkClick.bind(this);

    this.state = {
      isActive: props.isActive,
    };
  }

  handleLinkClick(e) {
    e.preventDefault();

    const { onLinkClick } = this.props;
    const { isActive } = this.state;

    this.setState({
      isActive: !isActive,
    });

    if (onLinkClick) { onLinkClick(!isActive); }
  }

  render() {
    const {
      link,
      content,
      animationName,
      animationDuration,
    } = this.props;
    const { isActive } = this.state;
    const className = `b-toggle ${(isActive ? ' b-toggle_active' : '')}`;
    const body = isActive ? content : null;

    return (
      <div>
        <a
          className={className}
          onClick={this.handleLinkClick}
        >
          {link}
        </a>
        {animationName ? (
          <Animation
            name={animationName}
            duration={animationDuration}
          >
            {body}
          </Animation>
        ) : body}
      </div>
    );
  }
}

Toggle.defaultProps = {
  isActive: false,
};

Toggle.propTypes = {
  link: PropTypes.node.isRequired,
  onLinkClick: PropTypes.func,
  content: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  animationName: PropTypes.string,
  animationDuration: PropTypes.number,
};

export default Toggle;
