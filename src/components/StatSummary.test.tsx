import React from 'react';
import { render, screen } from '@testing-library/react';
import StatSummary from './StatSummary';

describe('StatSummary', () => {
  it('displays total confirmed, recovered, and deaths with locale formatting', () => {
    render(<StatSummary totalConfirmedCases={1234567} totalDeaths={98765} totalRecoveredCases={543210} />);

    expect(screen.getByText('1,234,567')).toBeInTheDocument();
    expect(screen.getByText('543,210')).toBeInTheDocument();
    expect(screen.getByText('98,765')).toBeInTheDocument();

    expect(screen.getByText(/Total Confirmed/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Recovered/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Deaths/i)).toBeInTheDocument();
  });
});
