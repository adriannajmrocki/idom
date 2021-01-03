import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Switch from "react-switch";
import { withTranslation } from 'react-i18next';

import { getControllers, deleteController, runController, getControllerData, runBulb } from '../../actions/controllers';

import '../../styles/utilStyles.css';
import './style.css';

class Controllers extends Component {

  state = {
    flag: '',
  }

  static propTypes = {
    controllers: PropTypes.array.isRequired,
    getControllers: PropTypes.func.isRequired,
    deleteController: PropTypes.func.isRequired,
    runController: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getControllers();
  }

  render() {

    const { t } = this.props;

    return (
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i className="fas fa-gamepad fa-2x"></i>
          <h2>{t('header.controllers')}</h2>
          <div className="line"></div>
          <Link to='/add-controller'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        <div className="category-field">
          <i className="fas fa-toggle-on fa-2x"></i>
          <h5 className="category-title">{t('controllers.clicker')}</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'clicker') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{controller.name}</li>
                  <li className="item-li"><i className="far fa-play-circle fa-lg"></i></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="far fa-lightbulb fa-2x"></i>
          <h5 className="category-title">{t('controllers.bulb')}</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'bulb') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li" style={{"flex": "3"}}>{controller.name}</li>
                  <li className="item-li">
                    <Switch
                      checked={controller.data} 
                      onChange={e => {
                        let data = {};

                        if (controller.data === true) {
                          data = { flag: 'off' }
                        } else {
                          data = { flag: 'on' }
                        }

                        this.props.runBulb(controller.id, data);
                        controller.data = !controller.data;
                      }} 
                      onColor='#987316'
                    />
                  </li>
                  <li className="icon item-li"><Link to={`/bulb-color/${controller.id}`}><i className="fas fa-palette fa-lg"></i></Link></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="fas fa-scroll fa-2x"></i>
          <h5 className="category-title">{t('controllers.blind')}</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'roller_blind') {
            return (
              <div key={controller.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{controller.name}</li>
                  <li className="item-li"><i className="far fa-play-circle fa-lg" onClick={this.props.runController.bind(this, controller.name)}></i></li>
                  <li className="icon item-li"><Link to={`/edit-controller/${controller.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="icon item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteController.bind(this, controller.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  controllers: state.controllers.controllers,
  controllerData: state.controllers.controllerData
})

export default withTranslation('common')(connect(mapStateToProps, { getControllers, deleteController, runController, getControllerData, runBulb })(Controllers));