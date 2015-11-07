import React from 'react';
import Grid from './grid';
import Column from './column';
// import Input from './input';

export default React.createClass({

  getHeadingData() {
    let firstPerson = this.props.people[0];
    let keys = Object.keys(firstPerson);
    return keys.filter(key => key !== "id");
  },

  submitCard() {
    return (
      <button id="addCardButton" onClick={this.props.onAddCardClick}>
        Add Card
      </button>
    );
  },

  cardInput() {
    return (
      <div>
        <label className="addCardTA">Front: <br/><textarea type="text" id="cardFront" className="front"/></label>
        <label className="addCardTA">Back: <br/><textarea type="text" id="cardBack" className="back"/></label>
        <br/>
        {this.submitCard()}
      </div>
    );
  },

  render() {
    return (

      <div className="deckTable">
        <h2 className="deckTitle">{this.props.title}</h2>
        <div className="newCard">
          <p>Add a Card</p>
          {this.cardInput()}
        </div>
        <table>
          <Column headingData={this.getHeadingData()}/>
          <Grid data={this.props.people}/>
        </table>
      </div>
    );
  }
}); 