import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSensors, deleteSensor } from '../actions/sensors';

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
      <Fragment>
        <h2 style={{ marginTop: "40px" }}>Czujniki</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nazwa czujnika</th>
              <th>Kategoria</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.sensors.map(sensor => (
              <tr key={sensor.id}>
                {sensor.is_active ? <td>{sensor.name}</td> : false}
                {sensor.is_active ? <td>{sensor.category}</td> : false}
                {sensor.is_active ? <td><button onClick={this.props.deleteSensor.bind(this, sensor.id)} className="btn btn-danger btn-sm">Usuń</button></td> : false}
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sensors: state.sensors.sensors
})
 
export default connect(mapStateToProps, { getSensors, deleteSensor })(SensorsList);