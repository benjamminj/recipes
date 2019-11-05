import { Model } from 'objection'
// import { Recipe } from './recipe.model'

export class Ingredient extends Model {
  static tableName = 'ingredients'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        // TODO: utilities for base entity keys?
        id: { type: 'string' },
        recipeId: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        name: { type: 'string' },
        quantity: { type: 'number', default: 1 },
        unit: { type: 'string' },
        notes: { type: 'string' },
      },
    }
  }

  static relationMappings = {
    owner: {
      relation: Model.BelongsToOneRelation,
      modelClass: require('./recipe.model').Model,
      join: {
        from: 'ingredients.recipeId',
        to: 'recipes.id',
      },
    },
  }
}
