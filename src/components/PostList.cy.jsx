// Cypress test for the PostList component
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'cypress/react18';
import PostList from './PostList';
import NavBar from './NavBar';
import '../../src/index.css';

// Test the PostList component
describe('<PostList />', () => {
  it('renders the posts with formatted dates', () => {
    const mockPosts = [
      {
        id: 1,
        title: 'First Post',
        content: 'This is the first post content',
        created_at: '2020-01-01T12:00:00.000Z',
        commentCount: 2
      },
      {
        id: 2,
        title: 'Second Post',
        content: 'This is the second post content',
        created_at: '2020-01-02T12:00:00.000Z',
        commentCount: 3
      }
    ];

    // Mount the PostList component with mockPosts
    mount(
      <BrowserRouter>
        <NavBar />
        <PostList posts={mockPosts} loading={false} />
      </BrowserRouter>
    );

    // Assert that the posts are displayed
    mockPosts.forEach((post) => {
      cy.contains(post.title).should('be.visible');
      cy.contains(post.content).should('be.visible');
      cy.contains(`${post.commentCount} Comments`).should('be.visible');

      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      const formattedDate = new Date(post.created_at).toLocaleDateString(undefined, options);
      
      // Assert that the formatted date is displayed
      cy.get('.text-gray-500').contains(formattedDate).should('be.visible');
    });
  });

  it('shows loading state', () => {
    // Mount the PostList component with loading=true
    mount(
      <BrowserRouter>
        <NavBar />
        <PostList posts={[]} loading={true} />
      </BrowserRouter>
    );

    // Assert that the loading message is displayed
    cy.contains('Loading...').should('be.visible');
  });
});
