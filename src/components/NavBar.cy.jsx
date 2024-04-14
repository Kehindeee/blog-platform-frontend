import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'; 
import { mount } from 'cypress/react18';
import '../../src/index.css'; 

describe('<NavBar />', () => {
  it('renders correctly', () => {
    mount(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );
    
  });

 
});
