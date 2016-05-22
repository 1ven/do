import React, { PropTypes, Component } from 'react';
import SignForm from './SignForm';
import Btn from './Btn';
import Checkbox from './Checkbox';

function SignIn({ onSubmit, errors }) {
    return (
        <SignForm
            onSubmit={onSubmit}
            errors={errors}
            rows={[
                <input className="b-input-a" type="text" placeholder="Username" name="username" />,
                <input className="b-input-a" type="password" placeholder="Password" name="password" />,
                <div className="b-items">
                    <div className="b-items__item">
                        <Checkbox
                            attrs={{
                                name: "remember"
                            }}
                            text="Remember me"
                        />
                    </div>
                    <div className="b-items__item">
                        <a className="b-white-link">
                            Forgot password ?
                        </a>
                    </div>
                </div>,
                <Btn
                    type="submit"
                    tagName="button"
                    modifiers={['full-width', 'blue']}
                    text="Sign in"
                />
            ]}
        />
    );
};

export default SignIn;
