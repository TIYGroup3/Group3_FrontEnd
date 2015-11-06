import React from 'react';
import Cookies from 'js-cookie';

export default React.createClass({

  isLoggedIn() {
    let user = this.props.user;
    return !!user;
  },

  logoutButton() {
    let user = this.props.user;
    if(this.isLoggedIn()) {
      let mesg = `Not ` + user.user.username + `?  `;
      return (
        <span>{mesg}<button onClick={this.props.onLogoutClick}>
          Log out
        </button></span>
      );
    }
  },

  render() {
    return (
      <div className="header">
        <h2>Flash Bang</h2>
        <div>{this.logoutButton()}</div>
      </div>
    );
  }
});