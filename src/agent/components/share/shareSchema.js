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

export class Share {
  constructor({
    shareScheduleType = SHARE_SCHEDULE_TYPES.NOW,
    shareOn = null,
    frequency = PERIODICAL_OPTIONS.DAILY,
    byFilter = false,
    groupId = '',
    groupName = '',
  }) {
    this.shareScheduleType = shareScheduleType;
    this.shareOn = shareOn;
    this.frequency = frequency;
    this.byFilter = byFilter;
    this.groupId = groupId;
    this.groupName = groupName;
  }
}
