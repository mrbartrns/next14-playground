'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { produce } from 'immer';
import mockData from '~/__mocks__/layout.mock';
import { objectEntries } from '~/lib/object';
import storage from '~/lib/storage';
import { DASHBOARD_LAYOUT_STORAGE_KEY } from '../constants';
import Grid from './Grid';
import type ReactGridLayout from 'react-grid-layout';
import type { LayoutData } from '~t/layout';

function isValidLayoutData(data: any): data is LayoutData {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  try {
    const _data = objectEntries(data).map(([, value]) => value);

    return _data.every((d) => {
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
  } catch {
    return false;
  }
}

const GridDataFetcher = () => {
  const [layoutData, setLayoutData] = useState<LayoutData>({});

  const layout: ReactGridLayout.Layout[] = useMemo(() => {
    return objectEntries(layoutData).map(([, value]) => ({
      i: value.id,
      x: value.meta.startX,
      y: value.meta.startY,
      w: value.meta.width,
      h: value.meta.height,
    }));
  }, [layoutData]);

  const initialize = useCallback(() => {
    const _layoutData = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);
    if (isValidLayoutData(_layoutData)) {
      setLayoutData(_layoutData);
      return;
    }

    setLayoutData(mockData);
  }, []);

  const handleDiscardChanges = useCallback(() => {
    if (confirm('discard changes?')) {
      const previousValue = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);

      if (isValidLayoutData(previousValue)) {
        setLayoutData(previousValue);
        return;
      }

      setLayoutData(mockData);
    }
  }, []);

  const handleSaveChanges = useCallback(() => {
    storage.setItem(DASHBOARD_LAYOUT_STORAGE_KEY, layoutData);
  }, [layoutData]);

  const handleLayoutChange = useCallback(
    (newLayout: ReactGridLayout.Layout[]) => {
      setLayoutData(
        produce((draft) => {
          newLayout.forEach((layoutItem) => {
            draft[layoutItem.i].meta = {
              width: layoutItem.w,
              height: layoutItem.h,
              startY: layoutItem.y,
              startX: layoutItem.x,
            };
          });
        })
      );
    },
    []
  );

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    console.log(layout);
  }, [layout]);

  return (
    <Grid
      layoutData={layout}
      onDiscardChanges={handleDiscardChanges}
      onLayoutChange={handleLayoutChange}
      onSaveChanges={handleSaveChanges}
    />
  );
};

export default GridDataFetcher;
