export const getMinutesToHoursAndMinutes = (m: number): string =>
  `${(m / 60) ^ 0}H ${m % 60}M`;
