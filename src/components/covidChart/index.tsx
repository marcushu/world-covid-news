import { FunctionComponent, useEffect, useState } from "react";
import { CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, Chart as ChartJS, } from "chart.js";
import { CovidStats } from "../../types";
import { Bar } from "react-chartjs-2";
import styles from './index.module.css';

interface CovidChartProps {
  stats: CovidStats
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CovidChart: FunctionComponent<CovidChartProps> = ({ stats }) => {
  const [showXlabels, setshowXlabels] = useState<boolean>();

  const options = {
    plugins: {
      title: {
        display: false
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        ticks: {
          display: showXlabels, // set false to hide x labels
          major: {
            enabled: true
          }
        }
      },
      y: {
        stacked: true,
        ticks: {
          display: showXlabels
        }
      },
    }
  };

  const data = () => {
    let cumulative = {
      confirmed: [] as number[],
      deaths: [] as number[],
      recovered: [] as number[],
      labels: [] as string[]
    }

    stats.dailyStats.forEach(({ confirmed, deaths, recovered, date }) => {
      cumulative = {
        confirmed: [...cumulative.confirmed, confirmed],
        deaths: [...cumulative.deaths, deaths],
        recovered: [...cumulative.recovered, recovered],
        labels: [...cumulative.labels, date.toLocaleDateString()]
      }
    });

    return {
      labels: cumulative.labels,
      datasets: [
        {
          label: 'Confirmed',
          data: cumulative.confirmed,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: 'Recovered',
          data: cumulative.recovered,
          backgroundColor: 'rgb(53, 162, 235)',
        },
        {
          label: 'Deaths',
          data: cumulative.deaths,
          backgroundColor: 'rgb(0, 0, 0)',
        }
      ]
    }
  };

  useEffect(() => {
    setshowXlabels(window.matchMedia("(min-width: 600px)").matches)

  }, []);

  return (
    <div className={styles.chartcontainer}>
      <Bar options={options} data={data()} />
    </div>
  );
}

export default CovidChart;