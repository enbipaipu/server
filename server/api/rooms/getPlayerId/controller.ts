import { useCase } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const { userId } = body;
    const result = await useCase.create(userId);
    return { status: 200, body: result };
  },
}));
