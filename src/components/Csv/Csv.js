import React, { useState } from 'react';

import '../../styles/utilStyles.css';
import './style.css';

const Csv = () => {

  const [filter, setFilter] = useState('');

  const handleFilterSelect = e => {
    setFilter(e.target.value);
    console.log(filter);
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log('submit');
  }

  return (  
    <div className="container">
      <div className="head" style={{"marginBottom": "40px"}}>
        <i class="far fa-file-alt fa-2x"></i>
        <h2>Plik CSV</h2>
        <div className="line"></div>
      </div>

      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Wybierz filtr</label>
              <select className="form-control" onChange={handleFilterSelect} value={filter}>
                <option value="" disabled defaultValue></option>
                <option value="sensors">Czujniki</option>
                <option value="categories">Kategorie</option>
              </select>
            </div>

            {filter === 'sensors' ?
            <div className="form-group">
              <label>Czujniki</label>
            </div>
            : false }

            {filter === 'categories' ?
            <div className="form-group">
              <label>Kategorie</label>
            </div>
            : false }

            {/* <div className="form-group">
              <label>Kategoria</label>
              <select className="form-control" onChange={this.handleCategorySelect} value={this.state.category}>
                <option value="" disabled defaultValue></option>
                <option value="clicker">Przycisk</option>
                <option value="bulb">Żarówka</option>
                <option value="roller_blind">Roleta</option>
              </select>
            </div> */}

            {/* {this.state.category === 'roller_blind' ?
            <div className="form-group">
              <label>Aktualny stan rolet</label>
              <select className="form-control" onChange={this.handleDataSelect} value={this.state.data}>
                <option value="" defaultValue></option>
                <option value="true">Odsłonięte</option>
                <option value="false">Zasłonięte</option>
              </select>
            </div>
            : false } */}

            <div className="form-group">
              <button className="btn btn-primary">Dodaj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
 
export default Csv;