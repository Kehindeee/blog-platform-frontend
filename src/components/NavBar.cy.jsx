// Cypress test for the NavBar component
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'; 
import { mount } from 'cypress/react18';
import '../../src/index.css'; 

// Test the NavBar component

describe('<NavBar />', () => {
  it('renders correctly', () => {
    mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    
  });

 
});
