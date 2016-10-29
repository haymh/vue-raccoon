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
  min: 0,
};

export const isNewResultSubset = (oldCondition, newCondition) => {
  if (oldCondition.key !== newCondition.key) {
    console.error('Cannot compare different conditions', oldCondition, newCondition);
    return false;
  }
  switch (oldCondition.type) {
    case BETWEEN:
      return oldCondition.min <= newCondition.min && oldCondition.max >= newCondition.max;
    case LESS:
      return oldCondition.max >= newCondition.max;
    case GREATER:
      return oldCondition.min <= newCondition.min;
    case ONEOF:
      for (let i = 0; i < oldCondition.choices.length; i += 1) {
        const oldChoice = oldCondition.choices[i];
        const newChoice = newCondition.choices[i];
        if (!oldChoice && newChoice) {
          return false;
        }
      }
      return true;
    default:
      return false;
  }
};

export const shouldRemoveCondition = (condition) => {
  let shouldRemove = true;
  switch (condition.type) {
    case BETWEEN:
      return condition.min === NO_MIN && condition.max === NO_MAX;
    case LESS:
      return condition.max === NO_MAX;
    case GREATER:
      return condition.min === 0;
    case ONEOF:
      condition.choices.forEach((choice) => {
        shouldRemove = shouldRemove && choice.checked;
      });
      return shouldRemove;
    default:
      return false;
  }
};

export const cleanCopyCondition = (condition) => {
  if (condition === undefined) {
    return undefined;
  }
  const common = {
    key: condition.key,
    type: condition.type,
  };
  switch (condition.type) {
    case BETWEEN:
      return {
        ...common,
        min: condition.min,
        max: condition.max,
      };
    case LESS:
      return {
        ...common,
        max: condition.max,
      };
    case GREATER:
      return {
        ...common,
        min: condition.min,
      };
    case ONEOF:
      return {
        ...common,
        choices: condition.choices,
      };
    default:
      return {};
  }
};

export const schema = {
  conditions: {
    price: {
      key: 'price',
      ...betweenType,
      minChoices: [NO_MIN, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
        80000, 90000, 100000, 120000, 140000, 160000, 180000, 200000],
      maxChoices: [NO_MAX, 10000, 20000, 30000, 40000, 50000, 60000, 70000,
        80000, 90000, 100000, 120000, 140000, 160000, 180000, 200000],
    },
    bed: {
      key: 'bed',
      ...betweenType,
      minChoices: [NO_MIN, 1, 2, 3, 4, 5],
      maxChoices: [NO_MAX, 1, 2, 3, 4, 5],
    },
    bath: {
      key: 'bath',
      ...greaterType,
      minChoices: [0, 1, 2, 3, 4, 5],
    },
    size: {
      key: 'size',
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    lotSize: {
      key: 'lotSize',
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    parking: {
      key: 'parking',
      ...greaterType,
      minChoices: [0, 1, 2, 3, 4],
    },
    hoa: {
      key: 'hoa',
      type: LESS,
      max: NO_MAX,
      maxChoices: [NO_MAX, 0, 25, 50, 100, 200, 300],
    },
    builtYear: {
      key: 'builtYear',
      ...betweenType,
      minChoices: [NO_MIN, 2016, 2015, 2014, 2000, 1990],
      maxChoices: [NO_MAX, 2016, 2015, 2014, 2000, 1990],
    },
    propertyTypes: {
      key: 'propertyTypes',
      type: ONEOF,
      choices: [
        { value: 'Single_family', checked: true },
        { value: 'Townhouse', checked: true },
        { value: 'Apartment', checked: true },
        { value: 'Condo', checked: true },
      ],
    },
    listingTypes: {
      key: 'listingTypes',
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
