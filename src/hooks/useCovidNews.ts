import { useEffect, useState } from "react";
import { NewsStory } from "../types";

const HOST = process.env.REACT_APP_API_HOST;
const APIKEY = process.env.REACT_APP_API_KEY;


const useCovidNews = (countryCode: string) => {
  const [news, setnews] = useState<NewsStory[]>();

  useEffect(() => {
    const fetchNews = async () => {
      const all = [] as NewsStory[]

      const myHeaders = new Headers();
      myHeaders.append("X-RapidAPI-Key", APIKEY!);
      myHeaders.append("X-RapidAPI-Host", HOST!);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders
      };

      const response = await fetch(`https://${HOST}/news/v1/${countryCode}/`, requestOptions);
      const stories = await response.json();

      stories.news.forEach((_story: any) => {
        const story: NewsStory = {
          date: (new Date(stories.updatedDateTime)),
          title: _story.title,
          excerpt: _story.excerpt,
          source: _story.provider.name,
          url: _story.webUrl,
          image: _story.images?.length ? _story.images[0].url : null
        }

        all.push(story)
      });

      // stories with images first
      const withImages = all.filter(({image}) => image);
      const noImages = all.filter(({image}) => !image);

      setnews([...withImages, ...noImages]);
    }

    fetchNews();
  }, [countryCode]);

  return news ? news : []
}

export default useCovidNews;
