import Knex from 'knex'
import connection from '../../knexfile'

let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })

let recipesController = async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      let recipes = await knex.select().table('recipes')
      res.status(200).json(recipes)
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default recipesController
