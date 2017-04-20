export const PERIODICAL_OPTIONS = {
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  BI_WEEKLY: 'BI_WEEKLY',
  MONTHLY: 'MONTHLY',
};
export const TIME_OPTIONS = {
  MORNING: 'MORNING',
  AFTERNOON: 'AFTERNOON',
  EVENING: 'EVENING',
};
export const SHARE_SCHEDULE_TYPES = {
  NOW: 'NOW',
  DATE: 'DATE',
  PERIODICAL: 'PERIODICAL',
};

export const SHARE_CONTENT_TYPE = {
  EMAIL: 'EMAIL',
};

export class Share {
  constructor({
    uid = '',
    query = null,
    contentType = SHARE_CONTENT_TYPE.EMAIL,
    subject = '',
    emailFrom = '',
    emailContent = '',
    shareScheduleType = SHARE_SCHEDULE_TYPES.NOW,
    shareOn = null,
    frequency = PERIODICAL_OPTIONS.DAILY,
    time = TIME_OPTIONS.EVENING,
    byFilter = false,
    groupId = '',
    groupName = '',
  }) {
    this.createdBy = uid;
    this.query = query;
    this.contentType = contentType;
    this.subject = subject;
    this.emailFrom = emailFrom;
    this.emailContent = emailContent;
    this.shareMethod = {
      shareOn,
      shareScheduleType,
      frequency,
      time,
    };
    this.byFilter = byFilter;
    this.shareTo = {
      groupId,
      groupName,
      customers: [],
    };
  }

  createShare() {
    return {
      createdBy: this.createdBy,
      query: this.query,
      contentType: this.contentType,
      subject: this.subject,
      emailFrom: this.emailFrom,
      emailContent: this.emailContent,
      shareTo: this.shareTo,
      shareMethod: this.shareMethod,
    };
  }
}
