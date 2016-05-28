import React, { PropTypes, Component } from 'react';
import Icon from './Icon';

class SearchBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e) {
        const { value } = e.target;

        this.setState({ value });

        this.props.onChange(value);
    }

    highlight(text) {
        const { value } = this.state;
        const i = text.toLowerCase().indexOf(value);

        if (i === -1 || !value.length) return text;

        const before = text.slice(0, i);
        const after = text.slice(i + value.length);
        const highlighted = text.slice(i, i + value.length);

        return (
            <span>
                {before}
                <span className="b-search-box__highlight">
                    {highlighted}
                </span>
                {after}
            </span>
        );

    }

    render() {
        const { onSubmit, results } = this.props;
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
                {results.length ? (
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
                                            <a
                                                className="b-search-box__group-link"
                                                href={item.link}
                                            >
                                                {this.highlight(item.title)}
                                            </a>
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
};

SearchBox.defaultProps = {
    results: []
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
                    link: PropTypes.string
                })
            )
        })
    )
};

export default SearchBox;
