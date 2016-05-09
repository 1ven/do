import React, { PropTypes, Component } from 'react';

class MenuList extends Component {
    constructor(props) {
        super(props);
    }

    getRootClassName(className) {
        const { modifiers } = this.props;

        if (modifiers.length) {
            return modifiers.reduce((acc, modifier) => {
                return `${acc} ${className}_${modifier}`;
            }, className);
        }

        return className;
    }

    render() {
        const { items } = this.props;
        return (
            <div className={this.getRootClassName('b-menu-list')}>
                {items.map((item, i) => (
                    <div
                        className="b-menu-list__item"
                        key={i}
                    >
                        <a
                            className="b-menu-list__link"
                            href={item.href}
                        >
                            {item.title}
                        </a>
                    </div>
                ))}
            </div>
        );
    }
};

MenuList.defaultProps = {
    modifiers: []
};

MenuList.propTypes = {
    items: PropTypes.array.isRequired,
    modifiers: PropTypes.array
};

export default MenuList;
