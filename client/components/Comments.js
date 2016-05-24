import React, { PropTypes } from 'react';

const Comments = function ({ comments }) {
    return (
        <div className="b-comments">
            {comments.map(comment => (
                <div className="b-comments__item">
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
        </div>
    );
};

Comments.propTypes = {
    comments: PropTypes.shape({
        username: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};

export default Comments;
