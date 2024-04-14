/* eslint-disable no-undef */
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000') 
  })
})

describe('Fetching Posts', () => {
  beforeEach(() => {
    // Intercept the GET request to the API for recent posts
    cy.intercept('GET', 'http://localhost:8080/api/posts/recent', {
      statusCode: 200,
      body: [{ id: 1, title: 'Most Recent Post', content: 'Content of the most recent post.' }],
    }).as('getRecentPosts');

    // Intercept the GET request to the API for all posts
    cy.intercept('GET', 'http://localhost:8080/api/posts', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Post 1', content: 'Content of post 1.' },
        { id: 2, title: 'Post 2', content: 'Content of post 2.' },
        { id: 3, title: 'Post 3', content: 'Content of post 3.' },
        { id: 4, title: 'Post 4', content: 'Content of post 4.' }
      ],
    }).as('getAllPosts');
  });

  it('successfully loads recent posts', () => {
    cy.visit('/'); 
    cy.wait('@getRecentPosts');
    
  });

  it('successfully loads all posts', () => {
    cy.visit('/');
    cy.wait(5000);
    cy.wait('@getAllPosts');
    
    
  });
  describe('Login', () => {
    beforeEach(() => {
      // Intercept the POST request to the API for login
      cy.intercept('POST', 'http://localhost:8080/api/login', (req) => {
        if (req.body.username === 'testuser' && req.body.password === 'testpassword') {
          req.reply({
            statusCode: 200,
            body: { token: 'mock_token' }, // replace with your actual token structure
          });
        } else {
          req.reply({
            statusCode: 401,
            body: { message: 'Invalid username or password' },
          });
        }
      }).as('login');
    });
  
    it('successfully logs in with correct credentials', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type('testuser');
      cy.get('input[name="password"]').type('testpassword');
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
      cy.contains('Logout').should('be.visible');
    });
  
    it('shows an error message with incorrect credentials', () => {
      cy.visit('/login');
      cy.get('input[name="username"]').type('wronguser');
      cy.get('input[name="password"]').type('wrongpassword');
      cy.get('button[type="submit"]').click();
      cy.wait('@login');
      cy.contains('Invalid username or password').should('be.visible');
    });
  });


    describe('Creating a Post', () => {
      it('successfully creates a new post', () => {
        cy.visit('/createpost');
        cy.get('input[name="title"]').type('New Post'); // type into the title input field
        cy.get('textarea[name="content"]').type('Content of the new post.'); // type into the content textarea
        cy.get('button[type="submit"]').click(); // click the submit button
        cy.contains('New Post').should('be.visible'); // assert that the new post is displayed
      });
    });
  });
