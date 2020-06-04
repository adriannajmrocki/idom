import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
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
        <Link to='add-sensor'><button type="button" className="btn btn-primary btn-lg btn-block">Dodaj czujnik</button></Link>
        <table style={{marginTop: "30px"}} className="table table-striped">
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
                <td><Link to={`/edit-sensor/${sensor.id}`}><button className="btn btn-primary btn-sm">Edytuj</button></Link></td>
                <td><button onClick={this.props.deleteSensor.bind(this, sensor.id)} className="btn btn-danger btn-sm">Usuń</button></td>
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