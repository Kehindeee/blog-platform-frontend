import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostDetail from './components/PostDetail';
import * as api from './api'; 
import { MemoryRouter } from 'react-router-dom';

// Mocking the useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: jest.fn(),
}));

describe('PostDetail', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content.',
  };

  beforeEach(() => {
    // Mock the fetchPostById function before each test
    jest.spyOn(api, 'fetchPostById').mockResolvedValue(mockPost);
    // Mock useParams to return a fixed postId
    jest.requireMock('react-router-dom').useParams.mockReturnValue({ postId: mockPost.id });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('loads and displays the post', async () => {
    render(
      <MemoryRouter>
        <PostDetail />
      </MemoryRouter>
    );

    // Check for loading state if applicable
    expect(screen.getByText(/loading/)).toBeInTheDocument(); 

    // Wait for the post title to be in the document
    await waitFor(() => {
      expect(screen.getByText(mockPost.title)).toBeInTheDocument(); // Check for post title
    });

    
    await waitFor(() => {
      expect(screen.getByText(mockPost.content)).toBeInTheDocument(); // Check for post content
    });
  });

  test('handles fetch error', async () => {
    // Override the mock to simulate an error
    api.fetchPostById.mockRejectedValue(new Error('Failed to fetch post details.'));

    render(
      <MemoryRouter>
        <PostDetail />
      </MemoryRouter>
    );

    // Wait for the error message to be in the document
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch post details/)).toBeInTheDocument();
    });
  });
});
