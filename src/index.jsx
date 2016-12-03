import path from 'path'
import _ from 'lodash'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Router } from 'express'
import layout from './client/views/layout.pug'
import App from './client/components/App'

const manifestFilename = path.resolve(__dirname, '..', 'build', 'dist', 'manifest.json')

function typeOf(files, extension) {
  return files
    .filter(filename => filename.endsWith(`.${extension}`))
    .map(filename => `/${filename}`)
}

function parseManifest(buffer) {
  const data = JSON.parse(buffer)
  const assets = _.values(data)

  return {
    js: typeOf(assets, 'js'),
    css: typeOf(assets, 'css'),
  }
}

function getAssets(devFilesystem) {
  return new Promise((resolve, reject) => {
    const filesystem = require('fs') // eslint-disable-line global-require
    const fs = devFilesystem || filesystem

    fs.readFile(manifestFilename, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(
        parseManifest(data)
      )
    })
  })
}

const router = Router()

export default devFilesystem => {
  const assets = getAssets(devFilesystem)

  router.use('/', (req, res) => {
    const component = ReactDOM.renderToString(<App />)

    assets.then(({ css, js }) => {
      res.send(
        layout({
          component,
          js,
          css,
        })
      )
    })
  })

  return router
}
