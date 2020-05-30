import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSensors } from '../actions/sensors';

class SensorsList extends Component {

  static propTypes = {
    sensors: PropTypes.array.isRequired,
    getSensors: PropTypes.func.isRequired
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
                <td>{sensor.name}</td>
                <td>{sensor.category}</td>
                <td><button className="btn btn-danger btn-sm">Usuń</button></td>
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
 
export default connect(mapStateToProps, { getSensors })(SensorsList);