import React from 'react';
// import Grid from './grid';

export default React.createClass({

  getCards(card) {

    return (
      <div id={card.id}>
        {card.id}
        {card.front}
        {card.back}
      </div>
    );
  },

  addCardButton() {
    return (
      <button id="addCardButton" onClick={this.props.onAddCardClick}>
        Add New Card
      </button>
    );
  },

  render() {
    return (

      <div className="deckTable">
        <h2 className="deckTitle">{this.props.title}</h2>
        <div className="newCard">
          {this.addCardButton()}
        </div>
        <div>
          {this.props.data.map(this.getCards)}
        </div>
      </div>
    );
  }
}); 