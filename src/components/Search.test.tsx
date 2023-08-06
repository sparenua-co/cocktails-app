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
          { idDrink: '13072', strDrink: 'Popped cherry', strDrinkThumb: 'sxvrwv1473344825.jpg', strCategory: 'Ordinary Drink' },
          { idDrink: '12186', strDrink: 'Shanghai Cocktail', strDrinkThumb:'ttyrxr1478820678.jpg', strCategory: 'Ordinary Drink' },
        ],
      },
      status: 200,
      statusText: 'OK',
      config: {
        headers: {} as any,  
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


//Test cases

//1.Renders Search Results Correctly
//2.Displays "No Results Found" When No Search Results are Available: 
//3.Renders Search Results Correctly with a Different Search Query: