'use client';
import { useMemo } from 'react';
import mockData from '~/__mocks__/layout.mock';
import storage from '~/lib/storage';
import { DASHBOARD_LAYOUT_STORAGE_KEY } from '../constants';
import Grid from './Grid';
import type { Card } from '~t/layout';

function isValidLayoutData(data: any): data is Card[] {
  if (!data) return false;

  if (!Array.isArray(data)) return false;

  return data.every((d) => {
    if (
      typeof d.id === 'undefined' ||
      typeof d.type === 'undefined' ||
      typeof d.meta === 'undefined'
    )
      return false;

    if (
      typeof d.meta.width !== 'number' ||
      typeof d.meta.height !== 'number' ||
      typeof d.meta.startY !== 'number' ||
      typeof d.meta.startX !== 'number'
    )
      return false;

    return true;
  });
}

const GridDataFetcher = () => {
  const layoutData: Card[] = useMemo(() => {
    if (typeof window === 'undefined') return [];
    const _layoutData = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);

    if (isValidLayoutData(_layoutData)) return _layoutData;

    return mockData;
  }, []);
  return <Grid layoutData={layoutData} />;
};

export default GridDataFetcher;
