import React, { PropTypes } from 'react';
import moment from 'moment';
import SendCommentForm from './SendCommentForm';
import Icon from './Icon';

function Comments({
  comments,
  onSendCommentSubmit,
  onRemoveClick,
}) {
  return (
    <div className="b-comments">
      <div className="b-comments__items">
        {comments.map((comment, i) => (
          <div
            className="b-comments__item"
            key={i}
          >
            <div className="b-comment">
              <div className="b-comment__content">
                <div className="b-comment__top">
                  <span className="b-comment__username">
                    {comment.user.username}
                  </span>
                  <time className="b-comment__date">
                    {moment.unix(comment.createdAt).format('HH:mm - DD MMM Y')}
                  </time>
                </div>
                <div className="b-comment__text">
                  <p>{comment.text}</p>
                  <a
                    className="b-comment__remove"
                    onClick={onRemoveClick}
                  >
                    <Icon name="cross" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onSendCommentSubmit: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

export default Comments;
