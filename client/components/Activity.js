import React, { Component, PropTypes } from 'react';

function Activity({ items }) {
    return (
        <div className="b-activity">
            <span className="b-activity__title">
                Activity
            </span>
            <div className="b-activity__items">
                {items.map((item, i) => (
                    <div
                        className="b-activity__item"
                        key={i}
                    >
                        <div className="b-activity__item-text">
                            {item.action}
                            &nbsp;
                            <a
                                className="b-activity__entry"
                                href={item.entry.link}
                            >
                                {item.entry.title}
                            </a>
                            &nbsp;
                            {item.type}
                        </div>
                        <span className="b-activity__date">
                            {item.date}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

Activity.defaultProps = {
    items: []
};

Activity.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            action: PropTypes.string,
            type: PropTypes.string,
            date: PropTypes.string,
            entry: PropTypes.shape({
                title: PropTypes.string,
                link: PropTypes.string
            })
        })
    )
};

export default Activity;
