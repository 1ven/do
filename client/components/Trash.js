import React, { PropTypes } from 'react';
import Pagination from './Pagination';

function Trash({
  items,
  pageIndex,
  pagesLength,
  onRestoreClick
}) {
  return (
    <div className="b-trash">
      <div className="b-container">
        <div className="b-trash__entries">
          <table className="b-table">
            <thead className="b-table__head">
              <tr>
                <th>Content</th>
                <th>Type</th>
                <th colSpan="2">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ entryId, content, type, date, }, i) =>
                <tr key={i}>
                  <td>{content}</td>
                  <td>{type}</td>
                  <td>{date}</td>
                  <td>
                    <a
                      className="b-link"
                      onClick={() => onRestoreClick(entryId, type)}
                    >
                      Restore
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="b-trash__pagination">
          <Pagination
            currentIndex={pageIndex}
            pagesLength={pagesLength}
            path="/trash"
          />
        </div>
      </div>
    </div>
  );
}

Trash.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      entryId: PropTypes.string,
      type: PropTypes.string,
      content: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  pageIndex: PropTypes.number.isRequired,
  pagesLength: PropTypes.number.isRequired,
  onRestoreClick: PropTypes.func.isRequired,
};

export default Trash;
