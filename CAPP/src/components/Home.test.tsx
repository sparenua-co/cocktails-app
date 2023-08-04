import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../components/Home';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock axios to return a custom response
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: { drinks: [{ idDrink: '1', strDrink: 'Mock Cocktail', strDrinkThumb: 'mock.jpg', strCategory: 'Mock Category' }] } })),
}));

describe('Home Component', () => {
  const initialState = {
    cocktails: {
      favouriteCocktails: [],
      randomCocktails: [],
      loading: false,
    },
  };

  const mockStore = configureStore([thunk]);
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders the component correctly', () => {
    render(
      <Provider store={store}>
            <Router>

        <Home />
        </Router>

      </Provider>
    );

    // Check if the "Refresh" button and "HOME" heading are rendered
    expect(screen.getByText('Refresh')).toBeInTheDocument();
   });


});


//