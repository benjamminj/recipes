import { Recipe } from '../models/recipe.model'
import { QueryBuilderYieldingOne, QueryBuilder } from 'objection'

/**
 * Retrieves all recipes
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  let result = await Recipe.query()
  return result
}

/**
 * Retrieve an individual recipe by the recipe id
 */
export async function getOneRecipe(id: string): Promise<Recipe> {
  let result = await Recipe.query()
    .findById(id)
    .throwIfNotFound()

  return result
}

/**
 * Creates a new recipe record
 */
export async function createRecipe(recipe): Promise<Recipe> {
  let result = await Recipe.query().insertAndFetch(recipe)
  return result
}

/**
 * Deletes the recipe with the given id
 */
export async function deleteRecipe(recipeId): Promise<Recipe> {
  let result = await Recipe.query()
    .deleteById(recipeId)
    .throwIfNotFound()
    .returning('*')

  // @ts-ignore
  return result as Recipe
}

export let recipesService = {
  getAllRecipes,
  getOneRecipe,
  createRecipe,
  deleteRecipe,
}
