import Knex from 'knex'
import connection from '~/knexfile'
import { Recipe } from '~/backend/models/recipe.model'
import { Model } from 'objection'
import { createControllerFunction } from '~/backend/createControllerFunction'
import * as recipesService from '~/backend/services/recipe.service'

const knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

const recipesController = createControllerFunction(async (req, res) => {
  const { method } = req

  switch (method) {
    case 'GET': {
      const recipesList = await recipesService.getAllRecipes()

      res.status(200).json({ data: recipesList })
      break
    }
    case 'POST': {
      const newRecipe = await recipesService.createRecipe(req.body)
      res.status(201).json({ data: newRecipe })
      break
    }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default recipesController
