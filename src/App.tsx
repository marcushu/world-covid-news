import { useState } from 'react';
import CovidChart from './components/covidChart';
import NoChart from './components/covidChart/NoChart';
import News from './components/news';
import NowNews from './components/news/NoNews';
import PageFooter from './components/PageFooter';
import StatSummary from './components/StatSummary';
import TitleImage from './components/TitleImage';
import TopLine from './components/TopLine';
import useCovidNews from './hooks/useCovidNews';
import useCovidStats from './hooks/useCovidStats';

function App() {
  const [countryCode, setCountryCode] = useState('US');
  const stats =  useCovidStats(countryCode);
  const news =  useCovidNews(countryCode);

  return (
    <>
      <TopLine />
      <TitleImage
        code={countryCode}
        updateFunc={setCountryCode} />
      {stats
        ? <>
          <StatSummary
            totalConfirmedCases={stats ? stats.totalConfirmedCases : 0}
            totalDeaths={stats ? stats.totalDeaths : 0}
            totalRecoveredCases={stats ? stats.totalRecoveredCases : 0} />
          <CovidChart stats={stats} />
        </>
        : <NoChart />}
      {news.length
        ? <News stories={news} />
        : <NowNews />}
      <PageFooter />
    </>
  );
}

export default App;
