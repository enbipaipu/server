import type { PlayerModel } from '$/commonTypesWithClient/models';
import { playerRepository } from '$/repository/playerrepo';
import { UserIdParser } from '$/service/idParsers';
import { randomUUID } from 'crypto';

export const playerUseCase = {
  createNewPlayer: async () => {
    const newPlayer: PlayerModel = {
      userId: UserIdParser.parse(randomUUID()),
      x: 0,
    };
    await playerRepository.save(newPlayer);
    return newPlayer.userId;
  },
  getCount: async (userId: string) => {
    return await playerRepository.read(userId);
  },
  changeCount: async (userId: string) => {
    const rePlayer = await playerRepository.read(userId);
    const newPlayer: PlayerModel = {
      userId: rePlayer.userId,
      x: (rePlayer.x += 1),
    };
    await playerRepository.save(newPlayer);
  },
};

export const getCount = {
  get_count: async (userId: string) => {
    console.log('get_countの', userId);
    const result = playerUseCase.getCount(userId);
    const xValue = (await result).x;

    return xValue;
  },
};

export const useCase = {
  push: async (userId: string) => {
    console.log('pushの', userId);
    playerUseCase.changeCount(userId);
    return 'pushの入力に成功しました';
  },
  create: async () => {
    console.log('aaaaaaa');
    return playerUseCase.createNewPlayer();
  },
};
