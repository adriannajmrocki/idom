import React, { Component } from 'react';

class NewPasswordPage extends Component {
  state = {  
    newPassword1: '',
    newPassword2: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log("OK NEW PASSWORD")
  }

  render() { 
    return (  
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Nowe hasło</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Nowe hasło</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword1"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
            </div>
            <div className="form-group">
              <label>Powtórz nowe hasło</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword2"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Potwierdź</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 
export default NewPasswordPage;