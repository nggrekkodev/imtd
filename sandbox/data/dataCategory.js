import { dataAll } from './data.js';

export const getCategoriesFromData = () => {
  const categories = new Set();
  dataAll.features.forEach(feature => {
    categories.add(feature.properties.category);
  });
  return Array.from(categories);
};

export const dataCategory = [
  {
    id: 'lab',
    name: 'Labo'
  },
  {
    id: 'company',
    name: 'Entreprise'
  },
  {
    id: 'education',
    name: 'Formation'
  }
];
