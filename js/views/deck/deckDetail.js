import React from 'react';
// import Grid from './grid';

export default React.createClass({

  getCards(card) {

    return (
      <div className="card" key={card.id} id={card.id}>
        <div className="cardFront">Q: {card.front}</div>
        <div className="cardBack">A: {card.back}</div>
        <hr/>
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