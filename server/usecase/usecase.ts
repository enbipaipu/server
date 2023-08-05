export const count: number[] = [0, 50];

export const useCase = {
  push: async (wor: number) => {
    count[0] += 1;
    return wor;
  },
};
