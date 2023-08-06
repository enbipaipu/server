import type { CountModel } from '$/commonTypesWithClient/models';
import { userIdParser } from '$/service/idParsers';
import { prismaClient } from '$/service/prismaClient';
import type { Count } from '@prisma/client';

const toModel = (prismaCount: Count): CountModel => ({
  userId: userIdParser.parse(prismaCount.userId),
  x: prismaCount.x,
  y: prismaCount.y,
});

export const CountRepository = {
  save: async (count: CountModel): Promise<void> => {
    await prismaClient.count.upsert({
      where: { userId: count.userId },
      update: {
        x: count.x,
        y: count.y,
      },
      create: {
        userId: count.userId,
        x: count.x,
        y: count.y,
      },
    });
  },
  read: async (userId: string): Promise<CountModel> => {
    const count = await prismaClient.count.findFirst({
      where: { userId },
    });
    if (!count) throw new Error("count doesn't exist");
    return toModel(count);
  },
};
