import React from 'react';

export default React.createClass({

  registerButton() {
    return (
      <button id="submitButton" onClick={this.props.onRegisterClick}>
        Register
      </button>
    );
  },

  render() {
    return (
      <div>
        <label className="input">Username: <input type="text" id="username"/></label>
        <label className="input">Full Name: <input type="text" id="fullname"/></label>
        <label className="input">Email: <input type="text" id="email"/></label>
        <label className="input">Password: <input type="text" id="password"/></label>
        {this.registerButton()}
      </div>
    );
  }

}); 
