/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import PostDetail from './PostDetail';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import '../../src/index.css';

describe('PostDetail', () => {
  const mockPostId = '1';
  const mockPost = {
    id: mockPostId,
    title: 'Test Post Title',
    content: 'Test post content here...',
    comments: [
      { id: 1, comment: 'Test comment 1', user_name: 'User 1', user_id: 'user1' },
      { id: 2, comment: 'Test comment 2', user_name: 'User 2', user_id: 'user2' },
    ],
  };

  beforeEach(() => {
    cy.intercept('GET', `/api/posts/${mockPostId}`, { body: mockPost }).as('fetchPostById');
    cy.intercept('GET', `/api/posts/${mockPostId}/comments`, { body: mockPost.comments }).as('fetchCommentsForPost');
  });

  it('successfully fetches and displays post details with comments', () => {
    mount(
      <MemoryRouter initialEntries={[`/posts/${mockPostId}`]}>
        <Routes>
          <Route path="/posts/:postId" element={<PostDetail />} />
        </Routes>
      </MemoryRouter>
    );

    cy.wait('@fetchPostById');
    cy.wait('@fetchCommentsForPost');

    cy.contains(mockPost.title).should('be.visible');
    cy.contains(mockPost.content).should('be.visible');
    
    mockPost.comments.forEach((comment) => {
      // Use the actual selectors to find the comment's text
      cy.get('li.p-4.bg-white.rounded.shadow').contains(comment.comment).should('be.visible');
      
      cy.get('li.p-4.bg-white.rounded.shadow').contains(`Posted by: ${comment.user_name}`).should('be.visible');
    });
  });
});
