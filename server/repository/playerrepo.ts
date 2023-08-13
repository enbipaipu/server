import type { PlayerModel } from '$/commonTypesWithClient/models';
import { UserIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Player } from '@prisma/client';

const toModel = (prismaPlayer: Player): PlayerModel => ({
  userId: UserIdParser.parse(prismaPlayer.userId),
  x: prismaPlayer.x,
});

export const playerRepository = {
  save: async (player: PlayerModel): Promise<void> => {
    try {
      await prismaClient.player.upsert({
        where: { userId: player.userId },
        update: {
          x: player.x,
        },
        create: {
          userId: player.userId,
          x: player.x,
        },
      });
    } catch (error) {
      console.error('Player save error:', error);
      throw error;
    }
  },
  read: async (userId: string): Promise<PlayerModel> => {
    const player = await prismaClient.player.findFirst({
      where: { userId },
    });
    if (!player) throw new Error("Player doesn't exist");
    return toModel(player);
  },
  delete: async (userId: string): Promise<void> => {
    await prismaClient.player.delete({
      where: { userId },
    });
  },
};
