import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCameras } from '../../actions/cameras';

import '../../styles/utilStyles.css'
import './style.css';

class Cameras extends Component {

  static propTypes = {
    cameras: PropTypes.array.isRequired,
    getCameras: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getCameras();
  }

  render() {
    return (
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i class="fas fa-video fa-2x"></i>
          <h2>Kamery</h2>
          <div className="line"></div>
          <Link to='/add-camera'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        {this.props.cameras.map(camera => {
          return (
            <div key={camera.id} className="item">
              <ul className="item-ul">
                <li className="item-li">{camera.name}</li>
                <li className="item-li"><Link>PODGLĄD</Link></li>
                <li className="icon item-li"><Link to={`/edit-camera/${camera.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                <li className="icon item-li"><i className="far fa-trash-alt fa-lg"></i></li>
              </ul>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cameras: state.cameras.cameras
})

export default connect(mapStateToProps, { getCameras })(Cameras);