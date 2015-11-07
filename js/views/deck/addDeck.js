import React from 'react';

export default React.createClass({

  addDeckButton() {
    return (
      <button id="addDeckButton" onClick={this.props.onAddDeckClick}>
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
          {this.addDeckButton()}
        </div>
      </div>
    );
  }

});