import { Request, Response } from "express"
import User from "../models/user"

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll({
    where: {
      state: true
    }
  })

  res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await User.findByPk(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({
      msg: `User with id ${id} not exists`
    })
  }
}

export const addUser = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const userExists = await User.findOne({
      where: {
        email: body.email
      }
    })

    if (userExists) {
      return res.status(400).json({
        msg: 'A user is already registered with that email'
      })
    }

    const user = await User.create(body)

    return res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Contact to Administrator'
    })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        msg: `User with id ${id} not exists`
      })
    }

    await user.update(body)

    return res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Contact to Administrator'
    })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        msg: `User with id ${id} not exists`
      })
    }

    await user.update({ state: false })

    return res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Contact to Administrator'
    })
  }
}
