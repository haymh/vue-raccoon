export const NO_MIN = 0;
export const NO_MAX = Number.MAX_SAFE_INTEGER;

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

const queryBuilderHelper = (keys, where) => {
  const query = {};
  query[keys[keys.length - 1]] = where;
  for (let i = keys.length - 1; i > 1; i -= 1) {
    query[keys[i - 1]] = query;
  }
  return query;
};

export const generateQuery = (conditions) => {
  const query = {};
  conditions.forEach((c) => {
    switch (c.type) {
      case BETWEEN:
        Object.assign(query, queryBuilderHelper(c.key, {
          $gte: c.min,
          $lte: c.max,
        }));
        break;
      case LESS:
        Object.assign(query, queryBuilderHelper(c.key, {
          $lte: c.max,
        }));
        break;
      case GREATER:
        Object.assign(query, queryBuilderHelper(c.key, {
          $gte: c.min,
        }));
        break;
      case ONEOF:
        Object.assign(query, queryBuilderHelper(c.key, {
          $in: c.choices
                .filter(choice => choice.checked)
                .map(choice => choice.value),
        }));
        break;
      default:
        break;
    }
  });
  console.log('query', query);
  return query;
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
        if (!oldChoice.checked && newChoice.checked) {
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
        choices: condition.choices.map((choice) => {
          const c = { value: choice.value, checked: choice.checked };
          return c;
        }),
      };
    default:
      return {};
  }
};

export const schema = {
  conditions: {
    price: {
      key: ['price'],
      ...betweenType,
      minChoices: [NO_MIN, 50000, 75000, 100000, 125000, 150000, 175000, 200000,
        225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000,
        425000, 450000, 475000, 500000, 525000, 550000, 575000, 600000,
        625000, 650000, 675000, 700000, 725000, 750000, 775000, 800000,
        825000, 850000, 875000, 900000, 925000, 950000, 975000, 1000000,
        1250000, 1500000, 1750000, 2000000, 2250000, 2500000, 2750000,
        3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000,
        4750000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000],
      maxChoices: [NO_MAX, 50000, 75000, 100000, 125000, 150000, 175000, 200000,
        225000, 250000, 275000, 300000, 325000, 350000, 375000, 400000,
        425000, 450000, 475000, 500000, 525000, 550000, 575000, 600000,
        625000, 650000, 675000, 700000, 725000, 750000, 775000, 800000,
        825000, 850000, 875000, 900000, 925000, 950000, 975000, 1000000,
        1250000, 1500000, 1750000, 2000000, 2250000, 2500000, 2750000,
        3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000,
        4750000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000],
    },
    beds: {
      key: ['beds'],
      ...betweenType,
      minChoices: [NO_MIN, 1, 2, 3, 4, 5],
      maxChoices: [NO_MAX, 1, 2, 3, 4, 5],
    },
    baths: {
      key: ['baths'],
      ...greaterType,
      minChoices: [0, 1, 2, 3, 4, 5],
    },
    sizeInSF: {
      key: ['sizeInSF'],
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    lotSizeInSF: {
      key: ['lotSizeInSF'],
      ...betweenType,
      minChoices: [NO_MIN, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
      maxChoices: [NO_MAX, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000],
    },
    parking: {
      key: ['parking'],
      ...greaterType,
      minChoices: [0, 1, 2, 3, 4],
    },
    hoa: {
      key: ['hoa', 'fee'],
      type: LESS,
      max: NO_MAX,
      maxChoices: [NO_MAX, 0, 25, 50, 100, 200, 300],
    },
    built: {
      key: ['built'],
      ...betweenType,
      minChoices: [NO_MIN, 2016, 2015, 2014, 2000, 1990],
      maxChoices: [NO_MAX, 2016, 2015, 2014, 2000, 1990],
    },
    propertyType: {
      key: ['propertyType'],
      type: ONEOF,
      choices: [
        { value: 'SingleFamilyResidence', checked: true },
        { value: 'Townhouse', checked: true },
        { value: 'Apartment', checked: true },
        { value: 'Condominium', checked: true },
      ],
    },
    status: {
      key: ['status'],
      type: ONEOF,
      choices: [
        { value: 'Active', checked: true },
        { value: 'Backup_Offers', checked: false },
        { value: 'Hold', checked: false },
        { value: 'Pending', checked: false },
      ],
    },
  },
};
