import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { useTranslation } from "react-i18next";

import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { requestFirebaseNotificationPermission, onMessageListener } from '../../firebaseInit';
import { sendFirebaseToken, getFirebaseToken } from '../../actions/push';

import './style.css';

const Board = (props) => {

  const { t } = useTranslation('common');

  useEffect(() => {
    onMessageListener()
    .then((payload) => {
      toast.warn(`${payload.notification.body}`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
    .catch((err) => {
      toast.error(JSON.stringify(err));
    });
  }, [])

  requestFirebaseNotificationPermission()
  .then((firebaseToken) => {
    // eslint-disable-next-line no-console

    const registration_id = firebaseToken;
    const type = 'web';
    const data = { registration_id, type }

    props.getFirebaseToken();
    
    if (props.firebaseTokenStatus !== 200) {
      props.sendFirebaseToken(data);
    }
  })
  .catch((err) => {
    return err;
  });

  return (  
    <div className="board-container">
      <ToastContainer autoClose={8000} position="top-center" />

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

const mapStateToProps = state => ({
  isFirebaseTokenSent: state.push.isFirebaseTokenSent,
  firebaseTokenStatus: state.push.firebaseTokenStatus
})
 
export default connect(mapStateToProps, { sendFirebaseToken, getFirebaseToken })(Board);