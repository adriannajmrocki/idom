import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { addCamera } from '../../actions/cameras';

import Alerts from '../Alerts/Alerts';

import '../../styles/utilStyles.css';
import './style.css';

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

    const { name } = this.state;
    const { t } = this.props;

    return (  
      <div className="form-container">
        <form className="app-forms" onSubmit={this.handleSubmit}>
          <h2 className="form-header">{t('cameras.add-cam')}</h2>
          <div className="form-field">
            <label>{t('sensors.name')}</label>
            <input 
              type="text"
              className="form-input"
              name="name"
              onChange={this.handleChange}
              value={name}
            />
          </div>

          <div className="form-field ff-center">
            <button className="button">{t('sensors.add')}</button>
          </div>
        </form>
      </div>
    );
  }
}
 
export default withTranslation('common')(connect(null, { addCamera })(AddCamera));