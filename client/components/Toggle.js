import React, { PropTypes, Component } from 'react';
import Animation from './Animation';

class Toggle extends Component {
  constructor(props) {
    super(props);

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleDocumentClick = this.handleDocumentClick.bind(this);

    this.state = {
      isActive: props.isActive,
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick(e) {
    if (
      !this.props.closeWhenClickedOutside ||
      !this.state.isActive ||
      this.isLinkNode(e.target)
    ) return;

    if (e.target !== this.contentNode) {
      this.setState({
        isActive: false,
      });
    }
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

  isLinkNode(target) {
    let parents = getParents(target);

    if (
      parents.indexOf(this.linkNode) !== -1 ||
      target === this.linkNode && target
    ) {
      return true;
    }

    return false;
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
    const _content = isActive ? content : null;

    return (
      <div>
        <a
          ref={node => { this.linkNode = node }}
          className={className}
          onClick={this.handleLinkClick}
        >
          {link}
        </a>
        <div ref={node => { this.contentNode = node }}>
          {animationName ? (
            <Animation
              name={animationName}
              duration={animationDuration}
            >
              {_content}
            </Animation>
          ) : _content}
        </div>
      </div>
    );
  }
}

function getParents(target) {
  let parents = [];
  while (target) {
    parents.unshift(target);
    target = target.parentNode;
  }
  return parents;
}

Toggle.defaultProps = {
  isActive: false,
  closeWhenClickedOutside: true,
};

Toggle.propTypes = {
  link: PropTypes.node.isRequired,
  onLinkClick: PropTypes.func,
  content: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  animationName: PropTypes.string,
  animationDuration: PropTypes.number,
  closeWhenClickedOutside: PropTypes.bool,
};

export default Toggle;
