const formatter = Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

const relativeFormatter = new Intl.RelativeTimeFormat(undefined);

export const date = (str: string) => {
  console.log(str)
  const now = new Date();
  const date = new Date(str);
  const diff = now.getTime() - date.getTime();

  // now today 
  if (diff > 1000 * 60 * 60 * 24) {
    return formatter.format(date); 
  }


  // if diff in hours
  if (diff > 1000 * 60 * 60)
    return relativeFormatter.format(
      -Math.floor(diff / (1000 * 60 * 60)),
      "hour"
    );

  // if diff in minutes
  if (diff > 1000 * 60)
    return relativeFormatter.format(-Math.floor(diff / (1000 * 60)), "minute");

  // if diff in seconds
  return relativeFormatter.format(-Math.floor(diff / 1000), "second");
};
