import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isVisible: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleInputChange(e) {
    const { value } = e.target;

    this.setState({
      isVisible: true,
      value,
    });

    this.props.onChange(value);
  }

  handleItemClick() {
    this.setState({
      isVisible: false,
    });
  }

  highlight(text) {
    const { value } = this.state;

    if (!value.length) { return text; }

    const words = value.replace(/[^A-Za-z0-9\s]/g, '').split(' ').filter(i => i.length);

    const wrappedText = text.replace(
      new RegExp(`(${words.join('|')})`, 'gi'),
      '<span class="b-search-box__highlight">$&</span>'
    );

    return <span dangerouslySetInnerHTML={{ __html: wrappedText }} />;
  }

  render() {
    const { onSubmit, results } = this.props;
    const { isVisible } = this.state;
    return (
      <div className="b-search-box">
        <form
          className="b-search-box__form"
          onSubmit={onSubmit}
        >
          <input
            className="b-search-box__input"
            type="text"
            name="search"
            placeholder="Search..."
            value={this.state.value}
            onChange={this.handleInputChange}
          />
          <button
            className="b-search-box__submit"
            type="submit"
          >
            <Icon name="magnifier" />
          </button>
        </form>
        {results.length && isVisible ? (
          <div className="b-search-box__results">
            {results.map((result, i) => (
              <div
                className="b-search-box__group"
                key={i}
              >
                <span className="b-search-box__group-title">
                  {result.type}
                </span>
                <div className="b-search-box__group-items">
                  {result.items.map((item, i) => (
                    <div
                      className="b-search-box__item"
                      key={i}
                    >
                      <Link
                        className="b-search-box__group-link"
                        onClick={this.handleItemClick}
                        to={item.link}
                      >
                        {this.highlight(item.title)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

SearchBox.defaultProps = {
  results: [],
};

SearchBox.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          link: PropTypes.string,
        })
      ),
    })
  ),
};

export default SearchBox;
