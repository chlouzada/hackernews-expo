import {  SearchResult } from "./interfaces";

const algolia_base_url = "http://hn.algolia.com/api/v1";

export const search = async ({query}:{query:string}) => {
  const response = await fetch(`${algolia_base_url}/search?query=${query}`);
  return response.json() as Promise<SearchResult>;
}