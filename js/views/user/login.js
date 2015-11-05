import React from 'react';

export default React.createClass({

  getStatus() {
    let user = this.props.user;
    if (user) {
      let name = user.fullname;
      let mesg = `Welcome ${name}`;
      return (
        <span>{mesg}</span>
      );
    } else {
      return (
        <span>You are not logged in</span>
      );
    }
  },

  isLoggedIn() {
    return !!this.props.user;
  },

  loginButton() {
    if(this.isLoggedIn()) {
      return (
        <button onClick={this.props.onLogoutClick}>
          Log out
        </button>
      );
    } else {
      return (
        <button onClick={this.props.onLoginClick}>
          Log in
        </button>
      );
    }
  },

  render() {
    return (
      <div>
        <label className="input">Username: <input type="text" className="name"/></label>
        <label className="input">Password: <input type="text" className="password"/></label>
        <div>{this.getStatus()}</div>
        {this.loginButton()}
      </div>
    );
  }

}); 
