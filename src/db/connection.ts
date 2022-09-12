import { Sequelize } from 'sequelize'

const db = new Sequelize('testnode', 'root', 'example', {
  host: 'localhost',
  dialect: 'mysql'
})

export default db
