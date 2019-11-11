/// <reference types="cypress" />

context('API', () => {
  beforeEach(() => {
    cy.visit('/')

    // Note: would be better if we set this up to use an endpoint
    // that seeds all of the data / cleans the test DB rather than
    // an API request and a loop.
    cy.request('/api/recipes').then(response => {
      let recipes = response.body.data

      for (let recipe of recipes) {
        cy.request('DELETE', `/api/recipes/${recipe.id}`)
      }
    })
  })

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
    })

    // GET all recipes again, make sure that the new recipe is there.
    cy.request('/api/recipes').then(response => {
      expect(response.status).equals(200)
      expect(response.body.data).lengthOf(1)

      let items = response.body.data
      let [addedItem] = items
      expect(addedItem.name).equals('chicken soup')

      // Delete all items in the list
      cy.wrap(items).each(item => {
        cy.request('DELETE', `/api/recipes/${item.id}`).then(deleteResponse => {
          expect(deleteResponse.status).equals(200)

          let deletedItem = deleteResponse.body.data
          expect(deletedItem.name).equals('chicken soup')
        })
      })
    })
  })

  it('recipe ingredients CRUD endpoints', () => {
    cy.request('POST', '/api/recipes', { name: 'BLT' }).then(response => {
      console.log(response)
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
          expect(response.body.data.name).equals(ingredient.name)
        })
      })

      // Fetch ingredients again, should be populated
      cy.request(url).then(response => {
        expect(response.status).equals(200)
        expect(response.body.data).to.have.length(4)
        cy.wrap(response.body.data).as('addedIngredients')
      })

      cy.get('@addedIngredients').each(ingredient => {
        let ingredientUrl = [url, ingredient.id].join('/')
        cy.request('DELETE', ingredientUrl).then(response => {
          expect(response.status).equals(200)
          expect(response.body.data.name).equals(ingredient.name)
        })
      })
    })
  })

  it.skip('recipe directions CRUD endpoints', () => {
    cy.log('TODO:')
  })
})
