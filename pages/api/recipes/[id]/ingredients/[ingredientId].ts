import Knex from 'knex'
import connection from '~/knexfile'
import { Model } from 'objection'
import { createControllerFunction } from '~/backend/createControllerFunction'
import * as recipesService from '~/backend/services/recipe.service'
import * as ingredientsService from '~/backend/services/ingredient.service'

let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let ingredientByIdController = createControllerFunction(async (req, res) => {
  let { method } = req

  // Throw an error if the related recipe doesn't exist
  await recipesService.getOneRecipe(req.query.id)

  let { ingredientId } = req.query

  switch (method) {
    case 'GET': {
      let ingredient = await ingredientsService.getOneIngredient(ingredientId)
      res.status(200).json({ data: ingredient })
      break
    }
    case 'PATCH': {
      let updatedIngredient = await ingredientsService.updateIngredient(
        ingredientId,
        req.body
      )

      res.status(200).json({ data: updatedIngredient })
      break
    }
    case 'DELETE': {
      let deletedIngredient = await ingredientsService.deleteIngredient(
        ingredientId
      )

      res.status(200).json({ data: deletedIngredient })
      break
    }
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default ingredientByIdController
