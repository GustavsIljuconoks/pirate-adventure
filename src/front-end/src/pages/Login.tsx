import { Input } from '@components/input/Input'
import Layout from '@components/Layout/Layout'
import { Toast } from '@components/Toast'
import style from '@styles/auth/Login.module.css'
import axios from 'axios'
import { FormEvent, ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setAuth } from 'reducers/userSlice'
import { SERVER_URL } from '../constants'

export default function Login(): ReactElement {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState<{
    username?: string
    password?: string
  }>({})

  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name
    const value = event.target.value
    setInputs((values) => ({ ...values, [name]: value }))

    const newInputs = { ...inputs, [name]: value }
    setButtonDisabled(!(newInputs.username && newInputs.password))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    axios
      .post(SERVER_URL + '/auth/login', inputs)
      .then(() => {
        dispatch(setAuth({ name: inputs.username, isAuthenticated: true }))
        navigate('/')
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
          <Toast show={showError} type="danger" message={errorMessage} />

          <div className={style['head-info']}>
            <h1>Login</h1>

            <p>Let's get ready to rumble!</p>
          </div>

          <form className={style['form-body']} onSubmit={handleSubmit}>
            <div className={style['input-container']}>
              <Input
                label="User id"
                name="username"
                value={inputs.username || ''}
                type="text"
                placeholder="player 1"
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

            <button className="button" type="submit" disabled={buttonDisabled}>
              Login
            </button>
          </form>

          <div className={style['info-text']}>
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
