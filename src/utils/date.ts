import moment from 'moment';

export const date = (str: string) => {
  const date = moment(str);
  return date.fromNow();
};
