import path from 'path'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import db from './database'
import services from './services'

const root = path.join(__dirname, '../../')

const app = express()

console.log('NODE_ENV:', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
      },
    })
  )

  app.use(compression())
  app.use(cors())
}
app.use(
  helmet.referrerPolicy({
    policy: 'same-origin',
  })
)

app.use('/', express.static(path.join(root, 'dist/client')))
app.use('/uploads', express.static(path.join(root, 'uploads')))

const serviceNames = Object.keys(services)

serviceNames.forEach(name => {
  if (name === 'graphql') {
    services[name].applyMiddleware({ app })
  } else {
    app.use(`/${name}`, services[name])
  }
})

app.get('/', (req, res) => res.sendFile(path.join(root, '/dist/client/index.html')))
app.listen(8000, () => console.log('Listening on port 8000'))
