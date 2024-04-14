import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import { mount } from 'cypress/react18';
import '../../src/index.css';

describe('<Home />', () => {
  const checkPostsVisibility = (posts) => {
    posts.forEach((post) => {
      cy.contains(post.title).should('be.visible');
      cy.contains(post.content).should('be.visible');
    });
  };

  beforeEach(() => {
    // Intercept requests for both recent and all posts before each test
    cy.intercept('GET', '/api/posts/recent', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Recent Post 1', content: 'Content for recent post 1' },
        { id: 2, title: 'Recent Post 2', content: 'Content for recent post 2' },
      ],
    }).as('getRecentPosts');

    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [
        { id: 1, title: 'All Post 1', content: 'Content for all post 1' },
        { id: 2, title: 'All Post 2', content: 'Content for all post 2' },
      ],
    }).as('getAllPosts');

    mount(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it('successfully loads', () => {
    cy.contains('Recent Posts').should('exist');
    cy.contains('All Posts').should('exist');
  });

  it('displays recent posts when "Recent Posts" is clicked', () => {
    cy.contains('Recent Posts').click();
    cy.wait('@getRecentPosts').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      checkPostsVisibility(interception.response.body);
    });
  });

  it('displays all posts when "All Posts" is clicked', () => {
    cy.contains('All Posts').click();
    // Removed the explicit wait time here, it's better to wait for the alias directly
    cy.wait('@getAllPosts').then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
      checkPostsVisibility(interception.response.body);
    });
  });
});
