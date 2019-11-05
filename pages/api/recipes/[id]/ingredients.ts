import Knex from 'knex'
import connection from '../../../../knexfile'
import { Model } from 'objection'
import { Recipe } from '../../../../backend/models/recipe.model'
import { createControllerFunction } from '../../../../backend/createControllerFunction'
import { Ingredient } from '../../../../backend/models/ingredient.model'

let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let ingredientsController = createControllerFunction(async (req, res) => {
  const { method } = req

  // TODO: is there a better way to do this? Perhaps embedded in the query? or by
  // going thru the "Recipe" model?
  // Validate that the user exists and throw an error if the user isn't found.
  await Recipe.query()
    .findById(req.query.id)
    .throwIfNotFound()

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

export default ingredientsController
