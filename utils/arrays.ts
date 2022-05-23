export const splitArrayToChunks = (array: any[], parts: number): any[] => {
  const result = [];

  for (let i = parts; i > 0; i--) {
    result.push(array.splice(0, Math.ceil(array.length / i)));
  }

  return result;
};
