/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import AdminDashboard from './AdminDashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import '../../src/index.css'; 

// Test the AdminDashboard component
describe('<AdminDashboard />', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/api/users', { fixture: 'users.json' });
    cy.intercept('GET', 'http://localhost:8080/api/posts', { fixture: 'posts.json' });
    cy.intercept('DELETE', 'http://localhost:8080/api/users/*', { statusCode: 200 });
    cy.intercept('DELETE', 'http://localhost:8080/api/posts/*', { statusCode: 200 });

    cy.document().then((doc) => {
      const root = doc.createElement('div');
      root.id = 'root';
      doc.body.appendChild(root);
    });


    mount(
      <Router>
        <AdminDashboard />
      </Router>
    );
  });

  it('renders', () => {
    cy.get('h1').contains('Admin Dashboard');
    cy.get('a').contains('Create Post');
  });

  it('renders users', () => {
    cy.fixture('users.json').then(users => {
      users.forEach(user => {
        cy.get('ul').contains(user.name);
        cy.get('ul').contains(user.email);
      });
    });
  });

  it('renders posts', () => {
    cy.fixture('posts.json').then(posts => {
      posts.forEach(post => {
        cy.get('ul').contains(post.title);
      });
    });
  });

  it('deletes a user', () => {
    cy.fixture('users.json').then(users => {
      const userToDelete = users[0];
      cy.get('ul').contains(userToDelete.name).parent().find('button').click();
      cy.get('button').contains('Yes, Delete').click();
      cy.get('ul').should('not.contain', userToDelete.name);
    });
  });

  it('deletes a post', () => {
    cy.fixture('posts.json').then(posts => {
      const postToDelete = posts[0];
      cy.get('ul').contains(postToDelete.title).parent().find('button').click();
      cy.get('button').contains('Yes, Delete').click();
      cy.get('ul').should('not.contain', postToDelete.title);
    });
  });

  it('should navigate to the edit page when the edit button is clicked', () => {
    
    cy.get('[data-cy=edit-post-2]').click(); 
    cy.url().should('include', '/edit-post');
  });

});