import React, { PropTypes, Component } from 'react';
import SignForm from './SignForm';
import Btn from './Btn';
import Checkbox from './Checkbox';

function SignUp({ onSubmit }) {
    return (
        <SignForm
            onSubmit={onSubmit}
            rows={[
                <input className="b-input-a" type="text" placeholder="Username" name="username" />,
                <input className="b-input-a" type="text" placeholder="Email" name="email" />,
                <input className="b-input-a" type="password" placeholder="Password" name="password" />,
                <input className="b-input-a" type="password" placeholder="Confirmation" name="confirmation" />,
                <Btn
                    type="submit"
                    tagName="button"
                    modifiers={['full-width', 'blue']}
                    text="Sign up"
                />
            ]}
        />
    );
};

export default SignUp;
