import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Register from './Register';
import NavBar from './NavBar';
import { mount } from 'cypress/react18'
import '../../src/index.css'

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