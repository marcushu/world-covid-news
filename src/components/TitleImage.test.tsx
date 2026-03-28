import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TitleImage from './TitleImage';

describe('TitleImage', () => {
  it('renders header, tagline, and country select with options, and calls updateFunc on change', () => {
    const updateFunc = jest.fn();
    const initialCode = 'AU';

    render(<TitleImage code={initialCode} updateFunc={updateFunc} />);

    expect(screen.getByText(/The latest covid news and numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/Covid data updated on a daily basis/i)).toBeInTheDocument();

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue(initialCode);

    // Option values should come from countries list
    expect(screen.getByRole('option', { name: 'AUSTRALIA' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'CANADA' })).toBeInTheDocument();

    // Trigger a selection change
    fireEvent.change(select, { target: { value: 'CA' } });
    expect(updateFunc).toHaveBeenCalledTimes(1);
    expect(updateFunc).toHaveBeenCalledWith('CA');
  });
});
