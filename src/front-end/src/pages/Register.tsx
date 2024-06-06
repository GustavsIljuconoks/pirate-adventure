import { Input } from '@components/input/Input'
import Layout from '@components/Layout/Layout'
import { Toast } from '@components/Toast'
import style from '@styles/auth/Login.module.css'
import axios from 'axios'
import { FormEvent, ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../constants'

interface stateProps {
  username: string
  email: string
  password: string
}

export default function Register(): ReactElement {
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [inputs, setInputs] = useState<stateProps>({
    username: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    axios
      .post(SERVER_URL + '/auth/register', inputs)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => {
        setErrorMessage(error.response.data)
        setShowError(true)

        const timer = setTimeout(() => {
          setShowError(false)
        }, 3000)

        return () => clearTimeout(timer)
      })
  }

  return (
    <Layout>
      <div className="my-auto mx-auto">
        <div className={style['form-wrapper']}>
          <div className={style['head-info']}>
            <h1>Register</h1>

            <p>Sign up and let's get started!</p>
          </div>

          <Toast show={showError} type="danger" message={errorMessage} />

          <form className={style['form-body']} onSubmit={handleSubmit}>
            <div className={style['input-container']}>
              <Input
                label="User name"
                name="username"
                value={inputs.username || ''}
                type="text"
                placeholder="player 1"
                onChange={handleChange}
              />

              <Input
                label="E-mail"
                name="email"
                value={inputs.email || ''}
                type="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
              />

              <Input
                label="Password"
                name="password"
                value={inputs.password || ''}
                type="password"
                placeholder="******"
                onChange={handleChange}
              />
            </div>

            <button className="button" type="submit">
              Register
            </button>
          </form>

          <div className={style['info-text']}>
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
