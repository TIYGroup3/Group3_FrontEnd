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

  addDeckButton() {
    return (
      <button id="addDeckButton" onClick={this.props.onAddDeckClick}>
        Add New Deck
      </button>
    );
  },

  render() {

    let deck = this.props.deck;

    return (
      <div>
        <div className="addDeck">
          {this.addDeckButton()}
        </div>
        <div className="deck-container">
          {this.getDeck(deck)}
        </div>
      </div>
    );
  }

});