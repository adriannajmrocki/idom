import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addCamera } from '../../actions/cameras';

import Alerts from '../Alerts/Alerts';

class AddCamera extends Component {

  state = {  
    name: ''
  }

  static propTypes = {
    addCamera: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const newCamera = { name };

    this.props.addCamera(newCamera);
    this.setState({ name: '' });
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Dodaj kamerę</h2>
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
              <button className="btn btn-primary">Dodaj</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default connect(null, { addCamera })(AddCamera);