import React, { PropTypes } from 'react';
import moment from 'moment';
import SendCommentForm from './SendCommentForm';
import Icon from './Icon';
import { Scrollbars } from 'react-custom-scrollbars';

function Comments({
  comments,
  cardId,
  onSendCommentSubmit,
  onRemoveClick,
}) {
  return (
    <div className="b-comments">
      <Scrollbars
        autoHide
        autoHideTimeout={1000}
        autoHeight
        autoHeightMax={230}
      >
        <div className="b-comments__items">
          {comments.map((c, i) => (
            <div
              className="b-comments__item"
              key={i}
            >
              <div className="b-comment">
                <div className="b-comment__content">
                  <div className="b-comment__top">
                    <span className="b-comment__username">
                      {c.user.username}
                    </span>
                    <time className="b-comment__date">
                      {moment.unix(c.createdAt).format('HH:mm - DD MMM Y')}
                    </time>
                  </div>
                  <div className="b-comment__text">
                    <p>{c.text}</p>
                    <a
                      className="b-comment__remove"
                      onClick={() => onRemoveClick(cardId, c.id)}
                    >
                      <Icon name="cross" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Scrollbars>
      <div className="b-comments__form">
        <SendCommentForm
          onSubmit={onSendCommentSubmit}
        />
      </div>
    </div>
  );
}

Comments.defaultProps = {
  comments: [],
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  cardId: PropTypes.string.isRequired,
  onSendCommentSubmit: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default Comments;
