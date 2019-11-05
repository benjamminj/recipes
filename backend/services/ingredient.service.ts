import { Ingredient } from '../models/ingredient.model'

/**
 * Fetches a list of all ingredients for a given recipe id.
 */
export async function getAllIngredients(
  recipeId: string
): Promise<Ingredient[]> {
  let result = await Ingredient.query().where('recipeId', recipeId)
  return result
}

/**
 * Creates a new ingredient.
 */
export async function createIngredient(ingredient): Promise<Ingredient> {
  let result = await await Ingredient.query()
    .insert(ingredient)
    .returning('*')

  // @ts-ignore
  return result as Ingredient
}

export let ingredientsService = {
  getAllIngredients,
  createIngredient,
}
