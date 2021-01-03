import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { addController } from '../../actions/controllers';

import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class AddController extends Component {
  state = { 
    name: '',
    category: '',
    ip: '',
    data: null
  }

  static propTypes = {
    addController: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleCategorySelect = e => {
    this.setState({ category: e.target.value })
  }

  handleDataSelect = e => {
    this.setState({ data: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    const { name, category } = this.state;
    let { data, ip } = this.state;

    if (category !== 'roller_blind') {
      data = null;
    }

    if (category !== 'bulb') {
      ip = null;
    }

    const newController = { name, category, ip, data };

    if (category === 'roller_blind' && data === null) {
      this.props.createMessage({ noDataError: 'Podaj aktualny stan rolety' })
    } else if (category === 'bulb' && !ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
      this.props.createMessage({ ipError: 'Podany adres IP jest nieprawidłowy' })
    } else {
      this.props.addController(newController);
    }
    console.log('new', newController)

    this.setState({
      name: '',
      category: '',
      ip: '',
      data: null
    })
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('controllers.add-controller')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>{t('sensors.name')}</label>
              <input
                type="text"
                className="form-control custom-input-style"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
              />
            </div>

            <div className="form-group">
              <label>{t('sensors.category')}</label>
              <select className="form-control custom-input-style" onChange={this.handleCategorySelect} value={this.state.category}>
                <option value="" disabled defaultValue></option>
                <option value="clicker">{t('controllers.clicker')}</option>
                <option value="bulb">{t('controllers.bulb')}</option>
                <option value="roller_blind">{t('controllers.blind')}</option>
              </select>
            </div>

            {this.state.category === 'bulb' ?
            <div className="form-group">
              <label>{t('controllers.ip')}</label>
              <input 
                type="text"
                className="form-control custom-input-style"
                name="ip"
                onChange={this.handleChange}
                value={this.state.ip}
              />
            </div>
            : false }

            {this.state.category === 'roller_blind' ?
            <div className="form-group">
              <label>{t('controllers.current-pos')}</label>
              <select className="form-control custom-input-style" onChange={this.handleDataSelect} value={this.state.data}>
                <option value="" defaultValue></option>
                <option value="true">{t('controllers.up')}</option>
                <option value="false">{t('controllers.down')}</option>
              </select>
            </div>
            : false }

            <div className="ff-center">
              <button className="button">{t('sensors.add')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default withTranslation('common')(connect(null, { addController, createMessage })(AddController));