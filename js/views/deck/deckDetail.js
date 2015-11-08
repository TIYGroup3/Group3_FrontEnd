import React from 'react';
// import Grid from './grid';

export default React.createClass({

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
        <table>
        </table>
      </div>
    );
  }
}); 