import Knex from 'knex'
import connection from '../../../../../knexfile'
import { Model } from 'objection'
import { Recipe } from '../../../../../backend/models/recipe.model'
import { createControllerFunction } from '../../../../../backend/createControllerFunction'
import { Ingredient } from '../../../../../backend/models/ingredient.model'
import { recipesService } from '../../../../../backend/services/recipe.service'
import { ingredientsService } from '../../../../../backend/services/ingredient.service'

let ingredientByIdController = createControllerFunction(async (req, res) => {
  let { method } = req

  // Throw an error if the related recipe doesn't exist
  await recipesService.getOneRecipeById(req.query.id)

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
