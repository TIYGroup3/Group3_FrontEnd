import React from 'react';

export default React.createClass({

  getDeck(deck) {
    let onDeckSelect = this.props.onDeckSelect;
    return (
      <div className="deckSelect">
        <p>DECK NAME HERE</p>
      </div>
    );
  },

  addCardButton() {
    return (
      <button id="addCardButton" onClick={this.props.onAddCardClick}>
        Add Deck
      </button>
    );
  },

  render() {

    let deck = this.props.deck;

    return (
      <div>
        <div className="addDeck">
          <label className="input">New Deck Title: <input type="text" id="deck"/></label>
          {this.addCardButton()}
        </div>
        <div className="deck-container">
          {this.getDeck(deck)}
        </div>
      </div>
    );
  }

});