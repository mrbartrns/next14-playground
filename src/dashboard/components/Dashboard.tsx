import { useState, useCallback } from 'react';
import classNames from 'classnames';
import DashboardGrid from './DashboardGrid';
import Sidebar from './Sidebar';
import type ReactGridLayout from 'react-grid-layout';
import type { ChartData } from '~t/chart';
import type { LayoutData } from '~t/layout';

interface Props {
  layout: LayoutData;
  chartData: Record<string, ChartData>;
  onLayoutChange?: (newLayout: ReactGridLayout.Layout[]) => void;
  onDiscardChanges?: () => void;
  onSaveChanges?: () => void;
  onAddItem?: (chartId: string) => void;
  onRemove?: (chartId: string) => void;
}

const Dashboard = ({
  layout,
  chartData,
  onLayoutChange,
  onDiscardChanges,
  onSaveChanges,
  onAddItem,
  onRemove,
}: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const discardChanges = useCallback(() => {
    onDiscardChanges?.();
  }, [onDiscardChanges]);

  const saveChanges = useCallback(() => {
    setIsEditMode(false);
    onSaveChanges?.();
  }, [onSaveChanges]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className={classNames('flex', 'relative', 'w-full')}>
      <div className={classNames('w-full', { 'mr-[25rem]': isEditMode })}>
        <div className={classNames('flex', 'justify-end', 'bg-white', 'p-2')}>
          {!isEditMode ? (
            <button
              type="button"
              className={classNames(
                'rounded-md',
                'text-sm',
                'font-[600]',
                'text-[var(--blue-11)]',
                'bg-[var(--blue-4)]',
                'hover:text-[var(--blue-12)]',
                'hover:bg-[var(--blue-6)]',
                'whitespace-nowrap',
                'overflow-x-hidden',
                'text-ellipsis',
                'p-2',
                'uppercase',
                'transition-colors'
              )}
              onClick={toggleEditMode}
            >
              Edit dashboard
            </button>
          ) : (
            <div className={classNames('flex', 'gap-4')}>
              <button
                disabled={!isEditMode}
                type="button"
                className={classNames(
                  'rounded-md',
                  'font-[600]',
                  'text-sm',
                  'p-2',
                  'shadow-sm',
                  'text-[var(--blue-11)]',
                  'bg-[var(--blue-4)]',
                  'hover:text-[var(--blue-12)]',
                  'hover:bg-[var(--blue-6)]',
                  'disabled:text-neutral-500',
                  'disabled:bg-white',
                  'disabled:hover:bg-white',
                  'disabled:cursor-default',
                  'whitespace-nowrap',
                  'overflow-x-hidden',
                  'text-ellipsis',
                  'w-20',
                  'transition-colors',
                  'uppercase'
                )}
                onClick={isEditMode ? discardChanges : undefined}
              >
                discard
              </button>
              <button
                disabled={!isEditMode}
                type="button"
                className={classNames(
                  'rounded-md',
                  'font-[600]',
                  'text-sm',
                  'p-2',
                  'text-[var(--green-11)]',
                  'hover:text-[var(--green-12)]',
                  'shadow-sm',
                  'bg-[var(--green-4)]',
                  'hover:bg-[var(--green-6)]',
                  'disabled:bg-white',
                  'disabled:hover:bg-white',
                  'disabled:text-neutral-500',
                  'disabled:cursor-default',
                  'whitespace-nowrap',
                  'overflow-x-hidden',
                  'text-ellipsis',
                  'w-20',
                  'transition-colors',
                  'uppercase'
                )}
                onClick={isEditMode ? saveChanges : undefined}
              >
                save
              </button>
            </div>
          )}
        </div>

        <div className={classNames('mx-auto', 'ml-4', 'mt-2', 'mr-4')}>
          <DashboardGrid
            chartData={chartData}
            isEditMode={isEditMode}
            layoutData={layout}
            onLayoutChange={onLayoutChange}
            onRemove={onRemove}
          />
        </div>
      </div>
      {isEditMode && (
        <Sidebar chartData={chartData} layout={layout} onAddItem={onAddItem} />
      )}
    </div>
  );
};

export default Dashboard;
