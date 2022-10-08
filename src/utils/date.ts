import moment from 'moment';

export const date = (str: string) => {
  const date = moment(str);
  // get from now in h m s
  return date
    .fromNow(true)
    .replace('hours', 'h')
    .replace('minutes', 'm')
    .replace('seconds', 's')
    .replace('days', 'd')
    .replace('months', 'mo')
    .replace('years', 'y')
    .replace('an hour', '1 h')
    .replace('a day', '1 d')
    .replace('a month', '1 mo')
    .replace('a year', '1 y');
};
