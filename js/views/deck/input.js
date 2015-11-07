import React from 'react';

export default React.createClass({

  submitCard() {
    return (
      <button id="addCardButton" onClick={this.props.onAddCardClick}>
        Add Card
      </button>
    );
  },

  render() {
    return (
      <div>
        <label className="addCardTA">Front: <br/><textarea type="text" id="cardFront" className="front"/></label>
        <label className="addCardTA">Back: <br/><textarea type="text" id="cardBack" className="back"/></label>
        <br/>
        {this.submitCard()}
      </div>
    );
  }

});