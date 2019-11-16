/// <reference types="cypress" />

let cleanup = () => {
  cy.visit('/')

  cy.request('/api/recipes').then(response => {
    let recipes = response.body.data

    cy.wrap(recipes).each(recipe => {
      cy.request('DELETE', `/api/recipes/${recipe.id}`)
    })
  })
}

context('API', () => {
  beforeEach(cleanup)
  after(cleanup)

  it('recipes CRUD endpoints', () => {
    cy.visit('/')

    // Check the GET /api/recipes first to see an empty list
    cy.request('/api/recipes').then(response => {
      expect(response.status).equals(200)
      expect(response.body.data).lengthOf(0)
    })

    // Add a recipe
    cy.request('POST', '/api/recipes', {
      name: 'chicken soup',
    }).then(response => {
      expect(response.status).equals(201)

      let addedRecipeId = response.body.data.id
      cy.wrap(addedRecipeId).as('addedRecipeId')
    })

    // Get the newly added recipe
    cy.get('@addedRecipeId').then(id => {
      cy.request(`/api/recipes/${id}`).then(response => {
        expect(response.status).equals(200)
        expect(response.body.data).to.haveOwnProperty('name', 'chicken soup')
      })
    })

    // GET all recipes again, make sure that the new recipe is there.
    cy.request('/api/recipes').then(response => {
      expect(response.status).equals(200)
      expect(response.body.data).lengthOf(1)

      cy.wrap(response.body.data).as('recipes')
    })

    cy.get('@recipes').then(recipes => {
      let [addedItem] = recipes

      expect(addedItem.name).equals('chicken soup')
    })

    cy.get('@recipes').then(recipes => {
      let [addedItem] = recipes
      let update = {
        name: 'TEST',
      }

      cy.request('PATCH', `/api/recipes/${addedItem.id}`, update).then(
        response => {
          expect(response.status).equals(200)
          expect(response.body.data.name).equals('TEST')
        }
      )
    })

    cy.get('@recipes').then(recipes => {
      // Delete all items in the list
      cy.wrap(recipes).each(item => {
        cy.request('DELETE', `/api/recipes/${item.id}`).then(deleteResponse => {
          expect(deleteResponse.status).equals(200)

          let deletedItem = deleteResponse.body.data
          expect(deletedItem.name).equals('TEST')
        })
      })
    })
  })

  it('recipe ingredients CRUD endpoints', () => {
    cy.request('POST', '/api/recipes', { name: 'BLT' }).then(response => {
      cy.wrap(response.body.data.id).as('addedRecipeId')
    })

    // Fetch ingredients, should always be empty to start
    cy.get('@addedRecipeId').then(id => {
      let url = `/api/recipes/${id}/ingredients`

      cy.request(url).then(response => {
        expect(response.status).equals(200)
        expect(response.body.data).to.have.length(0)
      })

      let ingredients = [
        { name: 'Bacon' },
        { name: 'Lettuce' },
        { name: 'Tomato' },
        { name: 'Bread' },
      ]

      // Add ingredients
      cy.wrap(ingredients).each(ingredient => {
        cy.request('POST', url, ingredient).then(response => {
          expect(response.status).equals(201)

          let addedIngredient = response.body.data
          expect(addedIngredient.name).equals(ingredient.name)

          // Check the GET ONE endpoint for the newly added ingredient
          cy.request(`${url}/${addedIngredient.id}`).then(response => {
            expect(response.status).equals(200)
            expect(response.body.data.name).equals(addedIngredient.name)
          })
        })
      })

      // Fetch ingredients again, should be populated
      cy.request(url).then(response => {
        expect(response.status).equals(200)
        expect(response.body.data).to.have.length(4)
        cy.wrap(response.body.data).as('addedIngredients')
      })

      cy.get('@addedIngredients').then(ingredientsList => {
        let [first] = ingredientsList
        let ingredientUrl = `${url}/${first.id}`
        let update = { name: 'Baconz' }

        // PATCH the ingredient name.
        cy.request('PATCH', ingredientUrl, update).then(response => {
          expect(response.status).equals(200)
          expect(response.body.data.name).equals('Baconz')
        })

        // Perform a second PATCH to make sure we have clean data before performing
        // other assertions.
        cy.request('PATCH', ingredientUrl, { name: first.name }).then(
          response => {
            expect(response.status).equals(200)
            expect(response.body.data.name).equals(first.name)
          }
        )
      })

      cy.get('@addedIngredients').each(ingredient => {
        let ingredientUrl = [url, ingredient.id].join('/')

        // For each added ingredient, delete it.
        cy.request('DELETE', ingredientUrl).then(response => {
          expect(response.status).equals(200)
          expect(response.body.data.name).equals(ingredient.name)
        })
      })
    })
  })
})
