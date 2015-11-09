import React from 'react';
import Row from './row';

export default React.createClass({

  getRow(card) {
    return <Row key={card.id} card={card}/>;
  },

  render() {
    return (
      <tbody>
        {this.props.data.map(this.getRow)}
      </tbody>
    );
  }

}); 