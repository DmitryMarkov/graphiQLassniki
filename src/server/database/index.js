import Sequelize from 'sequelize'
import configFile from '../config'
import models from '../models'

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]

const { database, username, password, ...options } = config

const sequelize = new Sequelize(database, username, password, options)

const db = {
  models: models(sequelize),
  sequelize,
}

export default db
