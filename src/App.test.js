import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to MealHub/i);
  expect(linkElement).toBeInTheDocument();
});
