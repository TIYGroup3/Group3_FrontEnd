import React from 'react';

export default React.createClass({

  getStatus() {
    let user = this.props.user;
    // console.log(user); // returns "undefined"
    if (user) {
      let mesg = `Welcome ` + user.user.username;
      return (
        <span>{mesg}</span>
      );
    } else {
      return (
        <span>Log in to continue...</span>
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
        <div>
          <button onClick={this.props.onLoginClick}>
            Log in
          </button>
          <button onClick={this.props.onRegisterPageClick}>
            Register
          </button>
        </div>
      );
    }
  },

  render() {
    return (
      <div className="login">
        <label className="input">Username: <input type="text" id="username"/></label>
        <label className="input">Password: <input type="password" id="password"/></label>
        <div>{this.getStatus()}</div>
        <div>{this.loginButton()}</div>
      </div>
    );
  }

}); 
