import React, { useEffect } from 'react';

import '../../styles/utilStyles.css';
import './style.css';

function Controllers() {
  useEffect(() => {
    // this.props.getControllers(); --- import z actions/controllers
  }, [])

  return (
    <div className="container">
      <div className="head" style={{"marginBottom": "40px"}}>
        <i class="fas fa-gamepad fa-2x"></i>
        <h2>Sterowniki</h2>
        <div className="line"></div>
      </div>

      <div>LISTA STEROWNIKÓW</div>
    </div>
  )
}

export default Controllers;