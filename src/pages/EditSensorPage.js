import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSensor, getSensorData } from '../actions/sensors';

class EditSensorPage extends Component {

  state = {
    name: '',
    category: '',
    frequencyUnit: '',
    frequencyValue: ''
  }

  static propTypes = {
    sensorName: PropTypes.string.isRequired,
    sensorCategory: PropTypes.string.isRequired,
    updateSensor: PropTypes.func.isRequired,
    getSensorData: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSelect = e => {
    this.setState({ 
      category: e.target.value,
      frequencyUnit: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.frequencyValue, this.state.frequencyUnit);

    const id = this.props.match.params.id;

    let { name, category } = this.state;
    let sensor = { name, category };

    if (!name) {
      name = undefined;
      sensor = { name, category }
    } else if (!category) {
      category = undefined;
      sensor = { name, category }
    }

    this.props.updateSensor(id, sensor);
    this.setState({
      name: '',
      category: ''
    })
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    
    this.props.getSensorData(id)
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
      <div className="card card-body mt-5">
        <h2 className="text-center">Edytuj czujnik</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Nazwa</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label>Kategoria</label>
            <select className="form-control" onChange={this.handleSelect} value={this.state.category}>
              <option></option>
              <option value="temperature">Czujnik temperatury</option>
              <option value="humidity">Czujnik wilgotności</option>
            </select>
          </div>
          <div className="form-group">
              <label>Częstotliwość pobierania danych</label>
              <select className="form-control" onChange={this.handleSelect} value={this.state.frequencyUnit}>
                <option></option>
                <option value="seconds">Sekundy</option>
                <option value="minutes">Minuty</option>
                <option value="hours">Godziny</option>
                <option value="days">Dni</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                name="frequencyValue"
                onChange={this.handleChange}
                value={this.state.frequencyValue}
                placeholder="Wartość..."
              />
            </div>
          <div className="form-group">
            <button className="btn btn-primary">Potwierdź</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  sensorName: state.sensors.sensorName,
  sensorCategory: state.sensors.sensorCategory,
})
 
export default connect(mapStateToProps, { updateSensor, getSensorData })(EditSensorPage);
// export default connect(null, { updateSensor, getSensorData })(EditSensorPage);