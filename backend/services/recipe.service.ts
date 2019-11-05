import { Recipe } from '../models/recipe.model'
import { QueryBuilderYieldingOne, QueryBuilder } from 'objection'

export function createRecipesService() {
  /**
   * Retrieves all recipes in the DB.
   */
  function getAllRecipes() {
    return Recipe.query()
  }

  function createRecipe(recipe) {
    return Recipe.query().insertAndFetch(recipe)
  }

  function deleteRecipe(recipeId) {
    return Recipe.query()
      .deleteById(recipeId)
      .throwIfNotFound()
      .returning('*')
  }

  // TODO: update recipe by id.

  return {
    getAllRecipes,
    createRecipe,
    deleteRecipe,
  }
}
