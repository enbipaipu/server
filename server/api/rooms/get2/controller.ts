import { getCount } from '$/usecase/usecase';
import { defineController } from './$relay';

export default defineController(() => ({
  post: async ({ body }) => {
    return { status: 200, body: await getCount.get_count(body.userId) };
  },
}));
