import { Model } from 'objection'

class Recipe extends Model {
  static get tableName() {
    return 'recipes'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        // Time in minutes to prep
        prepTime: { type: 'number' },
        // Time in minutes to cook
        cookTime: { type: 'number' },
      },
    }
  }
}

export default Recipe
