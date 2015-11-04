import React from 'react';
import Grid from './grid';
import Column from './column';

export default React.createClass({

  getHeadingData() {
    let firstPerson = this.props.people[0];
    let keys = Object.keys(firstPerson);
    return keys.filter(key => key !== "id");
  },

  render() {
    return (
      <table>
        <Column headingData={this.getHeadingData()}/>
        <Grid data={this.props.people}/>
      </table>
    );
  }

}); 