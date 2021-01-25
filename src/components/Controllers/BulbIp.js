import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { setBulbIp } from '../../actions/controllers';

import '../../styles/utilStyles.css';

class BulbIp extends Component {
  state = {  
    ip: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log(this.state.ip);
  }

  handleSubmit = e => {
    e.preventDefault();

    const ipAddress = { ip_address: this.state.ip };
    const id = this.props.match.params.id;

    this.props.setBulbIp(id, ipAddress);

    this.setState({ ip: '' })
  }

  render() { 

    const { ip } = this.state;
    const { t } = this.props;

    return (  
      <div className="col-md-6 m-auto custom-position">
        <div className="card card-body mt-5 custom-border-style custom-position">
          <h2 className="text-center custom-mb">{t('controllers.bulb-ip')}</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>{t('controllers.ip')}</label>
              <input
                type="text"
                className="form-control custom-input-style"
                name="ip"
                onChange={this.handleChange}
                value={ip}
              />
            </div>

            <div className="ff-center">
              <button className="button">{t('sensors.add')}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default withTranslation('common')(connect(null, { setBulbIp })(BulbIp));