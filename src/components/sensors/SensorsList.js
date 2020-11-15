import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    return (  
      // <Fragment>
      //   <div className="comntainer">
      //     <h2 style={{ marginTop: "40px" }}>Czujniki</h2>
      //     <Link to='add-sensor'><button type="button" className="btn btn-primary btn-lg btn-block">Dodaj czujnik</button></Link>
      //     <table style={{marginTop: "30px"}} className="table table-striped">
      //       <thead>
      //         <tr>
      //           <th>Nazwa czujnika</th>
      //           <th>Kategoria</th>
      //           <th>Najnowsza wartość</th>
      //           <th></th>
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {this.props.sensors.map(sensor => (
      //           <tr key={sensor.id}>
      //             <td>{sensor.name}</td>
      //             <td>{sensor.category === 'temperature' ? 'Temperatura' : 'Wilgotność'}</td>
      //             <td>{sensor.category === 'temperature' ? `${sensor.last_data} °C` : `${sensor.last_data} %`}</td>
      //             <td><Link to={`/edit-sensor/${sensor.id}`}><button className="btn btn-primary btn-sm">Edytuj</button></Link></td>
      //             <td><button onClick={this.props.deleteSensor.bind(this, sensor.id)} className="btn btn-danger btn-sm">Usuń</button></td>
      //           </tr>
      //         ))}
      //       </tbody>
      //     </table>
      //   </div>
      // </Fragment>

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
          if (sensor.category === 'temperature' || sensor.category === 'water_temp') {
            return (
              <Fragment>
                <div key={sensor.id} className="item">
                  <ul className="item-ul">
                    <li className="item-li">{sensor.name}</li>
                    <li className="item-li">{`${sensor.last_data} °C`}</li>
                    <li className="item-li"><Link to={`/edit-sensor/${sensor.id}`}><i className="far fa-edit fa-lg"></i></Link></li>
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
                  <li className="item-li"><i className="far fa-trash-alt fa-lg" onClick={this.props.deleteSensor.bind(this, sensor.id)}></i></li>
                </ul>
              </div>
            )
          }
        })}

        <div className="category-field add-margin" style={{"marginTop": "40px"}}>
          <i class="fas fa-smoking fa-2x"></i>
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