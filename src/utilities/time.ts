export const hoursToHoursMinutes = (mins: number) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  return `${h}h ${m}m`;
};
