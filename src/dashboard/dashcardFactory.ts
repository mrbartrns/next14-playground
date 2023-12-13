// 클라이언트에서 사용할 layout card factory
import { nanoid } from 'nanoid';
import type ReactGridLayout from 'react-grid-layout';

export const dashcardFactory = (
  item: Pick<ReactGridLayout.Layout, 'w' | 'h' | 'x' | 'y'>
): ReactGridLayout.Layout => {
  const id = nanoid();

  return {
    i: id,
    ...item,
  };
};
