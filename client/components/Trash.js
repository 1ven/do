import React, { PropTypes } from 'react';
import _ from 'lodash';

function Trash() {
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
              {_.times(20, () =>
                <tr>
                  <td>Test board</td>
                  <td>Board</td>
                  <td>20 Jun 2016 15:30</td>
                  <td>
                    <a className="b-link">Restore</a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="b-trash__pagination">
          <div className="b-pagination">
            <span className="b-pagination__ctrl b-pagination__ctrl_prev b-pagination__ctrl_inactive">
              PREV
            </span>
            <a className="b-pagination__item">1</a>
            <a className="b-pagination__item b-pagination__item_active">2</a>
            <a className="b-pagination__item">3</a>
            <a className="b-pagination__item">4</a>
            <span className="b-pagination__item">...</span>
            <a className="b-pagination__item">10</a>
            <a className="b-pagination__ctrl b-pagination__ctrl_next">
              NEXT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trash;
