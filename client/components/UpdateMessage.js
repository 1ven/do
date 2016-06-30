import React, { PropTypes, Component } from 'react';
import { hidePreloader } from '../utils';

class UpdateMessage extends Component {
  componentDidMount() {
    hidePreloader();
  }

  render() {
    return (
      <div className="b-update-message">
        <div className="b-update-message__middle">
          <span className="b-update-message__oops">
            Oops ...
          </span>
          <div className="b-update-message__text">
            Your browser is <i>out of date</i>.<br />
            To use our application, you should
            &nbsp;<a className="b-link" href="https://browser-update.org/update-browser.html#18:browser-update.org">update</a>&nbsp;
            your browser.
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateMessage;
