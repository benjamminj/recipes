import Knex from 'knex'
import connection from '~/knexfile'
import { Model } from 'objection'
import { createControllerFunction } from '~/backend/createControllerFunction'
import * as recipesService from '~/backend/services/recipe.service'
import * as ingredientsService from '~/backend/services/ingredient.service'

const knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

const ingredientsController = createControllerFunction(async (req, res) => {
  const { method } = req

  // Validate that the recipe exists before moving on to the rest of the controller.
  await recipesService.getOneRecipe(req.query.id)

  switch (method) {
    case 'GET': {
      const ingredientsList = await ingredientsService.getAllIngredients(
        req.query.id
      )

      res.status(200).json({ data: ingredientsList })
      break
    }
    case 'POST': {
      const newIngredient = await ingredientsService.createIngredient({
        ...req.body,
        recipeId: req.query.id,
      })
      res.status(201).json({ data: newIngredient })
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default ingredientsController
