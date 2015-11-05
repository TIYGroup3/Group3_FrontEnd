import React from 'react';
import Grid from './grid';
import Column from './column';
import Input from './input';

export default React.createClass({

  getHeadingData() {
    let firstPerson = this.props.people[0];
    let keys = Object.keys(firstPerson);
    return keys.filter(key => key !== "id");
  },

  render() {
    return (
      <div>
        <Input/>
        <table>
          <Column headingData={this.getHeadingData()}/>
          <Grid data={this.props.people}/>
        </table>
      </div>
    );
  }

}); 