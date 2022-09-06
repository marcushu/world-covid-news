import { FunctionComponent } from "react";
import gitIcon from '../images/GitHub-Mark-Light-64px.png'
import styles from './Topline.module.css';

const TopLine: FunctionComponent = () => {
  // TODO: add correct github link
  return (
    <div className={styles.maindiv}>
      <a href="https://github.com/marcushu/world-covid-news/tree/master" target='blank'>
        <img
          className={styles.gitimage}
          src={gitIcon} alt="git" />
      </a>
    </div>
  );
}

export default TopLine;