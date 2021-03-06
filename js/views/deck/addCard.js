import React from 'react';

export default React.createClass({

  addCardButton() {

    let onAddCardClick = this.props.onAddCardClick;

    return (
      <button id="addCardButton" onClick={() => onAddCardClick()}>
        Add Card
      </button>
    );
  },

  render() {

    let card = this.props.card;

    return (
      <div>
        <div className="addCard">
          <label className="addCardTA">Front: <br/><textarea type="text" id="cardFront" className="front"/></label>
          <label className="addCardTA">Back: <br/><textarea type="text" id="cardBack" className="back"/></label>
          {this.addCardButton()}
        </div>
      </div>
    );
  }

});