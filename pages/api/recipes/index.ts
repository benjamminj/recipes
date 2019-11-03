import Knex from 'knex'
import connection from '../../../knexfile'
import { Recipe } from '../../../backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '../../../backend/createControllerFunction'

// TODO: generic fn for setting up these connections?
let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

const recipesController = createControllerFunction(async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      let recipesList = await Recipe.query()
      res.status(200).json({ data: recipesList })
      break
    }
    case 'POST': {
      let newRecipe = await Recipe.query()
        .insert(req.body)
        .returning('*')
      res.status(201).json({ data: newRecipe })
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default recipesController
