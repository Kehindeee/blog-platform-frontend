/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AuthContext,AuthProvider } from '../context/AuthContext'; 
import CommentsSection from './CommentsSection';
import '../index.css'; 

// MockAuthProvider 
const MockAuthProvider = ({ children }) => {
  const mockUser = { id: 'user1', name: 'User 1' }; 

  // Mock the value you want to provide to the context
  const value = { user: mockUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

describe('CommentsSection', () => {
  const mockPostId = '1';
  const mockComments = [
    { id: 1, comment: 'Test comment 1', user_name: 'User 1', user_id: 'user1' },
    { id: 2, comment: 'Test comment 2', user_name: 'User 2', user_id: 'user2' },
  ];

  beforeEach(() => {
    cy.intercept('GET', `/api/posts/${mockPostId}/comments`, mockComments).as('getComments');
    cy.intercept('POST', `/api/posts/${mockPostId}/comments`, { statusCode: 201, body: { id: 3, ...mockComments[0] }}).as('postComment');
    cy.intercept('DELETE', `/api/comments/*`, { statusCode: 204 }).as('deleteComment');
    cy.intercept('PUT', `/api/comments/*`, { statusCode: 200, body: { ...mockComments[0], comment: 'Edited comment' }}).as('editComment');
    
    
    mount(
      <BrowserRouter>
        <MockAuthProvider>
          <CommentsSection postId={mockPostId} />
        </MockAuthProvider>
      </BrowserRouter>
    );
  });

  it('renders comments after loading', () => {
   
  });

  it('allows a logged-in user to submit a new comment', () => {
    
  });

});
