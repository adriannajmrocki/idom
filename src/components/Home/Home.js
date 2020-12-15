import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../i18n/i18n';

import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (  
    <Fragment>
      <div className="jumbotron" style={{ backgroundColor: "#fff" }}>
        <h1 className="display-3">IDOM</h1>
        <p className="lead">{t('TWÓJ INTELIGENTNY DOM W JEDNYM MIEJSCU')}</p>
        <hr className="my-4" />
        <p>Dzięki aplikacji IDOM możesz kontrolować swój inteligentny dom nie ruszając się z miejsca. <br /> Dołącz do nas i zobacz jakie to proste!</p>
        <p className="lead">
          <Link to="/register"><button className="btn btn-primary btn-lg">Dołącz do nas!</button></Link>
        </p>
        <button onClick={() => i18n.changeLanguage('pl')}>PL</button>
        <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      </div>
    </Fragment>
  );
}
 
export default Home;