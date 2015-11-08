import React from 'react';
// import Grid from './grid';

export default React.createClass({

  submitCard() {
    return (
      <button id="addCardButton" onClick={this.props.onAddCardClick}>
        Add Card
      </button>
    );
  },

  cardInput() {
    return (
      <div>
        <label className="addCardTA">Front: <br/><textarea type="text" id="cardFront" className="front"/></label>
        <label className="addCardTA">Back: <br/><textarea type="text" id="cardBack" className="back"/></label>
        <br/>
        {this.submitCard()}
      </div>
    );
  },

  render() {
    return (

      <div className="deckTable">
        <h2 className="deckTitle">{this.props.title}</h2>
        <div className="newCard">
          <p>Add a Card</p>
          {this.cardInput()}
        </div>
        <table>
        </table>
      </div>
    );
  }
}); 