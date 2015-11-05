import React from 'react';

export default React.createClass({

  registerButton() {
    return (
      <button onClick={this.props.onRegisterClick}>
        Register
      </button>
    );
  },

  render() {
    return (
      <div>
        <label className="input">Username: <input type="text" className="name"/></label>
        <label className="input">Full Name: <input type="text" className="fullname"/></label>
        <label className="input">Email: <input type="text" className="email"/></label>
        <label className="input">Password: <input type="text" className="password"/></label>
        {this.registerButton()}
      </div>
    );
  }

}); 
