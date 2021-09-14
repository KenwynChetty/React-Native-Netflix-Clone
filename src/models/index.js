// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Episode, Season, Movie, Category } = initSchema(schema);

export {
  Episode,
  Season,
  Movie,
  Category
};