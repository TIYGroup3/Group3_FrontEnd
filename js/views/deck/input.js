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
        <label className="addCardTA">Front: <br/><textarea type="text" className="front"/></label>
        <label className="addCardTA">Back: <br/><textarea type="text" className="back"/></label>
        <br/>
        {this.submitCard()}
      </div>
    );
  }

});