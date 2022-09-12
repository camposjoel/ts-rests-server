import express from 'express'
import cors from 'cors'
import userRouter from '../routes/users.route'
import db from '../db/connection'

class Server {

  private app
  private port
  private apiPaths = {
    users: '/api/users'
  }

  constructor() {
    this.app = express()
    this.port = process.env.PORT || '5000'
    
    this.dbConnection()
    this.middlewares()
    this.configRoutes()
  }

  async dbConnection() {
    try {
      await db.authenticate()
      console.log('Database online')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  middlewares() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('src/public'))
  }

  configRoutes() {
    this.app.use(this.apiPaths.users, userRouter)
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }

}

export default Server
