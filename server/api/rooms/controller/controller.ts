import { useCase } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    const { body: bodyValue, body2: body2Value } = body;
    return { status: 200, body: await useCase.push(bodyValue, body2Value) };
  },
}));
