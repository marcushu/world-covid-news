import { useEffect, useState } from "react";
import { CovidStats, DailyStat } from "../types";

const HOST = process.env.REACT_APP_API_HOST;
const APIKEY = process.env.REACT_APP_API_KEY;


const useCovidStats = (countryCode: string) => {
  const [stats, setStats] = useState<CovidStats>();

  useEffect(() => {
    const fetchStats = async () => {
      const all = [] as DailyStat[];

      const myHeaders = new Headers();
      myHeaders.append("X-RapidAPI-Key", APIKEY!);
      myHeaders.append("X-RapidAPI-Host", HOST!);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const response = await fetch(`https://${HOST}/stats/v1/${countryCode}/`, requestOptions)
      const covidStats = await response.json();

      covidStats.stats.history.forEach((localStat: any) => {
        const newStat: DailyStat = {
          date: (new Date(localStat.date)),
          confirmed: localStat.confirmed,
          deaths: localStat.deaths,
          recovered: localStat.recovered
        }

        all.push(newStat);
      })

      const covidStatistics = {
        dailyStats: all,
        totalConfirmedCases: covidStats.stats.totalConfirmedCases,
        totalDeaths: covidStats.stats.totalDeaths,
        totalRecoveredCases: covidStats.stats.totalRecoveredCases
      } as CovidStats;

      setStats(covidStatistics);
    }

    fetchStats();
  }, [countryCode]);

  return stats
}

export default useCovidStats