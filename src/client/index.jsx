import React from 'react'
import { render } from 'react-dom'
import App from './components/App'
import RedBox from 'redbox-react'
import './style.css'

const rootElement = document.getElementById('app')

function renderApp() {
  try {
    render(
      <App />,
      rootElement
    )
  } catch (error) {
    render(<RedBox error={error} />, rootElement)
  }
}

renderApp()

if (module.hot) {
  module.hot.accept('./components/App', () => {
    renderApp()
  })
}
