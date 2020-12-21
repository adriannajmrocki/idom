import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Board = () => {
  return (  
    <div className="board-container">
        <div className="board-left">
          <h1>Witaj w <span>IDOM</span>!</h1>
          <p>Twój inteligentny dom jest gotowy do pracy. Wybierz odpowiednią kategorię i pozwól mu działać.</p>
        </div>

        <div className="board-right">
          <Link to="/dashboard">
            <div className="board-card sensors-card">
              <i className="fas fa-wifi fa-5x"></i>
              <h5>Czujniki</h5>
            </div>
          </Link>
          <Link to="/controllers">
            <div className="board-card controllers-card">
              <i className="fas fa-gamepad fa-5x"></i>
              <h5>Sterowniki</h5>
            </div>
          </Link>
          <Link to="/actions">
          <div className="board-card actions-card">
            <i className="fas fa-angle-double-right fa-5x"></i>
            <h5>Akcje</h5>
          </div>
          </Link>
          <Link to="/cameras">
          <div className="board-card cameras-card">
            <i className="fas fa-video fa-5x"></i>
            <h5>Kamery</h5>
          </div>
          </Link>
          <Link to="/admin">
          <div className="board-card account-card">
            <i className="far fa-user fa-5x"></i>
            <h5>Konto</h5>
          </div>
          </Link>
        </div>
    </div>
  );
}
 
export default Board;