 import { render, screen, fireEvent } from '@testing-library/react';
 import Search from '../components/Search';
import axios, { AxiosResponse } from 'axios';

// Define a mock implementation for axios.get
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Search Component', () => {
  it('renders search results correctly', async () => {
    // Create a mock response object
    const mockedResponse: AxiosResponse = {
      data: {
        drinks: [
          { idDrink: '1', strDrink: 'Mock Cocktail 1', strDrinkThumb: 'mock1.jpg', strCategory: 'Mock Category 1' },
          { idDrink: '2', strDrink: 'Mock Cocktail 2', strDrinkThumb: 'mock2.jpg', strCategory: 'Mock Category 2' },
        ],
      },
      status: 200,
      statusText: 'OK',
      config: {
        headers: {} as any, // Use a type assertion to suppress the error
    },
       headers: {},
    };

    // Mock the axios.get function to return the custom response
    mockedAxios.get.mockResolvedValue(mockedResponse as any);

    render(
        <Search />
  
    );
    

    fireEvent.change(screen.getByLabelText('Search Cocktails'), { target: { value: 'Moji' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
  });

  it('displays "No results found" when no search results are available', () => {
    render(
       
        <Search />
    
    );

    // Check if "No results found" is displayed initially
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders search results correctly with a different search query', async () => {
    render(
 
        <Search />
    
    );

    fireEvent.change(screen.getByLabelText('Search Cocktails'), { target: { value: 'Moji' } });
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));

    // Wait for the API call to resolve
    await screen.findByText('Mojito');

    // Check if search results are displayed correctly
    expect(screen.getByText('Mojito')).toBeInTheDocument();
  });
});
