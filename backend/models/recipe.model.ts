import { Model } from 'objection'
import { Ingredient } from './ingredient.model'

export class Recipe extends Model {
  static tableName = 'recipes'

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        // Time in minutes to prep
        prepTime: { type: ['number', 'null'] },
        // Time in minutes to cook
        cookTime: { type: ['number', 'null'] },
      },
    }
  }

  static relationMappings = {
    directions: {
      relation: Model.HasManyRelation,
      modelClass: Ingredient,
      join: {
        from: 'recipes.id',
        to: 'ingredients.ownerId',
      },
    },
  }
}
