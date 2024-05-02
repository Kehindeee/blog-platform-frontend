// Cypress test for the Register component
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Register from './Register';
import NavBar from './NavBar';
import { mount } from 'cypress/react18'
import '../../src/index.css'

// Test the Register component
describe('<Register />', () => {
  it('renders correctly', () => {
    mount(
      <BrowserRouter>
      <NavBar />
        <Register />
      </BrowserRouter>
    );
    
  });

});