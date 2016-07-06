import React, { PropTypes } from 'react';
import Icon from './Icon';
import Toggle from './Toggle';
import Animation from './Animation';
import BoardsContainer from '../containers/BoardsContainer';

function BoardsGroups({
  groups,
  onGroupTitleClick,
}) {
  return (
    <div className="b-boards-groups">
      <div className="b-container">
        {groups.map(({ title, type, ids, count, hidden }, i) => (
          <div
            className="b-boards-groups__group"
            key={i}
          >
            <Toggle
              link={
                <div className="b-boards-groups__top">
                  <span className="b-boards-groups__group-title">
                    {title}
                    &nbsp;
                    <span className="b-boards-groups__count">
                      ({count || ids.length})
                    </span>
                  </span>
                  <span className="b-boards-groups__line" />
                  <div className="b-boards-groups__toggle-icon">
                    <Icon name="chevron-down" />
                  </div>
                </div>
              }
              content={
                <BoardsContainer
                  ids={ids}
                  type={type}
                />
              }
              onLinkClick={isActive => onGroupTitleClick(type, isActive)}
              isActive={!hidden}
              closeWhenClickedOutside={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

BoardsGroups.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      ids: PropTypes.array.isRequired,
      hidden: PropTypes.bool.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  onGroupTitleClick: PropTypes.func.isRequired,
};

export default BoardsGroups;
