export function dayDiffCheck(date1, date2) {
  // Get Argument's Time
  const dTime1 = new Date(date1).getTime();
  const dTime2 = new Date(date2).getTime();

  // Total Milliseconds in A Day
  const dayInMs = 24 * 60 * 60 * 1000;

  // Return Day Difference Between Two Dates
  return parseInt((dTime2 - dTime1) / dayInMs);
}
