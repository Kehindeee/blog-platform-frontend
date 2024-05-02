// Cypress test for the CreatePost component

/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import CreatePost from './CreatePost';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import '../../src/index.css'; 

// Test the CreatePost component
describe('CreatePost', () => {
  beforeEach(() => {
    // Set up the intercepted API call
    cy.intercept('POST', '/api/posts', (req) => {
      expect(req.body).to.include.keys('title', 'content'); 
      req.reply({ statusCode: 201, body: { message: 'Post created successfully!' } });
    }).as('createPost');
    
    // Mount the CreatePost component
    mount(
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <CreatePost />
      </BrowserRouter>
    );
  });

  it('successfully creates a post', () => {
    // Fill out the form
    cy.get('input#title').type('New Cypress Post');
    cy.get('textarea#content').type('This is content for a new post created by a Cypress test.');

    // Submit the form
    cy.get('form').submit();

    // Check for the success toast message
    cy.contains('Post created successfully!').should('be.visible');
    
    // Confirm the API was called
    cy.wait(5000)
    cy.wait('@createPost');

    // Optionally, check if the form was cleared
    cy.get('input#title').should('have.value', '');
    cy.get('textarea#content').should('have.value', '');
  });

  it('shows an error toast when title or content is missing', () => {
    // Submit the form without filling it out
    cy.get('form').submit();

    // Check for the error toast message
    cy.contains('Title and content are required').should('be.visible');
  });
});
