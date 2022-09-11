import {  StoryWithContent } from "./interfaces";

const algolia_base_url = "http://hn.algolia.com/api/v1";

export const story = async (id:number) => {
  const response = await fetch(`${algolia_base_url}/items/${id}`);
  return response.json() as Promise<StoryWithContent>;
}