import Knex from 'knex'
import connection from '../../../knexfile'
import Recipe from '../../../backend/recipes/recipe.model'
import { Model } from 'objection'

// TODO: generic fn for setting up these connections?
let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

// TODO: generic controller higher-order fn w/ error handling.
let recipesController = async (req, res) => {
  const { method } = req

  try {
    switch (method) {
      case 'GET': {
        let recipesList = await Recipe.query()
        res.status(200).json({ data: recipesList })
        break
      }
      case 'POST': {
        let newRecipe = await Recipe.query().insert(req.body)
        res.status(201).json({ data: newRecipe })
        break
      }
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  } catch (error) {
    // If there was a validation error from the model, return the validation error.
    if (error.statusCode) {
      res.status(error.statusCode).json({ error: error.data })
    } else {
      // Otherwise internal server error
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}

export default recipesController
