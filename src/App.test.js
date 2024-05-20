import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Router, Routes } from "react-router-dom";
import App from './App';

describe('should render page not found when no match route', () => {
  it('Testing 404! Route', () => {
    const badRoute = '/bad/route';
    const { getByText } = render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>,
    );
    expect(getByText(/404!/i)).toBeInTheDocument();
  }) 

  it('Testing All Routes', () => {
    const routes = ['/customers', '/products', '/callback', '/reducer', '/array_test', '/params'];
    const {getByText} = render(
      <MemoryRouter initialEntries={routes} >
        <App />
      </MemoryRouter>
    )

    expect(getByText(/Customers/i)).toBeInTheDocument();
  })
})