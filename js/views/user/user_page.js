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
        <div className="deck-container">
          {this.getDeck(deck)}
        </div>
      </div>
    );
  }

});

// import React from 'react';

// export default React.createClass({

//   processDeck(item) {

//     let onDeckSelect = this.props.onDeckSelect;

//     return (
//       <div className="deckSelect" onClick={() => onDeckSelect(item.id)}>
//         <p>{item.title}</p>
//       </div>
//     );
//   },

//   getDeck(deck) {
//     return deck.map(this.processDeck);
//   },

//   addCardButton() {

//     return (
//       <button id="addDeckButton" onClick={this.props.onAddDeckClick}>
//         Add Deck
//       </button>
//     );
//   },

//   render() {

//     let deck = this.props.deck;

//     return (
//       <div>
//         <div className="addDeck">
//           <label className="input">New Deck Title: <input type="text" id="deck"/></label>
//           {this.addCardButton()}
//         </div>
//         <div className="deck-container">
//           {this.getDeck(deck)}
//         </div>
//       </div>
//     );
//   }

// });