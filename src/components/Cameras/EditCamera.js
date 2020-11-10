import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateCamera, getCameraData } from '../../actions/cameras';
import { createMessage } from '../../actions/messages';

import Alerts from '../Alerts/Alerts';

class EditCamera extends Component {

  state = {  
    name: ''
  }

  static propTypes = {
    updateCamera: PropTypes.func.isRequired,
    getCameraData: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { name } = this.state;
    const updatedCamera = { name };

    if (name !== this.props.cameraName) {
      this.props.updateCamera(id, updatedCamera);
      this.setState({ name: '' })
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getCameraData(id);
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Edytuj kamerę</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nazwa</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder={this.props.cameraName}
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
  cameraName: state.cameras.cameraName,
})
 
export default connect(mapStateToProps, { updateCamera, getCameraData })(EditCamera);