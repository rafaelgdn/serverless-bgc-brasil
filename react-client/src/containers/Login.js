import React from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { Auth } from 'aws-amplify'
import { ToastContainer, toast } from 'react-toastify'
import { useAppContext } from '../libs/contextLib'
import { useHistory } from 'react-router-dom'
import './Login.css'

function Login () {
  const { userHasAuthenticated } = useAppContext()
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const onSubmit = async ({ email, password }) => {
    try {
      await Auth.signIn(email, password)
      toast.success(<MsgSuccess />)
      userHasAuthenticated(true)
      history.push('/')
    } catch (err) {
      toast.error(<MsgError />)
    }
  }

  const MsgSuccess = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>Login realizado com sucesso.</span>
    </div>
  )

  const MsgError = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <span>Falha no login.</span>
    </div>
  )

  return (
    <div className='login'>
      <ToastContainer />
      <div className='login-box'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='email'
            name='email'
            placeholder='Digite seu email'
            ref={register({ required: true })}
          />
          {errors.email && <span><FontAwesomeIcon icon={faExclamationTriangle} />Digite seu email</span>}
          <input
            type='password'
            name='password'
            placeholder='Digite sua senha'
            ref={register({ required: true })}
          />
          {errors.password && <span><FontAwesomeIcon icon={faExclamationTriangle} />Digite sua senha </span>}
          <input type='submit' className='login-input-button' value='Login' />
        </form>
      </div>
    </div>
  )
}

export default Login
