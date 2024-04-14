import React from 'react';
import { render, screen } from '@testing-library/react';
import PostList from './components/PostList';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter

// Mock posts data for testing
const mockPosts = [
  {
    id: 1,
    title: 'First Post',
    content: 'This is the first post content',
    created_at: '2021-01-01T12:00:00Z',
    commentCount: 2,
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'This is the second post content',
    created_at: '2021-01-02T12:00:00Z',
    commentCount: 3,
  },
];

describe('PostList Component', () => {
  it('renders posts when not loading', async () => {
    render(
      <MemoryRouter> {/* Wrap PostList in MemoryRouter for testing */}
        <PostList posts={mockPosts} loading={false} />
      </MemoryRouter>
    );

    // Check if the titles of the posts are rendered
    const firstPostTitle = screen.getByText('First Post');
    expect(firstPostTitle).toBeInTheDocument();

    const secondPostTitle = screen.getByText('Second Post');
    expect(secondPostTitle).toBeInTheDocument();
  });

  it('displays loading message when loading is true', () => {
    render(
      <MemoryRouter> {/* Wrap PostList in MemoryRouter for testing */}
        <PostList posts={[]} loading={true} />
      </MemoryRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
