import { FunctionComponent } from "react";
import styles from './titleImage.module.css';
import bgImage from '../images/bigvirus.jpg';
import countries from '../js/countries';

interface TitleImageProps {
  code: string
  updateFunc: Function
}

const TitleImage: FunctionComponent<TitleImageProps> = ({ code, updateFunc }) => {
  return (
    <div
      className={styles.maincontainer}
      style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={styles.latest}>
        The latest covid news and numbers
      </div>
      <div className={styles.tagline}>
        Covid data updated on a daily basis or when new information is available.
      </div>
      <div>
        <select
          className={styles.countrybutton}
          value={code}
          onChange={(e) => updateFunc(e.target.value)}>
          {Object.entries(countries)
            .map(([abbreviation, country]) => <option key={abbreviation} value={abbreviation}>{country.toUpperCase()}</option>)}
        </select>
      </div>
    </div>
  );
}

export default TitleImage;