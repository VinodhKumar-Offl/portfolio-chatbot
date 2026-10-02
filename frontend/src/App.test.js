import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.IntersectionObserver = MockIntersectionObserver;
});

test('renders portfolio landing content', () => {
  render(<App />);
  expect(
    screen.getByText(/AWS cloud systems & AI agents/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/Explore my work/i)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/vinodhkumar-r/'
  );
});

test('switches between light and dark themes and remembers the choice', () => {
  window.localStorage.setItem('portfolio-theme', 'dark');
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Switch to light theme' }));
  expect(document.documentElement.dataset.theme).toBe('light');
  expect(window.localStorage.getItem('portfolio-theme')).toBe('light');

  fireEvent.click(screen.getByRole('button', { name: 'Switch to dark theme' }));
  expect(document.documentElement.dataset.theme).toBe('dark');
});
