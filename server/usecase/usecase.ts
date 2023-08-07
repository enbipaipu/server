import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerrepo';
import { UserIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const playerUseCase = {
  createNewPlayer: async () => {
    const newPlayer: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      x: 0,
      y: 50,
    };
    await playerRepository.save(newPlayer);
    return newPlayer.userId;
  },
};

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
  create: async (userId: string) => {
    if (userId === 'no UserId') {
      return playerUseCase.createNewPlayer();
    } else {
      return 'あなたはすでにuserIdを持っています。';
    }
  },
};
