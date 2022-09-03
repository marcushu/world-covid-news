import { FunctionComponent } from "react";
import { NewsStory } from "../../types";
import styles from './NewsCard.module.css';
import genericImage from '../../images/cvUpdate.png';

interface NewsCardProps {
  story: NewsStory
}

const NewsCard: FunctionComponent<NewsCardProps> = ({ story }) => {
  return (
    <div className={styles.card}>
        <img 
          src={story.image ? story.image : genericImage} 
          alt={story.title}
          className={styles.newsimage} />
      <p className={styles.newsdate}>{story.source} {story.date.toLocaleDateString()}</p>
      <a href={story.url} target='blank'>{story.title} </a>
      <p className={styles.newsexerpt}>{story.excerpt}</p>
    </div>
  );
}

export default NewsCard;