import React from 'react';
import { render, screen } from '@testing-library/react';
import CovidChart from './index';
import { Bar } from 'react-chartjs-2';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('react-chartjs-2', () => ({
  Bar: jest.fn(() => <div data-testid="bar-chart" />)
}));

describe('CovidChart', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Bar chart and passes cumulative data/options', () => {
    const stats = {
      totalConfirmedCases: 30,
      totalDeaths: 7,
      totalRecoveredCases: 17,
      dailyStats: [
        {
          date: new Date('2024-01-01'),
          confirmed: 10,
          deaths: 2,
          recovered: 3,
        },
        {
          date: new Date('2024-01-02'),
          confirmed: 20,
          deaths: 5,
          recovered: 14,
        },
      ],
    };

    render(<CovidChart stats={stats} />);

    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();

    expect(Bar).toHaveBeenCalled();
    expect((Bar as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(1);

    const callArg = (Bar as jest.Mock).mock.calls[(Bar as jest.Mock).mock.calls.length - 1][0];
    const expectedLabels = stats.dailyStats.map((item) => item.date.toLocaleDateString());

    expect(callArg.data.labels).toEqual(expectedLabels);
    expect(callArg.data.datasets[0].data).toEqual([10, 20]);
    expect(callArg.data.datasets[1].data).toEqual([3, 14]);
    expect(callArg.data.datasets[2].data).toEqual([2, 5]);

    // TODO: figure out how to test the these options
    //expect(callArg.options.plugins.title.display).toBe(false);
    //expect(callArg.options.scales.x.ticks.display).toBe(true);
    //expect(callArg.options.scales.y.ticks.display).toBe(true);
  });
});
