import Knex from 'knex'
import connection from '../../../../knexfile'
import { Model } from 'objection'
import { Recipe } from '../../../../backend/models/recipe.model'
import { createControllerFunction } from '../../../../backend/createControllerFunction'
import { Ingredient } from '../../../../backend/models/ingredient.model'
import * as recipesService from '../../../../backend/services/recipe.service'

let ingredientByIdController = createControllerFunction(async (req, res) => {
  let { method } = req

  // Throw an error if the related recipe doesn't exist
  await recipesService.getOneRecipeById(req.query.id)

  switch (method) {
    case 'GET': {
      let query = Ingredient.query().where('recipeId', req.query.id)

      let ingredientsList = await query

      res.status(200).json({ data: ingredientsList })
      break
    }
    case 'POST': {
      let newIngredient = await Ingredient.query()
        .insert({ ...req.body, recipeId: req.query.id })
        .returning('*')
      res.status(201).json({ data: newIngredient })
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})
