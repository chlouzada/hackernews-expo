import { SearchResult, Story, StoryWithContent } from "./interfaces";

const vercel_base_url = "https://chn-chlouzada.vercel.app";

type TRPCResponse<T> = [
  {
    id: string;
    result: {
      data: {
        json: T;
      };
    };
    type: "data";
  }
];

const _topStories = async () => {
  const url = `${vercel_base_url}/api/trpc/hn.topStories?batch=1&input={"0":{"json":null,"meta":{"values":["undefined"]}}}`;
  const response = await fetch(url);
  return (await response.json()) as Promise<TRPCResponse<Story[]>>;
};

export const topStories = async () => {
  const res = await _topStories();
  return res[0].result.data.json.splice(0, 100);
  // return _mockTopStories
};

export const infiniteTopStories = async (limit: number, cursor?: number) => {
  const url = `${vercel_base_url}/api/trpc/hn.infiniteTopStories?batch=1&input={"0":{"json":{"limit":${limit},"cursor":${
    cursor ?? "null"
  }}}}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0].result.data.json as { items: Story[]; nextCursor?: number };
};

const _story = async (id: number) => {
  const url = `${vercel_base_url}/api/trpc/hn.story?batch=1&input={"0":{"json":{"id":${id}}}}`;
  const response = await fetch(url);
  return (await response.json()) as Promise<TRPCResponse<StoryWithContent>>;
};

export const story = async (id: number) => {
  const res = await _story(id);
  return res[0].result.data.json;
};

const _search = async ({ query }: { query: string }) => {
  const url = `${vercel_base_url}/api/trpc/hn.search?batch=1&input={"0":{"json":{"query":"${query}"}}}`;
  const response = await fetch(url);
  return (await response.json()) as Promise<TRPCResponse<SearchResult>>;
};

export const search = async (data: { query: string }) => {
  const res = await _search(data);
  return res[0].result.data.json;
};
