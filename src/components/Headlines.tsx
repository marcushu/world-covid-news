import { FunctionComponent } from "react";
import { NewsStory } from '../types';
import styles from './Headlines.module.css';

interface HeadlinesProps {
  stories: NewsStory[]
}

const Headlines: FunctionComponent<HeadlinesProps> = ({ stories }) => {

  const headline = (story: NewsStory) => {
    return (
      <div className={styles.headline}>
        <p className={styles.title}>{story.title}</p>
        <p className={styles.dates}>{story.date.toLocaleDateString()}</p>
      </div>
    )
  }

  return (
    <div>
      {stories.map(story => <div key={story.title}>{headline(story)}</div>)}
    </div>
  );
}

export default Headlines;