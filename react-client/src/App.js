import React from 'react';
import Minion from './assets/minion.png'
import MinionSection1 from './assets/minion-section-1.png'
import MinionKevin from './assets/minion-kevin.png'
import MinionMark from './assets/minion-mark.png'
import MinionJerry from './assets/minion-jerry.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { faGrinTongueWink, faHeart } from '@fortawesome/free-regular-svg-icons'
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
          <div className="section-1-boxes">
            <div>
              <FontAwesomeIcon icon={faBattleNet} />
              <span>Divertido</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faGrinTongueWink} />
              <span>Engraçado</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <span>Fofo</span>
            </div>
          </div>
        </div>
        <div>
          <img src={MinionSection1} />
        </div>
      </section>
      <section className="section-2">
        <div>
          <h3>Nomes</h3>
          <h2>Escolha já o Seu!</h2>
          <p>
            Com os nossos Actions Figures você pode ter na sua própria casa toda essa
            dirversão e fofura dos minion.
          </p>
        </div>
        <div className="section-2-boxes">
          <div>
            <h3>Mark</h3>
            <img src={MinionMark} />
          </div>
          <div>
            <h3>Kevin</h3>
            <img src={MinionKevin} />
          </div>
          <div>
            <h3>Jerry</h3>
            <img src={MinionJerry} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
