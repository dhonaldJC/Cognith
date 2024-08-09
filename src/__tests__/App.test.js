// src/__tests__/App.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../../App'; // Adjust the import path if necessary

describe('App', () => {
  it('renders correctly', () => {
    const { getByText } = render(<App />);
    
    // Check if the Home screen is rendered
    expect(getByText('Home Screen')).toBeTruthy(); // Adjust text to match what you expect

    // You might also want to check if the navigation works
  });

  it('navigates to DetailScreen', async () => {
    const { getByText } = render(<App />);
  
    // Simulate a button press or navigation action
    fireEvent.press(getByText('Go to Details')); // Adjust based on your button's text
  
    // Check if the Detail screen is rendered
    expect(getByText('Detail Screen')).toBeTruthy();
  });
  
});
