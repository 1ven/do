import React, { PropTypes } from 'react';
import range from 'lodash/range';
import { Link } from 'react-router';

function Pagination({
  currentIndex,
  pagesLength,
  path,
}) {
  function renderPage(index) {
    const active = index === currentIndex;
    return React.cloneElement(
      active ? <span /> : <Link to={`${path}/${index}`} />,
      {
        className: `
          b-pagination__item
          ${active ? 'b-pagination__item_active' : ''}
        `,
        key: index,
      },
      index
    );
  }

  function renderPages() {
    if (pagesLength <= 6) {
      return range(1, pagesLength + 1).map(i => renderPage(i));
    }

    const first = range(currentIndex, currentIndex + 3).map(i => renderPage(i));
    const last = [pagesLength - 1, pagesLength].map(i => renderPage(i));

    return [
      ...first,
      <span key="..." className="b-pagination__item">...</span>,
      ...last,
    ];
  }

  function renderPaginationCtrl(text, inactive, to) {
    return React.cloneElement(
      inactive ? <span /> : <Link to={to} />,
      {
        className: `
          b-pagination__ctrl
          ${inactive ? 'b-pagination__ctrl_inactive' : ''}
        `,
      },
      text
    );
  }

  return (
    <div className="b-pagination">
      {renderPaginationCtrl(
        'PREV',
        currentIndex === 1,
        `${path}/${currentIndex - 1}`
      )}
      {renderPages()}
      {renderPaginationCtrl(
        'NEXT',
        currentIndex === pagesLength,
        `${path}/${currentIndex + 1}`
      )}
    </div>
  );
}

Pagination.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  pagesLength: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};

export default Pagination;
