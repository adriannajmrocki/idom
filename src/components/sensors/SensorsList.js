import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getSensors, deleteSensor } from '../../actions/sensors';

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

    const { t } = this.props;

    return (  
      <div className="container">
        <div className="head">
          <h2>{t('header.sensors')}</h2>
          <div className="line"></div>
          <Link to='add-sensor'><button type="button" className="add-btn">+</button></Link>
        </div>

        <div className="csv">
          <p>{t('sensors.csv')}?</p>
          <p><Link to="/csv">{t('sensors.generate')} <i className="far fa-file-alt"></i></Link></p>
        </div>
        
        <div className="category-field">
          <i className="fas fa-thermometer-half fa-2x"></i>
          <h5 className="category-title">{t('sensors.temp')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'temperature') {
            return (
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} °C`}</li>
                    <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                    <li className="item-li"><Link to={`/chart/${sensor.id}`}><i className="fas fa-chart-line fa-lg"></i></Link></li>
                    <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                  </ul>
                </div>
            )
          }
        })}

        <div className="category-field" style={{"marginTop": "40px"}}>
          <i className="fas fa-water fa-2x"></i>
          <h5 className="category-title">{t('sensors.water-temp')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'water_temp') {
            return (
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} °C`}</li>
                    <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
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
          <h5 className="category-title">{t('sensors.hum')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} %`}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
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
          <h5 className="category-title">{t('sensors.air-hum')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'air_humidity') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} %`}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
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
          <h5 className="category-title">{t('sensors.pressure')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'atmo_pressure') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} hPa`}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
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
          <h5 className="category-title">{t('sensors.alc')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'breathalyser') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} ‰`}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
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
          <h5 className="category-title">{t('sensors.smoke')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'smoke') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li">{`${sensor.last_data === null ? '---' : sensor.last_data} %`}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-smoking fa-2x"></i>
          <h5 className="category-title">Gaz</h5>
        </div>
        {this.props.sensors.map((sensor) => {
          if (sensor.category === 'gas') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i className="fas fa-cloud-rain fa-2x"></i>
          <h5 className="category-title">{t('sensors.rain')}</h5>
        </div>
        {this.props.sensors.map((sensor, id) => {
          if (sensor.category === 'rain_sensor') {
            return (
              <div key={sensor.id} className="item">
                <ul className="item-ul">
                  <li className="item-li">{sensor.name}</li>
                  <li className="item-li"><i className="fas fa-battery-three-quarters fa-sm"></i>{`${sensor.battery_level}%`}</li>
                  <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
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
 
export default withTranslation('common')(connect(mapStateToProps, { getSensors, deleteSensor })(SensorsList));