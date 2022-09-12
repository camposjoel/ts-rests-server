import { DataTypes } from 'sequelize'
import db from '../db/connection'

const User = db.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN
  }
})

export default User
