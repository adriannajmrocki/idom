import React from 'react';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";

import './style.css';

const Board = () => {

  const { t } = useTranslation('common');

  return (  
    <div className="board-container">
        <div className="board-left">
          <h1>{t('board.welcome')} <span>IDOM</span>!</h1>
          <p>{t('board.p')}</p>
        </div>

        <div className="board-right">
          <Link to="/dashboard">
            <div className="board-card sensors-card">
              <i className="fas fa-wifi fa-5x"></i>
              <h5>{t('header.sensors')}</h5>
            </div>
          </Link>
          <Link to="/controllers">
            <div className="board-card controllers-card">
              <i className="fas fa-gamepad fa-5x"></i>
              <h5>{t('header.controllers')}</h5>
            </div>
          </Link>
          <Link to="/actions">
          <div className="board-card actions-card">
            <i className="fas fa-angle-double-right fa-5x"></i>
            <h5>{t('header.actions')}</h5>
          </div>
          </Link>
          <Link to="/cameras">
          <div className="board-card cameras-card">
            <i className="fas fa-video fa-5x"></i>
            <h5>{t('header.cameras')}</h5>
          </div>
          </Link>
          <Link to="/admin">
          <div className="board-card account-card">
            <i className="far fa-user fa-5x"></i>
            <h5>{t('header.account')}</h5>
          </div>
          </Link>
        </div>
    </div>
  );
}
 
export default Board;