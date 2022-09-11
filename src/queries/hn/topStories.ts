import { Story } from "./interfaces";

const fb_base_url = "https://hacker-news.firebaseio.com/v0";

export const topStories = async () => {
  const response = await fetch(fb_base_url + "/topstories.json");
  const ids = (await response.json()) as number[];
  return (await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(fb_base_url + `/item/${id}.json`);
      return response.json();
    })
  )) as Story[];
};
