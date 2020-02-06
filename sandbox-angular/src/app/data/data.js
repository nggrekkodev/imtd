// import { dataMarker } from './dataMarker';
// import { dataZone } from './dataZone';

export const dataLab = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.508846, 50.323208]
      },
      properties: {
        name: 'Labo 1',
        id: '1',
        category: 'laboratoire'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.507652, 50.322324]
      },
      properties: {
        name: 'Labo 2',
        id: '2',
        category: 'laboratoire'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.509652, 50.332324]
      },
      properties: {
        name: 'Labo 3',
        id: '2',
        category: 'laboratoire'
      }
    }
  ]
};

export const dataEducation = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.513599, 50.321466]
      },
      properties: {
        name: 'Formation  1',
        id: '1',
        category: 'formation'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.51406, 50.322877]
      },
      properties: {
        name: 'Formation  2',
        id: '2',
        category: 'formation'
      }
    }
  ]
};

export const dataCompany = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.508483, 50.317692]
      },
      properties: {
        name: 'Entreprise  1',
        id: '1',
        category: 'entreprise'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [3.507732, 50.319227]
      },
      properties: {
        name: 'Entreprise  2',
        id: '2',
        category: 'entreprise'
      }
    }
  ]
};

export const dataAll = {
  type: 'FeatureCollection',
  features: [...dataLab.features, ...dataEducation.features, ...dataCompany.features]
};
