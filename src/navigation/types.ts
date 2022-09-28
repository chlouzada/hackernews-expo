export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Story: StoryParams;
};

export interface StoryParams {
  id: number;
  title: string;
  comments: number;
}