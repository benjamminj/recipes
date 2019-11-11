import Knex from 'knex'
import connection from '../../../../../knexfile'
import { Model } from 'objection'
import { createControllerFunction } from '../../../../../backend/createControllerFunction'
import { recipesService } from '../../../../../backend/services/recipe.service'
import { ingredientsService } from '../../../../../backend/services/ingredient.service'

// TODO: generic fn for setting up these connections?
let knex = Knex({ ...connection, pool: { min: 1, max: 1 } })
Model.knex(knex)

let ingredientByIdController = createControllerFunction(async (req, res) => {
  let { method } = req

  // Throw an error if the related recipe doesn't exist
  await recipesService.getOneRecipe(req.query.id)

  switch (method) {
    case 'DELETE': {
      let deletedIngredient = await ingredientsService.deleteIngredient(
        req.query.ingredientId
      )

      res.status(200).json({ data: deletedIngredient })
      break
    }
    // TODO: PATCH
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
})

export default ingredientByIdController
