import type { LayoutData } from '~t/layout';

// width, height, startY, startX의 범위는 0부터 12까지
const mockData: LayoutData = {
  '1': {
    id: '1',
    type: '1',
    meta: {
      width: 3,
      height: 2,
      startY: 0,
      startX: 0,
    },
  },
  '2': {
    id: '2',
    type: '2',
    meta: {
      width: 3,
      height: 2,
      startY: 2,
      startX: 0,
    },
  },
  '3': {
    id: '3',
    type: '3',
    meta: {
      width: 3,
      height: 2,
      startY: 4,
      startX: 0,
    },
  },
};

export default mockData;
