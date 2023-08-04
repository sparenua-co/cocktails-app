import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchInput from '../components/SearchInput';
import { MemoryRouter, BrowserRouter as Router } from 'react-router-dom';


describe('SearchInput Component', () => {
  it('renders the component correctly', async () => {  
    render(
      <Router> {/* Wrap with Router component */}
        <SearchInput />
      </Router>
    );
 // Find the input element by its role
 const inputElement = screen.getByRole('textbox');
    
 // Check if the input element has the correct placeholder or label
 expect(inputElement).toHaveAttribute('aria-label', 'Search');
 
 // Check if the button is rendered
 expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onSearch prop when search button is clicked', async () => { // Make the test function async
    const onSearchMock = jest.fn();
    render(
      <MemoryRouter>
        <SearchInput placeholder="Search" onSearch={onSearchMock} />
      </MemoryRouter>
    );
    // Enter a search query and click the search button
    fireEvent.change(screen.getByRole('textbox', { name: 'Search' }), { target: { value: 'Moji' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    // Check if onSearch prop is called with the correct query
    await waitFor(() => {
      expect(onSearchMock).toHaveBeenCalledWith('Moji'); //  
    });
  });
});

// Test Cases

//1.Renders the Component Correctly: 

//Verifying that the input element is rendered as a textbox.
//Optionally, checking that the input element has the correct aria-label attribute.
//Checking that the button with the name "Search" is rendered in the document.


//2.Calls onSearch Prop When Search Button is Clicked: 