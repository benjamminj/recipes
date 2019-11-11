import Knex from 'knex'
import connection from '~/knexfile'
import { Recipe } from '~/backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '~/backend/createControllerFunction'
import * as recipesService from '~/backend/services/recipe.service'

let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let recipeByIdController = createControllerFunction(async (req, res) => {
  let { method } = req

  switch (method) {
    case 'DELETE': {
      let { id } = req.query
      let deletedRecipe = await recipesService.deleteRecipe(id)

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
    // TODO: PATCH recipe
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default recipeByIdController
