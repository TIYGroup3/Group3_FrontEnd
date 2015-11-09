import React from 'react';
import Cookies from 'js-cookie';

export default React.createClass({

  isLoggedIn() {
    let user = this.props.user;
    return !!user;
  },


  logoutButton() {
    if(this.isLoggedIn()) {
      return (
        <span><button onClick={this.props.onLogoutClick}>
          Log out
        </button></span>
      );
    }
  },

 
  // logoutButton() {
  //   let user = this.props.user;
  //   console.log(user);
  //   if(this.isLoggedIn()) {
  //     return (
  //       <span>Not <span className="nameClick" onClick={this.props.onUserClick}>{user.user.username}</span>?  <button onClick={this.props.onLogoutClick}>
  //         Log out
  //       </button></span>
  //     );
  //   }
  // },

  render() {
    return (
      <div className="header">
        <h2>Flash Bang</h2>
        <div>{this.logoutButton()}</div>
      </div>
    );
  }
});