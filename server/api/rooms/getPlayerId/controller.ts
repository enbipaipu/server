import { useCase } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async () => ({ status: 200, body: { userId: await useCase.create() } }),
}));
