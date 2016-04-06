import React from 'react';
import NoticeContainer from '../containers/NoticeContainer';

export default ({ children }) => (
    <div>
        {children}
        <NoticeContainer />
    </div>
);
