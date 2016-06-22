import React, { PropTypes } from 'react';
import moment from 'moment';
import SendCommentForm from './SendCommentForm';

function Comments({ comments, onSendCommentSubmit }) {
  return (
    <div className="b-comments">
      {comments.map((comment, i) => (
        <div
          className="b-comments__item"
          key={i}
        >
          <div className="b-comment">
            <img
              alt="Avatar"
              className="b-comment__avatar"
              src={comment.user.avatar}
            />
            <div className="b-comment__content">
              <div className="b-comment__top">
                <span className="b-comment__username">
                  {comment.user.username}
                </span>
                <time className="b-comment__date">
                  {moment.unix(comment.createdAt).format('H:m - DD MMM Y')}
                </time>
              </div>
              <p className="b-comment__text">
                {comment.text}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="b-comments__item">
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
      avatar: PropTypes.string.isRequired,
    }),
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })),
  onSendCommentSubmit: PropTypes.func.isRequired,
};

export default Comments;
