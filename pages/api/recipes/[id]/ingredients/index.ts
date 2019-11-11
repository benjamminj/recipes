import Knex from 'knex'
import connection from '../../../../../knexfile'
import { Model } from 'objection'
import { Recipe } from '../../../../../backend/models/recipe.model'
import { createControllerFunction } from '../../../../../backend/createControllerFunction'
import { Ingredient } from '../../../../../backend/models/ingredient.model'
import * as recipesService from '../../../../../backend/services/recipe.service'
import * as ingredientsService from '../../../../../backend/services/ingredient.service'

let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let ingredientsController = createControllerFunction(async (req, res) => {
  const { method } = req

  // TODO: is there a better way to do this? Perhaps embedded in the query? or by
  // going thru the "Recipe" model?
  // Validate that the user exists before moving on to the rest of the controller.
  await recipesService.getOneRecipe(req.query.id)

  switch (method) {
    case 'GET': {
      let ingredientsList = await ingredientsService.getAllIngredients(
        req.query.id
      )

      res.status(200).json({ data: ingredientsList })
      break
    }
    case 'POST': {
      let newIngredient = await ingredientsService.createIngredient({
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
