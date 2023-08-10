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
      y: 40,
    };
    console.log('vvvvvvv');
    await playerRepository.save(newPlayer);
    console.log('cccccc');
    return newPlayer.userId;
  },
  getCount: async (userId: string) => {
    console.log('zzzzzz');
    return await playerRepository.read(userId);
  },
};

export const getCount = {
  get_count: async (userId: string) => {
    console.log('get_countの', userId);
    const result = playerUseCase.getCount(userId);
    const xValue = (await result).x;
    const yValue = (await result).y;
    console.log('xxxxxx');

    return [xValue, yValue];
  },
};

export const useCase = {
  push: async (userId: string) => {
    console.log('pushの', userId);
    return 'pushの入力に成功しました';
  },
  create: async () => {
    console.log('aaaaaaa');
    return playerUseCase.createNewPlayer();
  },
};
