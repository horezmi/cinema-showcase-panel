import { InitialData } from '../types/types';

export const initialData: InitialData = {
  films: [
    { id: 1, name: 'The Matrix' },
    { id: 2, name: 'Inception' },
    { id: 3, name: 'Interstellar' },
    { id: 4, name: 'The Dark Knight' },
    { id: 5, name: 'Pulp Fiction' }
  ],
  categories: [
    {
      id: 1,
      name: 'Action',
      subCategories: [
        { id: 101, name: 'Sci-Fi', filmIds: [1, 2, 3] },
        { id: 102, name: 'Superheroes', filmIds: [1, 2, 4] }
      ]
    },
    {
      id: 2,
      name: 'Drama',
      subCategories: [
        { id: 201, name: 'Historical', filmIds: [1, 3, 5] },
        { id: 202, name: 'Romance', filmIds: [2, 3, 5] }
      ]
    }
  ]
};
