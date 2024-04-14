/* eslint-disable no-undef */
// Home.cy.js
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('displays recent posts when "Recent Posts" is clicked', () => {
    const recentPosts = [
      { id: 1, title: 'Recent Post 1', content: 'Content for recent post 1' },
      { id: 2, title: 'Recent Post 2', content: 'Content for recent post 2' },
    ];

    cy.intercept('GET', 'http://localhost:8080/api/posts/recent', {
      statusCode: 200,
      body: recentPosts,
    }).as('getRecentPosts');

    cy.contains('Recent Posts').click();
    cy.wait('@getRecentPosts');
    recentPosts.forEach((post) => {
      cy.contains(post.title).should('be.visible');
      cy.contains(post.content).should('be.visible');
    });
  });

  it('displays all posts when "All Posts" is clicked', () => {
    const allPosts = [
      { id: 1, title: 'Post 1', content: 'Content of post 1.' },
      { id: 2, title: 'Post 2', content: 'Content of post 2.' },
      // Add more posts here
    ];

    cy.intercept('GET', 'http://localhost:8080/api/posts', {
      statusCode: 200,
      body: allPosts,
    }).as('getAllPosts');

    cy.contains('All Posts').click();
    cy.wait('@getAllPosts');
    allPosts.forEach((post) => {
      cy.contains(post.title).should('be.visible');
      cy.contains(post.content).should('be.visible');
    });
  });

  it('displays search results when a search is performed', () => {
    const searchTerm = 'test';
    const searchResults = [
      { id: 3, title: 'Search Result 1', content: 'Content for search result 1' },
      // Add more search results here
    ];

    cy.intercept('GET', `http://localhost:8080/api/posts?query=${searchTerm}`, {
      statusCode: 200,
      body: searchResults,
    }).as('searchPosts');

    cy.get('input[placeholder="Search posts..."]').type(`${searchTerm}{enter}`);
    cy.wait('@searchPosts');
    searchResults.forEach((post) => {
      cy.contains(post.title).should('be.visible');
      cy.contains(post.content).should('be.visible');
    });
  });

 
});
