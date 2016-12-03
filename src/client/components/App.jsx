import React from 'react'
import style from './app.css'
import logo from './strv-logo.svg'

export default () =>
  <div>
    <h2 className={style.helloWorld}>Hello world</h2>
    <img src={logo}/>
  </div>
