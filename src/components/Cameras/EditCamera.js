import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { updateCamera, getCameraData } from '../../actions/cameras';
import { createMessage } from '../../actions/messages';

import Alerts from '../Alerts/Alerts';

class EditCamera extends Component {

  state = {  
    name: '',
    isChanged: false
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
      this.setState({ 
        name: '',
        isChanged: true 
      })
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getCameraData(id);
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('cameras.edit-cam')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>{t('sensors.name')}</label>
              <input
                type="text"
                className="form-control custom-input-style"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder={!this.state.isChanged ? this.props.cameraName : ''}
              />
            </div>

            <div className="ff-center">
              <button className="button">{t('sensors.edit')}</button>
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
 
export default withTranslation('common')(connect(mapStateToProps, { updateCamera, getCameraData })(EditCamera));