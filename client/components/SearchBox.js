import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';

function SearchBox({
  results,
  query,
  onChange,
  onItemClick,
}) {
  function highlight(text) {
    if (!query.length) { return text; }

    const words = query.replace(/[^A-Za-z0-9\s]/g, '').split(' ').filter(i => i.length);

    const wrappedText = text.replace(
      new RegExp(`(${words.join('|')})`, 'gi'),
      '<span class="b-search-box__highlight">$&</span>'
    );

    return <span dangerouslySetInnerHTML={{ __html: wrappedText }} />;
  }

  return (
    <div className="b-search-box">
      <div className="b-search-box__form">
        <input
          className="b-search-box__input"
          type="text"
          name="search"
          placeholder="Search..."
          value={query}
          onChange={e => onChange(e.target.value)}
        />
        <span className="b-search-box__submit">
          <Icon name="magnifier" />
        </span>
      </div>
      {query && results ? (
        <div className="b-search-box__results">
          {results.length ? (
            results.map((result, i) => (
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
                        onClick={onItemClick}
                        to={item.link}
                      >
                        {highlight(item.title)}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <span className="b-search-box__not-found">
              Entries not found.
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}


SearchBox.propTypes = {
  query: PropTypes.string,
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
  onChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default SearchBox;
