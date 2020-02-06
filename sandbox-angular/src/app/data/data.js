/**
 * DATA
 */
export const dataLab = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.508846, 50.323208]
      },
      properties: {
        name: "Labo 1",
        id: "1",
        category: "laboratoire"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.507652, 50.322324]
      },
      properties: {
        name: "Labo 2",
        id: "2",
        category: "laboratoire"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.509652, 50.332324]
      },
      properties: {
        name: "Labo 3",
        id: "2",
        category: "laboratoire"
      }
    }
  ]
};

export const dataEducation = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.513599, 50.321466]
      },
      properties: {
        name: "Formation  1",
        id: "1",
        category: "formation"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.51406, 50.322877]
      },
      properties: {
        name: "Formation  2",
        id: "2",
        category: "formation"
      }
    }
  ]
};

export const dataCompany = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.508483, 50.317692]
      },
      properties: {
        name: "Entreprise  1",
        id: "1",
        category: "entreprise"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.507732, 50.319227]
      },
      properties: {
        name: "Entreprise  2",
        id: "2",
        category: "entreprise"
      }
    }
  ]
};

export const dataAll = {
  type: "FeatureCollection",
  features: [
    ...dataLab.features,
    ...dataEducation.features,
    ...dataCompany.features
  ]
};

export const interestPoints = {
  type: "FeatureCollection",
  features: [
    ...dataLab.features,
    ...dataEducation.features,
    ...dataCompany.features
  ]
};

/**
 * CATEGORIES
 */
export const getCategoriesFromData = () => {
  const categories = new Set();
  dataAll.features.forEach(feature => {
    categories.add(feature.properties.category);
  });
  return Array.from(categories);
};

export const categories = [
  // export const dataCategories = [
  {
    id: "laboratoire",
    name: "laboratoire",
    iconFilePath: "./assets/images/icons/science.png",
    iconFileName: "science.png"
  },
  {
    id: "entreprise",
    name: "entreprise",
    iconFilePath: "./assets/images/icons/engineering.png",
    iconFileName: "engineering.png"
  },
  {
    id: "formation",
    name: "formation",
    iconFilePath: "./assets/images/icons/schools.png",
    iconFileName: "schools.png"
  }
];

/**
 * CITIES
 */
export const dataCity = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0]
      },
      properties: {
        name: "Aucune",
        id: "city-0"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.5234846, 50.3579317]
      },
      properties: {
        name: "Valenciennes",
        id: "city-1"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.0635282, 50.6365654]
      },
      properties: {
        name: "Lille",
        id: "city-2"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [3.9674154, 50.27964]
      },
      properties: {
        name: "Maubeuge",
        id: "city-3"
      }
    }
  ]
};

/**
 * DATA ZONE
 */

export const dataZone = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        name: "uphf"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.5145735740661617, 50.329066619803925],
            [3.513972759246826, 50.32909401598244],
            [3.5091662406921387, 50.32743651875322],
            [3.508694171905517, 50.32697076532522],
            [3.509531021118164, 50.324902217005146],
            [3.511934280395508, 50.32428574479354],
            [3.513457775115967, 50.32317607466178],
            [3.5119128227233887, 50.322080078730615],
            [3.5120201110839844, 50.3209977579476],
            [3.514723777770996, 50.31983320806219],
            [3.5178351402282715, 50.32653240498779],
            [3.517234325408935, 50.327984458118486],
            [3.515496253967285, 50.328970733054724],
            [3.5145735740661617, 50.329066619803925]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "transalley"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.508028984069824, 50.31936052967432],
            [3.5085976123809814, 50.31868918127677],
            [3.5109686851501465, 50.31891524863272],
            [3.510829210281372, 50.31937423056331],
            [3.5099279880523677, 50.31949753838646],
            [3.509670495986938, 50.31982635768434],
            [3.508028984069824, 50.31936052967432]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        name: "imtd"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [3.5124599933624268, 50.31855902079625],
            [3.513779640197754, 50.31855902079625],
            [3.513779640197754, 50.31920296916722],
            [3.5124599933624268, 50.31920296916722],
            [3.5124599933624268, 50.31855902079625]
          ]
        ]
      }
    }
  ]
};
