// layout data, chart data는 서버에서 fetch할 예정
'use client';
import { useCallback, useEffect, useState } from 'react';
import { produce } from 'immer';
import mockData from '~/__mocks__/layout.mock';
import chartData from '~/__mocks__/chartData.mock';
import { objectEntries } from '~/lib/object';
import storage from '~/lib/storage';
import { DASHBOARD_LAYOUT_STORAGE_KEY } from '../constants';
import Dashboard from './Dashboard';
import type ReactGridLayout from 'react-grid-layout';
import type { LayoutData } from '~t/layout';
import { dashboardCardFactory } from '../dashcardFactory';

// NOTE - data schema 변경 뒤 해당 함수 로직 변경 확인
function isValidLayoutData(data: any): data is LayoutData {
  if (!data) return false;
  if (typeof data !== 'object') return false;
  try {
    const _data = objectEntries(data).map(([, value]) => value);

    return _data.every((d) => {
      if (typeof d.id === 'undefined' || typeof d.meta === 'undefined')
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

const DashboardBuilder = () => {
  const [layoutData, setLayoutData] = useState<LayoutData>({});

  const initialize = useCallback(() => {
    const _layoutData = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);
    if (isValidLayoutData(_layoutData)) {
      setLayoutData(_layoutData);
    }
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

  const handleAddItem = useCallback((sliceId: string) => {
    setLayoutData(
      produce((draft) => {
        if (draft[sliceId]) return draft;

        const newDashcard = dashboardCardFactory({
          sliceId,
        });

        draft[newDashcard.id] = newDashcard;

        return draft;
      })
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setLayoutData(
      produce((draft) => {
        if (draft[id]) {
          delete draft[id];
        }
      })
    );
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Dashboard
      chartData={chartData}
      layout={layoutData}
      onAddItem={handleAddItem}
      onDiscardChanges={handleDiscardChanges}
      onLayoutChange={handleLayoutChange}
      onRemove={handleRemove}
      onSaveChanges={handleSaveChanges}
    />
  );
};

export default DashboardBuilder;
