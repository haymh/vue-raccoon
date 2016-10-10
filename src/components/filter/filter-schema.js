export const NO_MIN = 'No Min';
export const NO_MAX = 'No Max';

// condition types
export const BETWEEN = 'BETWEEN';
export const LESS = 'LESS';
export const GREATER = 'GREATER';
export const ONEOF = 'ONEOF';

const betweenType = {
  type: BETWEEN,
  min: NO_MIN,
  max: NO_MAX,
};

const greaterType = {
  type: GREATER,
  min: NO_MIN,
};

export const schema = {
  conditions: {
    price: {
      ...betweenType,
      minChoices: [NO_MIN, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
         80000, 90000, 100000, 120000, 140000, 160000, 180000, 200000],
      maxChoices: [NO_MAX, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
         80000, 90000, 100000, 120000, 140000, 160000, 180000, 200000],
    },
    bed: {
      ...betweenType,
      minChoices: [NO_MIN, 1, 2, 3, 4, 5],
      maxChoices: [NO_MAX, 1, 2, 3, 4, 5],
    },
    bath: {
      ...greaterType,
      minChoices: [NO_MIN, 1, 2, 3, 4, 5],
    },
    size: {
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    lotSize: {
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    parking: {
      ...greaterType,
      minChoices: [NO_MIN, 1, 2, 3, 4],
    },
    hoa: {
      type: LESS,
      max: NO_MAX,
      maxChoices: [NO_MAX, 0, 25, 50, 100, 200, 300],
    },
    builtYear: {
      ...betweenType,
      minChoices: [NO_MIN, 2016, 2015, 2014, 2000, 1990],
      maxChoices: [NO_MAX, 2016, 2015, 2014, 2000, 1990],
    },
    propertyTypes: {
      type: ONEOF,
      choices: [
        { value: 'Single_family', checked: true },
        { value: 'Townhouse', checked: true },
        { value: 'Apartment', checked: true },
        { value: 'Condo', checked: true },
      ],
    },
    listingTypes: {
      type: ONEOF,
      choices: [
        { value: 'Active', checked: true },
        { value: 'Backup_Offers', checked: false },
        { value: 'Contingent', checked: false },
        { value: 'Hold', checked: false },
        { value: 'Pending', checked: false },
      ],
    },
  },
};
