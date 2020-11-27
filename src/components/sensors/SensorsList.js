import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSensors, deleteSensor, getChartData } from '../../actions/sensors';

import '../../styles/utilStyles.css';
import './style.css';

class SensorsList extends Component {

  static propTypes = {
    sensors: PropTypes.array.isRequired,
    getSensors: PropTypes.func.isRequired,
    deleteSensor: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.getSensors();
  }

  render() { 
    return (  
      <div className="container">
        <div className="head">
          <h2>Czujniki</h2>
          <div className="line"></div>
          <Link to='add-sensor'><button type="button" className="add-btn">+</button></Link>
        </div>
        
        <div className="category-field">
          <i className="fas fa-thermometer-half fa-2x"></i>
          <h5 className="category-title">Temperatura</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'temperature') {
            return (
              <Fragment>
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data} °C`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                    <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                    <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                  </ul>
                </div>
              </Fragment>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="fas fa-water fa-2x"></i>
          <h5 className="category-title">Temperatura wody</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'water_temp') {
            return (
              <Fragment>
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data} °C`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                    <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                    <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                  </ul>
                </div>
              </Fragment>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-tint fa-2x"></i>
          <h5 className="category-title">Wilgotność</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-tint fa-2x"></i>
          <h5 className="category-title">Wilgotność powietrza</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'air_humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
        
        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-sort-amount-up fa-2x"></i>
          <h5 className="category-title">Ciśnienie</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'atmo_pressure') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data} hPa`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-glass-cheers fa-2x"></i>
          <h5 className="category-title">Alkomat</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'breathalyser') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data}‰`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-smoking fa-2x"></i>
          <h5 className="category-title">Dym</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'smoke') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  {/* <li className="data">{`${sensor.last_data}%`}</li> */}
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-cloud-rain fa-2x"></i>
          <h5 className="category-title">Deszcz</h5>
        </div>
        {this.props.sensors.map(sensor => {
          if (sensor.category === 'rain_sensor') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  {/* <li className="data">{`${sensor.last_data}%`}</li> */}
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sensors: state.sensors.sensors
})
 
export default connect(mapStateToProps, { getSensors, deleteSensor })(SensorsList);