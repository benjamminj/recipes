import Knex from 'knex'
import connection from '../../../knexfile'
import { Recipe } from '../../../backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '../../../backend/createControllerFunction'
import { createRecipesService } from '../../../backend/services/recipe.service'

// TODO: generic fn for setting up these connections?
let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let recipesService = createRecipesService()

const recipesController = createControllerFunction(async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      let recipesList = await recipesService.getAllRecipes()

      res.status(200).json({ data: recipesList })
      break
    }
    case 'POST': {
      let newRecipe = await recipesService.createRecipe(req.body)
      res.status(201).json({ data: newRecipe })
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default recipesController
