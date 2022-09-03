import { FunctionComponent } from "react";
import { NewsStory } from "../../types";
import NewsCard from "./NewsCard";
import styles from './index.module.css';

interface NewsProps {
  stories: NewsStory[]
}

const News: FunctionComponent<NewsProps> = ({ stories }) => {
  return (
    <div>
      <div className={styles.storycontainer}>
        {stories.map(story => <NewsCard key={story.title} story={story} />)}
      </div>
    </div>
  );
}

export default News;