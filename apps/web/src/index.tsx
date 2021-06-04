import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals';

import { init as initDB } from './db'
import { init as initTest } from './features/test'

async function main() {
  ReactDOM.render(
    <React.StrictMode>
      <h1>loading...</h1>
    </React.StrictMode>,
    document.getElementById('root')
  )

  await [initDB, initTest].reduce((prev, curr) => prev.then(curr), Promise.resolve())

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  )
}

main()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
