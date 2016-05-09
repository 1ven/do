import React, { PropTypes, Component } from 'react';
import MenuList from './MenuList';

class UserBox extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isMenuVisible: false
        };
    }

    handleClick(e) {
        e.preventDefault();

        const { isMenuVisible } = this.state;

        this.setState({
            isMenuVisible: !isMenuVisible
        });
    }

    render() {
        const { username, role, avatar } = this.props;
        const { isMenuVisible } = this.state;

        let menu;

        if (isMenuVisible) {
            menu = (
                <div className="b-user-box__menu">
                    <MenuList
                        items={[
                            { title: 'Sign out', href: '/sign-out' }
                        ]}
                    />
                </div>
            );
        }

        return (
            <div className="b-user-box">
                <div
                    className="b-user-box__wrap"
                    onClick={this.handleClick}
                >
                    <div className="b-user-box__left">
                        <span className="b-user-box__username">
                            @{username}
                        </span>
                        <span className="b-user-box__role">
                            {role}
                        </span>
                    </div>
                    <div className="b-user-box__right">
                        <img
                            className="b-user-box__avatar"
                            src={avatar}
                        />
                    </div>
                </div>
                {menu}
            </div>
        );
    }
};

UserBox.defaultProps = {
    avatar: 'http://placehold.it/38x38'
};

UserBox.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
};

export default UserBox;
