import React from 'react';

export default React.createClass({

  getHeading(key) {
    return <th key={key}>{key}</th>;
  },

  render() {
    return (
      <thead>
        <tr>
          {this.props.headingData.map(this.getHeading)}
        </tr>
      </thead>
    );
  }

}); 