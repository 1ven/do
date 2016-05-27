import React, { PropTypes } from 'react';
import Form from './Form';
import Icon from './Icon';

function SearchBox({ onSubmit, results }) {
    return (
        <div className="b-search-box">
            <Form
                className="b-search-box__form"
                onSubmit={onSubmit}
            >
                <input
                    className="b-search-box__input"
                    type="text"
                    name="search"
                    placeholder="Search..."
                />
                <button
                    className="b-search-box__submit"
                    type="submit"
                >
                    <Icon name="magnifier" />
                </button>
            </Form>
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
                                            {item.title}
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
};

SearchBox.defaultProps = {
    results: []
};

SearchBox.propTypes = {
    onSubmit: PropTypes.func.isRequired,
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
