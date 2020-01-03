import Knex from 'knex'
import connection from '~/knexfile'
import { Recipe } from '~/backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '~/backend/createControllerFunction'
import * as recipesService from '~/backend/services/recipe.service'

const knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

const recipeByIdController = createControllerFunction(async (req, res) => {
  const { method } = req
  const { id } = req.query

  switch (method) {
    case 'GET': {
      const recipe = await recipesService.getOneRecipe(id)

      res.status(200).json({ data: recipe })
      break
    }
    case 'PATCH': {
      const update = req.body
      const updatedRecipe = await recipesService.updateRecipe(id, update)
      res.status(200).json({ data: updatedRecipe })
      break
    }
    case 'DELETE': {
      let deletedRecipe = await recipesService.deleteRecipe(id)

      // if no recipes were returned from the DELETE operation, throw a 404.
      if (deletedRecipe === undefined) {
        const error = new Error()

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
