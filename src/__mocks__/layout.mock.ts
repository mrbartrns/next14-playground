import type { Card } from '~t/layout';

// width, height, startY, startX의 범위는 0부터 12까지
const mockData: Card[] = [
  {
    id: '1',
    meta: {
      width: 3,
      height: 2,
      startY: 0,
      startX: 0,
    },
  },
  {
    id: '2',
    meta: {
      width: 3,
      height: 2,
      startY: 2,
      startX: 0,
    },
  },
  {
    id: '3',
    meta: {
      width: 3,
      height: 2,
      startY: 4,
      startX: 0,
    },
  },
];

export default mockData;
