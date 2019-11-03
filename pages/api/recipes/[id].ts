import Knex from 'knex'
import connection from '../../../knexfile'
import { Recipe } from '../../../backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '../../../backend/createControllerFunction'

// TODO: generic fn for setting up these connections?
let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

// TODO: generic controller higher-order fn w/ error handling.
const recipeByIdController = createControllerFunction(async (req, res) => {
  const { method } = req

  switch (method) {
    case 'DELETE': {
      let { id } = req.query
      let deletedRecipe = await Recipe.query()
        .deleteById(id)
        .returning('*')

      // if no recipes were returned from the DELETE operation, throw a 404.
      if (deletedRecipe === undefined) {
        let error = new Error()

        // @ts-ignore
        error.statusCode = 404
        // @ts-ignore
        error.data = 'Recipe with the given id was not found'

        throw error
      }

      res.status(200).json({ data: deletedRecipe })
      break
    }
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default recipeByIdController
