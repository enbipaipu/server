import { count, useCase } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: () => ({
    status: 200,
    body: count,
  }),
  post: async ({ body }) => {
    return { status: 200, body: await useCase.push(body) };
  },
}));
