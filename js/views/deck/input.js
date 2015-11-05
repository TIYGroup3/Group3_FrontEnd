import React from 'react';

export default React.createClass({

  submitCard() {
    return (
      <button onClick={this.props.onSubmitClick}>
        Add Card
      </button>
    );
  },

  render() {
    return (
      <div>
        <label className="input">Front: <input type="text" className="front"/></label>
        <label className="input">Back: <input type="text" className="back"/></label>
        {this.submitCard()}
      </div>
    );
  }

});