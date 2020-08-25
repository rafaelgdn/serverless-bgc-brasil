import React from 'react'
import Minion from '../assets/minion.png'
import MinionSection1 from '../assets/minion-section-1.png'
import MinionKevin from '../assets/minion-kevin.png'
import MinionMark from '../assets/minion-mark.png'
import MinionJerry from '../assets/minion-jerry.png'
import MinionBox from '../assets/minion-box.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faShoppingCart, faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { faBattleNet } from '@fortawesome/free-brands-svg-icons'
import { faGrinTongueWink, faHeart } from '@fortawesome/free-regular-svg-icons'
import { API } from 'aws-amplify'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Home.css'

export default function Home () {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = ({ name, email, minion, quantity }) => {
    API.post('mail', '/send', {
      body: {
        name,
        email,
        minion,
        quantity
      }
    }).then(res => {
      toast.success(<MsgSuccess />)
    }).catch(_ => {
      toast.error(<MsgError />)
    })
  }

  const MsgSuccess = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>Reserva feita com sucesso.</span>
    </div>
  )

  const MsgError = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <span>Cadastro da reserva falhou.</span>
    </div>
  )

  return (
    <div className='App'>
      <ToastContainer />
      <header>
        <div className='minion-img'>
          <img src={Minion} alt='Minion' />
        </div>
        <div>
          <h1>Minion's Action Figure</h1>
          <p>Produto extremamente realista, repleto de detalhes em feições, cores de roupas e articulações</p>
          <div className='star-svg'>
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStarHalfAlt} />
          </div>
          <a href='#cadastro'>
            <button>
              <FontAwesomeIcon icon={faShoppingCart} />
              <span>Reserve agora</span>
            </button>
          </a>
        </div>
      </header>
      <section>
        <div className='section-1'>
          <h3>Sobre a Action Figure</h3>
          <h2>Um Minion pode fazer a alegria do seu dia.</h2>
          <p>Eles são fofos, desastrados, falam uma língua engraçada e são
             as criaturinhas mais amadas do cinema e da internet nos últimos tempos.
          </p>
          <div className='section-1-boxes'>
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
        <div className='section-1-img'>
          <img src={MinionSection1} alt='Minion' />
        </div>
      </section>
      <section className='section-2'>
        <div>
          <h3>Nomes</h3>
          <h2>Escolha já o Seu!</h2>
          <p>
            Com os nossos Actions Figures você pode ter na sua própria casa toda essa
            dirversão e fofura dos minion.
          </p>
        </div>
        <div className='section-2-boxes'>
          <div>
            <h3>Mark</h3>
            <img src={MinionMark} alt='Minion' />
          </div>
          <div>
            <h3>Kevin</h3>
            <img src={MinionKevin} alt='Minion' />
          </div>
          <div>
            <h3>Jerry</h3>
            <img src={MinionJerry} alt='Minion' />
          </div>
        </div>
      </section>
      <footer>
        <section className='section-3'>
          <div className='section-3-img'>
            <img src={MinionBox} alt='Minion' />
          </div>
          <div>
            <h2>Reserve seu Minion</h2>
            <p>
              Não perca mais tempo e reserve seu minion agora,
              basta preencher o cadastro que entraremos em contato com você.
            </p>
            <div id='cadastro' className='section-3-box'>
              <h1>Cadastro de Reserva</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type='text'
                  name='name'
                  placeholder='Digite seu nome'
                  ref={register({ required: true })}
                />
                {errors.name && <span><FontAwesomeIcon icon={faExclamationTriangle} />O nome é obrigatório!</span>}
                <input
                  type='email'
                  name='email'
                  placeholder='Digite seu email'
                  ref={register({ required: true })}
                />
                {errors.email && <span><FontAwesomeIcon icon={faExclamationTriangle} />O email é obrigatório!</span>}
                <label>Escolha seu personagem:</label>
                <select name='minion' ref={register({ required: true })}>
                  <option value=''>Escolha um...</option>
                  <option value='mark'>Mark</option>
                  <option value='kevin'>Kevin</option>
                  <option value='jerry'>Jerry</option>
                </select>
                {errors.minion && <span><FontAwesomeIcon icon={faExclamationTriangle} />A escolha do minion é obrigatória!</span>}
                <input
                  type='text'
                  name='quantity'
                  placeholder='Digite a quantidade'
                  ref={register({ required: true })}
                />
                {errors.quantity && <span><FontAwesomeIcon icon={faExclamationTriangle} />A quantidade é obrigatória!</span>}
                <input type='submit' className='input-button' value='Reservar' />
              </form>
            </div>
          </div>
        </section>
      </footer>
    </div>
  )
}
