import React, { useEffect } from 'react';

import '../../styles/utilStyles.css'
import './style.css';

function Cameras() {
  useEffect(() => {
    // this.props.getCameras(); --- import z actions/cameras
  }, [])

  return (
    <div className="container">
      <div className="head" style={{"marginBottom": "40px"}}>
        <i class="fas fa-video fa-2x"></i>
        <h2>Kamery</h2>
        <div className="line"></div>
      </div>

      <div>LISTA KAMER</div>
    </div>
  )
}

export default Cameras;