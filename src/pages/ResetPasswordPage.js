import React, { Component, Fragment } from 'react';

class ResetPasswordPage extends Component {
  state = {  
    email: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('reset ok')
  }

  render() { 
    return (  
      <Fragment>
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center">Reset hasła</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
              <p>
                * Na podany adres email zostanie wysłany link umożliwiający zmianę hasła.
              </p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}
 
export default ResetPasswordPage;