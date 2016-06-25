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
    <div className="b-boards-list">
      <div className="b-container">
        {groups.map((group, i) => (
          <div
            className="b-boards-list__group"
            key={i}
          >
            <Toggle
              link={
                <div className="b-boards-list__top">
                  <span className="b-boards-list__group-title">
                    {group.title}
                    &nbsp;
                    <span className="b-boards-list__count">
                      ({group.ids.length})
                    </span>
                  </span>
                  <span className="b-boards-list__line" />
                  <div className="b-boards-list__toggle-icon">
                    <Icon name="chevron-down" />
                  </div>
                </div>
              }
              content={
                <BoardsContainer ids={group.ids} />
              }
              onLinkClick={isActive => onGroupTitleClick(group.title, isActive)}
              isActive={!group.hidden}
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
      title: PropTypes.text,
      ids: PropTypes.array,
    })
  ).isRequired,
  onGroupTitleClick: PropTypes.func.isRequired,
};

export default BoardsGroups;
