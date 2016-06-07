import React, { PropTypes, Component } from 'react';
import Animate from './Animate';

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

    const { isActive } = this.state;

    this.setState({
      isActive: !isActive,
    });
  }

  render() {
    const { link, content, animation } = this.props;
    const { isActive } = this.state;
    const className = `b-toggle ${(isActive ? ' b-toggle_active' : '')}`;
    const body = isActive ? content : null;

    return (
      <div>
        <a
          className={className}
          onClick={this.handleLinkClick}
        >{link}</a>
        {animation ?
          <Animate name={animation}>{body}</Animate> :
          body
        }
      </div>
    );
  }
}

Toggle.defaultProps = {
  isActive: false,
};

Toggle.propTypes = {
  link: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  animation: PropTypes.string,
};

export default Toggle;
