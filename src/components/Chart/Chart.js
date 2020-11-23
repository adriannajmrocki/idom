import React, { Component } from 'react';

import '../../styles/utilStyles.css';

class Chart extends Component {
  state = {  }
  render() { 
    return (  
      <div className="container">
        <div className="head">
          <h2>Wykres</h2>
          <div className="line" style={{"width": "900px"}}></div>
        </div>
      </div>
    );
  }
}
 
export default Chart;