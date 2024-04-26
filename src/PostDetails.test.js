import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import PostDetail from './components/PostDetail';
import * as api from './api'; 
import { MemoryRouter } from 'react-router-dom';
import { getCurrentUser } from './mocks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ postId: '1' }),
}));

jest.mock('./api', () => ({
  ...jest.requireActual('./api'), 
  fetchComments: jest.fn(),
  submitComment: jest.fn(),
  fetchPostById: jest.fn(),
}));

jest.mock('./mocks', () => ({
  getCurrentUser: jest.fn(),
}));

describe('PostDetail with Comments', () => {
  const mockPost = {
    id: '1',
    title: 'Test Post',
    content: 'This is a test post content.',
    comments: [
      { id: '1', text: 'First comment', author: 'User1' },
      { id: '2', text: 'Second comment', author: 'User2' },
    ],
  };

  const mockUser = {
    id: 'user1',
    name: 'John Doe',
  };

  beforeEach(() => {
    api.fetchPostById.mockResolvedValue(mockPost);
    api.fetchComments.mockResolvedValue(mockPost.comments);
    getCurrentUser.mockReturnValue(mockUser);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders post details and comments', async () => {
    render(<MemoryRouter><PostDetail /></MemoryRouter>);

    expect(await screen.findByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();

    for (const comment of mockPost.comments) {
      expect(await screen.findByText(comment.text)).toBeInTheDocument();
    }
  });

  test('handles comment submission', async () => {
    render(<MemoryRouter><PostDetail /></MemoryRouter>);

    const newCommentText = 'This is a new comment';
    const commentInput = screen.getByRole('textbox', { name: /add comment/ });
    userEvent.type(commentInput, newCommentText);

    userEvent.click(screen.getByRole('button', { name: /submit/ }));

    expect(api.submitComment).toHaveBeenCalledWith(mockPost.id, newCommentText);
    expect(await screen.findByText(newCommentText)).toBeInTheDocument();
  });
});