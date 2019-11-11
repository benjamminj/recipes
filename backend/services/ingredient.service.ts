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
 * Get an individual ingredient by id
 */
export async function getOneIngredient(id: string): Promise<Ingredient> {
  let result = await Ingredient.query()
    .findById(id)
    .throwIfNotFound()

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

/**
 * Deletes an ingredient with the given id.
 */
export async function deleteIngredient(
  ingredientId: string
): Promise<Ingredient> {
  let result = await Ingredient.query()
    .deleteById(ingredientId)
    .throwIfNotFound()
    .returning('*')

  // @ts-ignore
  return result
}

export let ingredientsService = {
  getAllIngredients,
  getOneIngredient,
  createIngredient,
  deleteIngredient,
}
