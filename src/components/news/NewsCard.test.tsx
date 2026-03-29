import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsCard from './NewsCard';
import { NewsStory } from '../../types';

describe('NewsCard', () => {
  const baseStory: NewsStory = {
    title: 'Vaccine rollout accelerates',
    source: 'WHO',
    url: 'https://example.com/news/vaccine-rollout',
    date: new Date('2024-03-29T12:00:00Z'),
    excerpt: 'Vaccination numbers are rising globally.',
    image: 'https://example.com/images/vaccine.png',
  };

  it('renders story image, title, source, date and excerpt', () => {
    render(<NewsCard story={baseStory} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', baseStory.image);
    expect(image).toHaveAttribute('alt', baseStory.title);

    const sourceDateText = screen.getByText(
      `${baseStory.source} ${baseStory.date.toLocaleDateString()}`
    );
    expect(sourceDateText).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /vaccine rollout accelerates/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', baseStory.url);
    expect(link).toHaveAttribute('target', 'blank');

    expect(screen.getByText(baseStory.excerpt)).toBeInTheDocument();
  });

  it('renders generic image when story.image is missing', () => {
    const storyWithoutImage = { ...baseStory, image: undefined } as unknown as NewsStory;
    render(<NewsCard story={storyWithoutImage} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
  });
});
