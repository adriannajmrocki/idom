import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getCameras, deleteCamera } from '../../actions/cameras';
import { baseURL } from '../../utils/url';

import '../../styles/utilStyles.css'
import './style.css';

class Cameras extends Component {

  static propTypes = {
    cameras: PropTypes.array.isRequired,
    getCameras: PropTypes.func.isRequired,
    deleteCamera: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getCameras();
  }

  render() {

    const { t } = this.props;

    return (
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i class="fas fa-video fa-2x"></i>
          <h2>{t('cameras.cams')}</h2>
          <div className="line"></div>
          <Link to='/add-camera'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        {this.props.cameras.map(camera => {
          return (
            <div key={camera.id} className="item">
              <ul className="item-ul">
                <li className="item-li item-li-name">{camera.name}</li>
                <li className="item-li item-li-icon"><a href={`${baseURL}/cameras/stream/${camera.id}`} target="_blank" rel="noreferrer"><i class="far fa-play-circle fa-lg"></i></a></li>
                <li className="item-li item-li-icon"><Link to={`/edit-camera/${camera.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                <li className="item-li item-li-icon"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteCamera.bind(this, camera.id)}></i></li>
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

export default withTranslation('common')(connect(mapStateToProps, { getCameras, deleteCamera })(Cameras));