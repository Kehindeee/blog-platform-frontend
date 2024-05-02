import { BrowserRouter } from 'react-router-dom';
import Login from './Login'; 
import NavBar from './NavBar'; 
import { mount } from 'cypress/react18';
import '../../src/index.css'; 

describe('<Login />', () => {
  it('renders correctly', () => {
    mount(
      <BrowserRouter>
      <NavBar />
        <Login />
      </BrowserRouter>
    );
    
  });
});