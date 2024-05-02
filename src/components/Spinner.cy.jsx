// Cypress test file for the Spinner component
import React from 'react'
import Spinner from './Spinner'

// Test the Spinner component
describe('<Spinner />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // eslint-disable-next-line no-undef
    cy.mount(<Spinner />)
  })
})