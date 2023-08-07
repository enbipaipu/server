export const getCount = {
  get_count: async (userId: string) => {
    console.log(userId);
    const xValue = 0;
    const yValue = 0;
    return [xValue, yValue];
  },
};

export const useCase = {
  push: async (wor: number, userId: string) => {
    console.log(userId);
    return wor;
  },
  createUserId: async () => {},
};
