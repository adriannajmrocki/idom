import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (  
    <Fragment>
      <div className="jumbotron" style={{ backgroundColor: "#fff" }}>
        <h1 className="display-3">IDOM</h1>
        <p className="lead">TWÓJ INTELIGENTNY DOM W JEDNYM MIEJSCU</p>
        <hr className="my-4" />
        <p>Dzięki aplikacji IDOM możesz kontrolować swój inteligentny dom nie ruszając się z miejsca. <br /> Dołącz do nas i zobacz jakie to proste!</p>
        <p className="lead">
          <Link to="/register"><button className="btn btn-primary btn-lg">Dołącz do nas!</button></Link>
        </p>
      </div>
    </Fragment>
  );
}
 
export default Home;