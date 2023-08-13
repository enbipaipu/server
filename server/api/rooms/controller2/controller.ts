import { useCase } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return { status: 200, body: await useCase.push(body.userId) };
  },
}));
