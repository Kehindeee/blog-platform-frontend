/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'cypress/react18';
import '../src/index.css';

import App from './App';

it('renders Home component at "/"', () => {
  mount( <App />
  );
  
  cy.contains('Home').should('be.visible'); 
  cy.contains('Login').should('be.visible');
});