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

  render() {

    let deck = this.props.deck;

    return (
      <div className="deck-container">
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
        {this.getDeck(deck)}
      </div>
    );
  }

});