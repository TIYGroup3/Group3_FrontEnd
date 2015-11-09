import React from 'react';
import _ from 'underscore';
import Cell from './cell';

// {
//   "id" : '1',
//   "firstName" : "John",
//   "lastName" : "Doe",
//   "email" : "jdoe@example.com"
// }

export default React.createClass({

  getCells(card) {
    let cells = [];
    // key:value from object
    _.each(card, (value, key) => {
      if (key !== 'id') {
        // unique key required for each element by react
        cells.push(<Cell key={key} field={value}/>);
      }
    });
    return cells;
  },

  render() {
    return (
      <tr>{this.getCells(this.props.card)}</tr>
    );
  }

}); 