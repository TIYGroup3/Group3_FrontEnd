import React from 'react';
import Row from './row';

export default React.createClass({

  getRow(person) {
    return <Row key={person.id} person={person}/>;
  },

  render() {
    return (
      <tbody>
        {this.props.data.map(this.getRow)}
      </tbody>
    );
  }

}); 