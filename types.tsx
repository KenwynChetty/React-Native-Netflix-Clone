/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Upcoming: undefined;
  Downloads: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
  MovieDetailScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Episode = {
  id:string;
  title:string;
  poster:string;
  duration:string;
  plot:string;
  video:string;
}