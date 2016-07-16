import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import Animation from './Animation';
import RoundSpinner from './RoundSpinner';
import { Scrollbars } from 'react-custom-scrollbars';

function SearchBox({
  results,
  query = '',
  isWaiting,
  onChange,
  onItemClick,
}) {
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
        <div className="b-search-box__right">
          <Animation name="a-fade-in">
            {isWaiting ? (
              <div className="b-search-box__right-item">
                <RoundSpinner
                  size="12px"
                  color="#000"
                  thickness="1px"
                />
              </div>
            ) : <div />}
          </Animation>
          <div className="b-search-box__right-item">
            <div className="b-search-box__magnifier">
              <Icon name="magnifier" />
            </div>
          </div>
        </div>
      </div>
      <Animation name="a-fade-in">
        {query && results ? (
          <div className="b-search-box__results">
            <Scrollbars
              autoHide
              autoHideTimeout={1000}
              autoHeight
              autoHeightMax={320}
            >
              <div className="b-search-box__wrap">
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
                        {result.items.map(({ title, link }, i) => (
                          <div
                            className="b-search-box__item"
                            key={i}
                          >
                            <Link
                              className="b-search-box__group-link"
                              onClick={onItemClick}
                              to={link}
                            >
                              {title}
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
            </Scrollbars>
          </div>
        ) : null}
      </Animation>
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
  isWaiting: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default SearchBox;
