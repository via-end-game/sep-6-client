export const splitArrayToChunks = <T>(array: T[], parts: number): T[][] => {
  const result: T[][] = [];

  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }

  return result;
};
