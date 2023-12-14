// 클라이언트에서 사용할 layout card factory
import { nanoid } from 'nanoid';
import type { Card } from '~t/layout';

type Options = Pick<Card, 'sliceId'> & Partial<Pick<Card, 'meta'>>;

export const dashboardCardFactory = (options: Options): Card => {
  const id = nanoid();

  return {
    id,
    sliceId: options.sliceId,
    meta: options.meta
      ? { ...options.meta }
      : {
          startX: 0,
          startY: Infinity,
          width: 2,
          height: 2,
        },
  };
};
