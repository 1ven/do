import React, { PropTypes } from 'react';
import SendCommentForm from './SendCommentForm';

const Comments = function ({ comments }) {
    return (
        <div className="b-comments">
            {comments.map((comment, i) => (
                <div
                    className="b-comments__item"
                    key={i}
                >
                    <div className="b-comment">
                        <img
                            className="b-comment__avatar"
                            src={comment.avatar}
                        />
                        <div className="b-comment__content">
                            <div className="b-comment__top">
                                <span className="b-comment__username">
                                    {comment.username}
                                </span>
                                <time className="b-comment__date">
                                    {comment.date}
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
                    onSubmit={value => console.log(value)}
                />
            </div>
        </div>
    );
};

Comments.defaultProps = {
    comments: []
};

Comments.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape({
        username: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }))
};

export default Comments;
