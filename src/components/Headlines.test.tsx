import React from 'react';
import { render, screen } from '@testing-library/react';
import Headlines from './Headlines';
import { NewsStory } from '../types';

describe('Headlines', () => {
  const stories: NewsStory[] = [
    {
      title: 'First headline',
      source: 'CNN',
      url: 'https://example.com/first',
      date: new Date('2026-03-29T00:00:00Z'),
      excerpt: 'First excerpt',
      image: null,
    },
    {
      title: 'Second headline',
      source: 'BBC',
      url: 'https://example.com/second',
      date: new Date('2026-03-28T00:00:00Z'),
      excerpt: 'Second excerpt',
      image: null,
    },
  ];

  it('renders each story title and formatted date', () => {
    render(<Headlines stories={stories} />);

    expect(screen.getByText('First headline')).toBeInTheDocument();
    expect(screen.getByText('Second headline')).toBeInTheDocument();

    expect(screen.getByText(stories[0].date.toLocaleDateString())).toBeInTheDocument();
    expect(screen.getByText(stories[1].date.toLocaleDateString())).toBeInTheDocument();
  });

  it('uses title as key for each headline wrapper', () => {
    render(<Headlines stories={stories} />);

    const wrappers = screen.getAllByText(/headline/i).map((element) => element.textContent);
    expect(wrappers).toEqual(expect.arrayContaining(['First headline', 'Second headline']));
  });
});
