import type { ObjectId } from 'mongoose';

export type AutocompleteDTO = {
  options: { name: string; id: ObjectId }[];
};
