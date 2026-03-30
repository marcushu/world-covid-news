import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { NewsStory } from '../types';

describe('Covid hooks', () => {
  let originalFetch: typeof global.fetch;

  beforeAll(() => {
    originalFetch = global.fetch;
    // ensure env values are present before hook module evaluation
    process.env.REACT_APP_API_HOST = 'example-rapidapi.com';
    process.env.REACT_APP_API_KEY = 'test-key';
  });

  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test('useCovidStats fetches stats, parses history, and returns structured data', async () => {
    const statsResponse = {
      stats: {
        history: [
          { date: '2024-01-01', confirmed: 10, deaths: 1, recovered: 2 },
          { date: '2024-01-02', confirmed: 20, deaths: 2, recovered: 3 }
        ],
        totalConfirmedCases: 30,
        totalDeaths: 3,
        totalRecoveredCases: 5
      }
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(statsResponse) } as Response)
    );

    // Import after env and fetch mock set to read constants from module init
    const useCovidStats = require('./useCovidStats').default;

    const StatsUser = ({ countryCode }: { countryCode: string }) => {
      const stats = useCovidStats(countryCode);
      return (
        <div data-testid="stats">
          {stats
            ? `${stats.totalConfirmedCases} ${stats.dailyStats.length} ${stats.totalDeaths} ${stats.totalRecoveredCases}`
            : 'loading'}
        </div>
      );
    };

    render(<StatsUser countryCode="US" />);

    await waitFor(() => {
      expect(screen.getByTestId('stats')).toHaveTextContent('30 2 3 5');
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example-rapidapi.com/stats/v1/US/',
      expect.objectContaining({ method: 'GET', headers: expect.any(Headers) })
    );
  });

  test('useCovidNews fetches news and orders stories with images first', async () => {
    const newsResponse = {
      updatedDateTime: '2024-01-01T00:00:00.000Z',
      news: [
        {
          title: 'No image story',
          excerpt: 'excerpt2',
          provider: { name: 'Provider2' },
          webUrl: 'https://example.com/story2',
          images: []
        },
        {
          title: 'Has image story',
          excerpt: 'excerpt1',
          provider: { name: 'Provider1' },
          webUrl: 'https://example.com/story1',
          images: [{ url: 'https://example.com/image1.jpg' }]
        }
      ]
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(newsResponse) } as Response)
    );

    const useCovidNews = require('./useCovidNews').default;

    const NewsUser = ({ countryCode }: { countryCode: string }) => {
      const news = useCovidNews(countryCode) as NewsStory[];
      return (
        <div data-testid="news">
          {news.length} - {news.map((item: NewsStory) => item.title).join('|')}
        </div>
      );
    };

    render(<NewsUser countryCode="US" />);

    await waitFor(() => {
      expect(screen.getByTestId('news')).toHaveTextContent('2 - Has image story|No image story');
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://example-rapidapi.com/news/v1/US/',
      expect.objectContaining({ method: 'GET', headers: expect.any(Headers) })
    );
  });
});
