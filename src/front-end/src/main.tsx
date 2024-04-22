import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { store } from './store'

const container = document.querySelector('#root')
if (container) {
  const root = createRoot(container)
  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}
