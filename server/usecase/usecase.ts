import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerrepo';
import { UserIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const playerUseCase = {
  createNewPlayer: async () => {
    console.log('bbbbbbb');
    const newPlayer: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      x: 0,
      y: 50,
    };
    console.log('vvvvvvv');
    await playerRepository.save(newPlayer);
    console.log('cccccc');
    return newPlayer.userId;
  },
};

export const getCount = {
  get_count: async (userId: string) => {
    console.log('get_countの', userId);
    const xValue = 0;
    const yValue = 0;
    return [xValue, yValue];
  },
};

export const useCase = {
  push: async (wor: number, userId: string) => {
    console.log('pushの', userId);
    return wor;
  },
  create: async () => {
    console.log('aaaaaaa');
    return playerUseCase.createNewPlayer();
  },
};
