/* eslint-disable no-undef */
// End to End Testing with Cypress
describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('http://localhost:3000');
  });
});

// Fetching Posts Testing
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
        { id: 4, title: 'Post 4', content: 'Content of post 4.' },
      ],
    }).as('getAllPosts');
  });

  it('successfully loads recent posts', () => {
    cy.visit('/');
    cy.wait('@getRecentPosts');
  });

  it('successfully loads all posts', () => {
    cy.visit('/');
    cy.wait('@getAllPosts');
    cy.wait(5000); 
  });
// Login Testing
  describe('Login', () => {
    beforeEach(() => {
      // Intercept the POST request to the API for login
      cy.intercept('POST', 'http://localhost:8080/api/login', (req) => {
        if (req.body.email === 'testuser@example.com' && req.body.password === 'testpassword') {
          req.reply({
            statusCode: 200,
            body: {
              user: {
                id: '1',
                email: 'testuser@example.com',
                name: 'Test User',
                isAdmin: false,
              },
            },
          });
        } else {
          req.reply({
            statusCode: 401,
            body: { message: 'Invalid username or password' },
          });
        }
      }).as('login');
    });

    it('displays a toast message for password shorter than eight characters', () => {
      cy.visit('/login');
      cy.get('#email-address').type('testuser@example.com');
      cy.get('#password').type('short'); // Password less than 8 characters
      cy.get('button').contains('Sign in').click();

      // Check for the toast message related to short passwords
      cy.get('.Toastify__toast-container')
        .find('.Toastify__toast--error')
        .should('be.visible')
        .and('contain', 'Password must be at least 8 characters');
    });

    it('successfully logs in with correct credentials', () => {
      cy.visit('/login');
      cy.get('#email-address').type('testuser@example.com');
      cy.get('#password').type('testpassword');
      cy.get('button').contains('Sign in').click();
      cy.wait('@login').then((interception) => {
        if (interception.response.statusCode === 200) {
          // eslint-disable-next-line no-unused-expressions
          expect(interception.response.body.user).to.exist;
          
          cy.url({ timeout: 10000 }).should('include', '/profile');
          cy.contains('Logout').should('be.visible');
        }
      });
    });
    
  
    it('shows an error message with incorrect credentials', () => {
      cy.visit('/login');
      cy.get('#email-address').type('newuser@example.com');
      cy.get('#password').type('password123');
      cy.get('button').contains('Sign in').click();
      cy.wait('@login');
      cy.contains('Failed to login. Please check your credentials.').should('be.visible');
    });
  });
});
// Admin Dashboard Testing
describe('Admin Login and Dashboard', () => {
  before(() => {
    cy.intercept('GET', 'http://localhost:8080/api/users', {
      statusCode: 200,
      body: [
        { id: 1, name: 'Admin User', email: 'admin@example.com' },
        { id: 1, name: ' User', email: 'admin@example.com' },
        { id: 1, name: 'User', email: 'admin@example.com' },
      ],
    }).as('getUsers');

    cy.intercept('GET', 'http://localhost:8080/api/posts', {
      statusCode: 200,
      body: [
        { id: 1, title: 'First Post' },
        { id: 1, title: 'Second Post' },
        { id: 1, title: 'Third Post' },
      ],
    }).as('getPosts');
  });

  it('allows an admin to log in and displays the admin dashboard with users and posts', () => {
    const adminCredentials = {
      email: 'admin@example.com',
      password: 'adminpassword'
    };

    cy.intercept('POST', 'http://localhost:8080/api/login', {
      statusCode: 200,
      body: {
        user: {
          id: '1',
          email: adminCredentials.email,
          name: 'Admin User',
          isAdmin: true
        }
      },
    }).as('adminLogin');

    cy.visit('/login');
    cy.get('#email-address').type(adminCredentials.email);
    cy.get('#password').type(adminCredentials.password);
    cy.get('button').contains('Sign in').click();

    cy.wait('@adminLogin');
    cy.wait(5000); // Consider whether you actually need this wait
    cy.url().should('include', '/admin/dashboard');

    // Confirm the dashboard is displaying users and posts by checking for the existence of list elements
    cy.get('h1').contains('Admin Dashboard').should('be.visible');
    cy.get('h2').contains('Users').should('be.visible');
    cy.get('h2').contains('Posts').should('be.visible');
    cy.wait('@getUsers');
    cy.wait('@getPosts');
    cy.get('ul').first().find('li').should('have.length.at.least', 1);
    cy.get('ul').eq(1).find('li').should('have.length.at.least', 1);

    // Ensure the "Create Post" button is present
    cy.contains('Create Post').should('exist');

  });
});