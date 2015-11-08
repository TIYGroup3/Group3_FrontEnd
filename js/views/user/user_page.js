import React from 'react';
import ReactDom from 'react-dom';

export default React.createClass({

  getDeck(deck) {

    let onDeckSelect = this.props.onDeckSelect;

    return (
      <div key={deck.id} id={deck.id} className="individualDeck" onClick={() => onDeckSelect(deck.id)}>
        {deck.title}
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
          {this.props.data.map(this.getDeck)}
        </div>
      </div>
    );
  }

});