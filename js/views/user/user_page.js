import React from 'react';

export default React.createClass({

  getDeck(item) {
    let onDeckSelect = this.props.onDeckSelect;

    return (
      <div key={item.id} className="deckSelect" onClick={() => onDeckSelect(item.id)}>
        <p>{item.title}</p>
      </div>
    );
  },

  // processData(data) {
  //   console.log(data);
  //   return data.map(this.getDeck);
  // },

  addDeckButton() {
    return (
      <button id="addDeckButton" onClick={this.props.onAddDeckClick}>
        Add New Deck
      </button>
    );
  },

  render() {

    return (
      <div>
        <div className="addDeck">
          {this.addDeckButton()}
        </div>
        <div className="deck-container">
          {this.props.decks.map(this.getDeck)}
        </div>
      </div>
    );
  }

});

// import React from 'react';

// export default React.createClass({

//   getDeck(deck) {
//     return (
//       <div key={deck.id} className="deckSelect">
//         <p>{deck.title}</p>
//       </div>
//     );
//   },

//   addDeckButton() {
//     return (
//       <button id="addDeckButton" onClick={this.props.onAddDeckClick}>
//         Add New Deck
//       </button>
//     );
//   },

//   render() {

//     let deck = this.props.deck;

//     return (
//       <div>
//         <div className="addDeck">
//           {this.addDeckButton()}
//         </div>
//         <div className="deck-container">
//           {this.getDeck(deck)}
//         </div>
//       </div>
//     );
//   }

// });