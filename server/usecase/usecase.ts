export const useCase = async () => {
  return {
    push: async (x: string) => {
      console.log(x);
    },
  };
};
