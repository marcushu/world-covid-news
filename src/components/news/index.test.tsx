import React from 'react';
import { render, screen } from '@testing-library/react';
import News from './index';
import { NewsStory } from '../../types';

describe('News', () => {
  const stories: NewsStory[] = [
    {
      title: 'Global cases fall',
      source: 'CDC',
      url: 'https://example.com/global-cases-fall',
      date: new Date('2024-03-28T12:00:00Z'),
      excerpt: 'Total cases declined for the third week in a row.',
      image: 'https://example.com/images/cases.png',
    },
    {
      title: 'New treatment approved',
      source: 'FDA',
      url: 'https://example.com/new-treatment',
      date: new Date('2024-03-29T12:00:00Z'),
      excerpt: 'An antiviral treatment has been approved for emergency use.',
      image: 'https://example.com/images/treatment.png',
    },
  ];

  it('renders all passed stories via NewsCard', () => {
    render(<News stories={stories} />);

    expect(screen.getByText('Global cases fall')).toBeInTheDocument();
    expect(screen.getByText('New treatment approved')).toBeInTheDocument();
    expect(screen.getByText('Total cases declined for the third week in a row.')).toBeInTheDocument();
    expect(screen.getByText('An antiviral treatment has been approved for emergency use.')).toBeInTheDocument();
  });
});
