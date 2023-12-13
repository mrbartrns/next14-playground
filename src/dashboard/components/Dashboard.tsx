import { useState, useCallback } from 'react';
import classNames from 'classnames';
import DashboardGrid from './DashboardGrid';
import Sidebar from './Sidebar';
import type ReactGridLayout from 'react-grid-layout';

interface Props {
  layout: ReactGridLayout.Layout[];
  onLayoutChange?: (newLayout: ReactGridLayout.Layout[]) => void;
  onDiscardChanges?: () => void;
  onSaveChanges?: () => void;
}

const Dashboard = ({
  layout,
  onLayoutChange,
  onDiscardChanges,
  onSaveChanges,
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
      <div className={classNames('w-full', 'mr-[400px]')}>
        <div
          className={classNames('flex', 'justify-between', 'bg-white', 'p-2')}
        >
          <button
            type="button"
            className={classNames(
              'border',
              'rounded-md',
              {
                [classNames('bg-emerald-100', 'hover:bg-emerald-200')]:
                  isEditMode,
                [classNames('bg-red-100', 'hover:bg-red-200')]: !isEditMode,
              },
              'whitespace-nowrap',
              'overflow-x-hidden',
              'text-ellipsis',
              'p-2'
            )}
            onClick={toggleEditMode}
          >
            EditMode: {isEditMode ? 'true' : 'false'}
          </button>
          <div className={classNames('flex', 'gap-4')}>
            <button
              disabled={!isEditMode}
              type="button"
              className={classNames(
                'border',
                'rounded-md',
                'p-2',
                'text-white',
                'bg-[#ff4444]',
                'hover:bg-[#cc0000]',
                'disabled:text-neutral-500',
                'disabled:bg-white',
                'disabled:hover:bg-white',
                'disabled:cursor-default',
                'whitespace-nowrap',
                'overflow-x-hidden',
                'text-ellipsis',
                'w-20',
                'transition-colors'
              )}
              onClick={isEditMode ? discardChanges : undefined}
            >
              discard
            </button>
            <button
              disabled={!isEditMode}
              type="button"
              className={classNames(
                'border',
                'rounded-md',
                'p-2',
                'text-white',
                'bg-[#00c851]',
                'hover:bg-[#007e33]',
                'disabled:bg-white',
                'disabled:hover:bg-white',
                'disabled:text-neutral-500',
                'disabled:cursor-default',
                'whitespace-nowrap',
                'overflow-x-hidden',
                'text-ellipsis',
                'w-20',
                'transition-colors'
              )}
              onClick={isEditMode ? saveChanges : undefined}
            >
              save
            </button>
          </div>
        </div>
        <div className={classNames('mx-auto', 'ml-4', 'mt-2', 'mr-4')}>
          <DashboardGrid
            isEditMode={isEditMode}
            layoutData={layout}
            onLayoutChange={onLayoutChange}
          />
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
