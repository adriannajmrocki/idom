import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { updateController, getControllerData } from '../../actions/controllers';

import { createMessage } from '../../actions/messages';
import Alerts from '../Alerts/Alerts';

class EditController extends Component {

  state = {  
    name: '',
    category: this.props.controllerCategory,
    data: this.props.controllerData
  }

  static propTypes = {
    updateController: PropTypes.func.isRequired,
    getControllerData: PropTypes.func.isRequired
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();

    const id = this.props.match.params.id
    const { name, category, data } = this.state;
    const updatedController = { name, category, data };

    if (name !== this.props.controllerName) {
      this.props.updateController(id, updatedController);
      this.setState({ name: '' })
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getControllerData(id);
  }

  render() { 

    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">{t('controllers.edit-controller')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>{t('sensors.name')}</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder={this.props.controllerName}
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary">{t('sensors.edit')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  controllerName: state.controllers.controllerName,
  controllerCategory: state.controllers.controllerCategory,
  controllerData: state.controllers.controllerData,
})
 
export default withTranslation('common')(connect(mapStateToProps, { updateController, getControllerData })(EditController));