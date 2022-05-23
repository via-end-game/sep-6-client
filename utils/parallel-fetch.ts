export const parallelFetch = async (fetches: any[]) => {
  return await Promise.all(fetches.map((fetch) => fetch()));
};
