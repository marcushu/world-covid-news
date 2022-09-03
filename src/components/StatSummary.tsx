import { FunctionComponent } from "react";
import styles from './StatSummary.module.css';

interface StatSummaryProps {
  totalConfirmedCases: number
  totalDeaths: number
  totalRecoveredCases: number
}

const StatSummary: FunctionComponent<StatSummaryProps> = ({ totalConfirmedCases, totalDeaths, totalRecoveredCases}) => {
  return (
    <div className={styles.statsbar}>
      <div>
        <div className={styles.numbers}>{totalConfirmedCases.toLocaleString()}</div>
        <div className={styles.descriptions}>Total Confirmed</div>
      </div>
      <div>
        <div className={styles.numbers}>{totalRecoveredCases.toLocaleString()}</div>
        <div className={styles.descriptions}>Total Recovered</div>
      </div>
      <div>
        <div className={styles.numbers}>{totalDeaths.toLocaleString()}</div>
        <div className={styles.descriptions}>Total Deaths</div>
      </div>
    </div>
  );
}

export default StatSummary;