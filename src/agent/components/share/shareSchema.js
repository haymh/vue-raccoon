export const PERIODICAL_OPTIONS = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  BI_WEEKLY: 'BI_WEEKLY',
  MONTHILY: 'MONTHILY',
};
export const SHARE_SCHEDULE_TYPES = {
  NOW: 'NOW',
  DATE: 'DATE',
  PERIODICAL: 'PERIODICAL',
};
export const SHARE_HOUSE_TYPE = {
  BY_FILTER: 'BY_FILTER',
  LIST: 'LIST',
};

export class Share {
  constructor(
    shareSchedule = {
      type: SHARE_SCHEDULE_TYPES.SHARE_NOW,
      on: null,
    },
    houses = {
      type: SHARE_HOUSE_TYPE.LIST,
      list: [],
      filter: null,
    },
    customers = [],
    group = {
      id: '',
      name: '',
    }) {
    this.shareSchedule = shareSchedule;
    this.houses = houses;
    this.customers = customers;
    this.group = group;
  }
  shareByFilter() {
    return this.houses.type === SHARE_HOUSE_TYPE.BY_FILTER;
  }
}
