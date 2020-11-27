import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getControllers, deleteController, runController } from '../../actions/controllers';

import '../../styles/utilStyles.css';
import './style.css';

class Controllers extends Component {

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
    return (
      <div className="container">
        <div className="head" style={{"marginBottom": "40px"}}>
          <i className="fas fa-gamepad fa-2x"></i>
          <h2>Sterowniki</h2>
          <div className="line"></div>
          <Link to='/add-controller'><button type="button" className="add-btn">+</button></Link>
        </div>
  
        <div className="category-field">
          <i className="fas fa-toggle-on fa-2x"></i>
          <h5 className="category-title">Przycisk</h5>
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
          <h5 className="category-title">Żarówka</h5>
        </div>
        {this.props.controllers.map(controller => {
          if (controller.category === 'bulb') {
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
          <i className="fas fa-scroll fa-2x"></i>
          <h5 className="category-title">Roleta</h5>
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
  controllers: state.controllers.controllers
})

export default connect(mapStateToProps, { getControllers, deleteController, runController })(Controllers);