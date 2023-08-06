import type { CountModel } from '$/commonTypesWithClient/models';
import { CountRepository } from '$/repository/playerrepo';
import { userIdParser } from '$/service/idParsers';

export const count: number[] = [0, 50];

export const countUsecase = {
  createNewCount: async (userId: string): Promise<CountModel> => {
    const newCount: CountModel = {
      userId: userIdParser.parse(userId),
      x: 0,
      y: 50,
    };
    await CountRepository.save(newCount);
    return newCount;
  },
  getCurrentCount: async (userId: string): Promise<CountModel> => {
    return CountRepository.read(userId);
  },
};

export const getCount = {
  get_count: async (userId: string) => {
    let result;
    try {
      result = await countUsecase.getCurrentCount(userId);
    } catch (error) {
      result = await countUsecase.createNewCount(userId);
    }
    const xValue = result.x;
    const yValue = result.y;
    return [xValue, yValue];
  },
};

export const useCase = {
  push: async (wor: number) => {
    return wor;
  },
};
