let uuid = require('uuid/v4')

let recipes = [
  {
    name: 'BLT',
    prepTime: 5,
    cookTime: 10,
    directions: JSON.stringify([
      'Put mustard on one slice of bread. Put mayo on the other slice of bread',
      'Cut the tomato into slices',
      'Cook bacon in a frying pan',
      'Put tomato, lettuce, and bacon on the bread.',
      'Enjoy',
    ]),
    ingredients: [
      { name: 'bacon', quantity: 2, unit: 'slices' },
      { name: 'sourdough bread', quantity: 2, unit: 'slices' },
      { name: 'mustard' },
      { name: 'mayo' },
      { name: 'lettuce', unit: 'leaf', quantity: 1 },
      { name: 'tomato', quantity: 1 },
    ],
  },
  {
    name: 'Roasted Beet Salad',
    prepTime: 20,
    cookTime: 120,
    directions: JSON.stringify([
      'Preheat the oven to 375°F',
      'Wash the beets thouroughly and cut off their stems, leaving roughly 1/4 inch',
      'Line an aluminum baking pan with tinfoil. Place the beets in the pan and toss them with 2 tbsp. oil and 2 tbsp. water. Add light salt and pepper.',
      'Fold up the tinfoil to cover the beets in a "pouch". (If your tinfoil doesn\'t entirely cover the beets, feel free to use another piece.)',
      'Place the beets in the oven and cook for 1 1/2 hours, or until done. (To test whether the beets are done, take a butter knife and insert it into the beet. If it can be inserted without resistance the beets are cooked fully). Place the beets on a rack to cool',
      'To remove the skin from the beets, take 2 paper towels (one for each hand). Rub the beet with the paper towel to remove the skin. Do this for all of the beets',
      'Cut the beets into quarters, then cut those quarters into slices.',
      'Toss the beets in a mixing bowl with the red wine vinegar, remaining olive oil, and orange juice. Add salt and pepper to taste. Put the beets in the fridge to marinate',
      '30 minutes before serving, cut up the red onion (slices), chives, and tarragon. Toss them with the beets and put back in the fridge.',
      "If you don't like the red onion in the salad, remove prior to serving.",
    ]),
    ingredients: [
      { name: 'large beets', quantity: 4 },
      { name: 'olive oil', quantity: 3, unit: 'tbsp.' },
      {
        name: 'freshly squeezed orange juice',
        quantity: 2,
        unit: 'tbsp.',
      },
      { name: 'fresh tarragon' },
      { name: 'fresh chives' },
      { name: 'red wine vinegar', unit: 'tbsp', quantity: 3 },
      { name: 'water', unit: 'tbsp', quantity: 1 },
      { name: 'salt' },
      { name: 'pepper' },
    ],
  },
  {
    name: 'Old Fashioned',
    prepTime: 10,
    cookTime: 0,
    directions: JSON.stringify([
      'Combine the whiskey and simple syrup in a glass. (To make the simple syrup, heat equal parts sugar and water in a frying pan until the sugar is no longer visible.)',
      'Add 3 dashes bitters.',
      'Stir lightly.',
      'Add ice cube. To keep the ice from splashing, use a bar spoon to gently lower the ice into the glass.',
      'Garnish with an orange peel.',
    ]),
    ingredients: [
      { name: 'bourbon whiskey', quantity: 2, unit: 'oz' },
      { name: 'simple syrup', quantity: 1, unit: 'oz' },
      { name: 'angostura bitters', quantity: 3, unit: 'dashes' },
      { name: 'large ice cube', quantity: 1 },
      { name: 'orange peel', quantity: 1 },
    ],
  },
  {
    name: 'Pineapple Sorbet',
    prepTime: 10,
    cookTime: 0,
    directions: JSON.stringify([
      'Freeze the pineapple chunks. (If you need to save time you can buy already frozen pineapple chunks, but freezing fresh ones tastes better)',
      'Insert pineapple chunks, sugar, and pineapple juice into a blender. Blend until smooth',
    ]),
    ingredients: [
      { name: 'chunks pineapple, fresh', quantity: 2, unit: 'cups' },
      { name: 'sugar', quantity: 2, unit: 'tbsp' },
      { name: 'pineapple juice', quantity: 0.5, unit: 'cup' },
    ],
  },
  {
    name: 'Chicken Tacos',
    prepTime: 10,
    cookTime: 60 * 6,
    directions: JSON.stringify([
      'Trim the chicken breast.',
      'Put chicken & taco seasoning in crockpot. Pour the salsa on top',
      'Cook on low for 8-10 hours or high for 4-6 hours',
    ]),
    ingredients: [
      { name: 'taco seasoning', quantity: 1, unit: 'packet' },
      { name: 'chicken breast', quantity: 1 },
      { name: 'salsa', quantity: 0.5, unit: 'jar' },
    ],
  },
]

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()

  for (recipe of recipes) {
    let recipeId = uuid()
    let { ingredients, ...rest } = recipe

    await knex('recipes').insert({ ...rest, id: recipeId })
    await knex('ingredients').insert(
      ingredients.map(ingredient => ({ id: uuid(), ...ingredient, recipeId }))
    )
  }

  return knex
}
