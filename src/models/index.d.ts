import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EpisodeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SeasonMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MovieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Episode {
  readonly id: string;
  readonly seasonID?: string;
  readonly title: string;
  readonly poster: string;
  readonly plot?: string;
  readonly video: string;
  readonly Season?: Season;
  readonly duration?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Episode, EpisodeMetaData>);
  static copyOf(source: Episode, mutator: (draft: MutableModel<Episode, EpisodeMetaData>) => MutableModel<Episode, EpisodeMetaData> | void): Episode;
}

export declare class Season {
  readonly id: string;
  readonly movieID?: string;
  readonly name: string;
  readonly movie?: Movie;
  readonly episodes?: (Episode | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Season, SeasonMetaData>);
  static copyOf(source: Season, mutator: (draft: MutableModel<Season, SeasonMetaData>) => MutableModel<Season, SeasonMetaData> | void): Season;
}

export declare class Movie {
  readonly id: string;
  readonly categoryID?: string;
  readonly title?: string;
  readonly poster?: string;
  readonly year?: number;
  readonly numberOfSeasons?: number;
  readonly plot?: string;
  readonly cast?: string;
  readonly creator?: string;
  readonly seasons?: (Season | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Movie, MovieMetaData>);
  static copyOf(source: Movie, mutator: (draft: MutableModel<Movie, MovieMetaData>) => MutableModel<Movie, MovieMetaData> | void): Movie;
}

export declare class Category {
  readonly id: string;
  readonly title: string;
  readonly movies?: (Movie | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}