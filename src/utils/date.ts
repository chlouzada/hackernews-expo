// const formatter = Intl.DateTimeFormat(undefined, {
//   dateStyle: "short",
// });

import moment from "moment";

// const relativeFormatter = new Intl.RelativeTimeFormat(undefined);

export const date = (str: string) => {
  // const now = moment();
  const date = moment(str);
  // const diff = now.diff(date, "milliseconds");

  // if (diff > 1000 * 60 * 60 * 24) return date.format("YYYY-MM-DD - HH:mm");

  return date.fromNow();
};
