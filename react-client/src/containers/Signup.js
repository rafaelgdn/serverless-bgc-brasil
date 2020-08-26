import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'
import './Login.css'

function Signup () {
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()
  const [newUser, setNewUser] = useState(null)
  const { userHasAuthenticated } = useAppContext()

  const onSubmitSignup = async ({ email, password }) => {
    if (password.match('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')) {
      try {
        const newUser = await Auth.signUp({
          username: email,
          password: password
        })
        toast.success(<MsgSuccess />)
        setNewUser(newUser)
      } catch (err) {
        toast.error(<MsgError />)
      }
    } else {
      toast.error(<InvalidPass />)
    }
  }
  const onSubmitConfirmation = async ({ confirmationCode }) => {
    try {
      await Auth.confirmSignUp(newUser.username, confirmationCode)
      await Auth.signIn(newUser.username, newUser.password)
      userHasAuthenticated(true)
      history.push('/')
      toast.success(<MsgSuccessCode />)
    } catch (err) {
      toast.error(<MsgError />)
    }
  }

  const MsgSuccess = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>Código enviado para o email</span>
    </div>
  )

  const MsgSuccessCode = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faCheckCircle} />
      <span>Cadastro realizado com sucesso.</span>
    </div>
  )

  const MsgError = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <span>Falha no cadastro.</span>
    </div>
  )

  const InvalidPass = ({ closeToast }) => (
    <div className='toast'>
      <FontAwesomeIcon icon={faExclamationCircle} />
      <div className='invalid-pass'>
        <span>Sua senha deve conter:</span>
        <span>- uma letra maiúscula</span>
        <span>- uma caracter especial</span>
        <span>- mínimo de 8 caracters</span>
      </div>
    </div>
  )

  function renderForm () {
    return (
      <div className='login'>
        <ToastContainer />
        <div className='login-box'>
          <h1>Cadastro</h1>
          <form onSubmit={handleSubmit(onSubmitSignup)}>
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
            <input
              type='password'
              name='confirmPassword'
              placeholder='Digite sua senha'
              ref={register({ required: true })}
            />
            {errors.confirmPassword && <span><FontAwesomeIcon icon={faExclamationTriangle} />Digite novamente a senha </span>}
            <input type='submit' className='login-input-button' value='Login' />
          </form>
        </div>
      </div>
    )
  }

  function renderConfirmationForm () {
    return (
      <div className='login'>
        <ToastContainer />
        <div className='login-box'>
          <h1>Verifique seu email</h1>
          <form onSubmit={handleSubmit(onSubmitConfirmation)}>
            <input
              type='number'
              name='confirmationCode'
              placeholder='Digite o código'
              ref={register({ required: true })}
            />
            {errors.confirmationCode && <span><FontAwesomeIcon icon={faExclamationTriangle} />Digite o código enviado para seu email</span>}
            <input type='submit' className='login-input-button' value='Enviar' />
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className='Signup'>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  )
}

export default Signup
