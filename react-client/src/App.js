import React from 'react';
import Minion from './assets/minion.png'
import MinionSection1 from './assets/minion-section-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="minion-img">
          <img src={Minion} />
        </div>
        <div>
          <h1>Minion's Action Figure</h1>
          <p>Produto extremamente realista, repleto de detalhes em feições, cores de roupas e articulações</p>
          <div className="star-svg">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
          <button>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Compre agora</span>
          </button>
        </div>
      </header>
      <section>
        <div className="section-1">
          <h3>Sobre a Action Figure</h3>
          <h2>Um Minion pode fazer a alegria do seu dia.</h2>
          <p>Eles são fofos, desastrados, falam uma língua engraçada e são
             as criaturinhas mais amadas do cinema e da internet nos últimos tempos.</p>
        </div>
        <div>
          <img src={MinionSection1} />
        </div>
      </section>
    </div>
  );
}

export default App;
