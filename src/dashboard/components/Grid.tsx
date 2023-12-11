'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ParentSize } from '@visx/responsive';
import classNames from 'classnames';
import GridLayout from 'react-grid-layout';
import { styled } from 'styled-components';
import mockData from '~/__mocks__/layout.mock';
import storage from '~/lib/storage';
import {
  DASHABORD_GRID_COLUMN,
  DASHBOARD_LAYOUT_STORAGE_KEY,
  GRID_CARD_BORDER_RADIUS,
} from '../constants';
import ChartWrapper from './charts/ChartWrapper';

function isValidLayoutType(stored: any) {
  if (!stored) {
    return false;
  }

  if (!Array.isArray(stored)) {
    return false;
  }

  if (
    Array.isArray(stored) &&
    stored.every(
      (item) =>
        typeof item.x === 'number' &&
        typeof item.y === 'number' &&
        typeof item.i !== 'undefined' &&
        typeof item.w === 'number' &&
        typeof item.h === 'number'
    )
  ) {
    return true;
  }
  return false;
}

const _layout: ReactGridLayout.Layout[] = mockData.map((data) => {
  return {
    i: data.id,
    x: data.meta.startX,
    y: data.meta.startY,
    w: data.meta.width,
    h: data.meta.height,
  };
});

// 부모 넓이에 맞게 처리하기 위해서는 WidthProvider로 감싸야 함
// const GridLayout = WidthProvider(GridLayoutContainer);

// TODO - button을 추가하여 editMode에 따른 설정 추가하기
const Layout = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [layout, setLayout] = useState<ReactGridLayout.Layout[]>([]);

  const discardChanges = useCallback(() => {
    if (confirm('discard changes?')) {
      const previousValue = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);

      if (isValidLayoutType(previousValue)) {
        setLayout(previousValue);
        return;
      }

      setLayout(_layout);
    }
  }, []);

  const saveChanges = useCallback(() => {
    storage.setItem(DASHBOARD_LAYOUT_STORAGE_KEY, layout);
    setIsEditMode(false);
  }, [layout]);

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    setLayout(newLayout);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const initialLize = useCallback(() => {
    const stored = storage.getItem(DASHBOARD_LAYOUT_STORAGE_KEY);

    if (isValidLayoutType(stored)) {
      setLayout(stored);
      return;
    }

    setLayout(_layout);
  }, []);

  useEffect(() => {
    // layout shift를 방지하기 위해 useEffect 내에서 초기화를 진행한다.
    initialLize();
  }, [initialLize]);

  // prevent performance issue
  const children = useMemo(
    () =>
      layout.map((layoutItem) => (
        <div key={layoutItem.i} className={classNames('card')}>
          <ChartWrapper
            borderRadius={GRID_CARD_BORDER_RADIUS}
            chartId={layoutItem.i}
            isEditing={isEditMode}
          />
        </div>
      )),
    [isEditMode, layout]
  );

  return (
    <div className={classNames('max-w-4xl', 'mx-auto')}>
      <div className={classNames('flex', 'justify-between')}>
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
      <div className={classNames('mt-4')}>
        <Container>
          <ParentSize debounceTime={100}>
            {({ width }) => {
              return width === 0 ? null : (
                <GridLayout
                  className="layout"
                  cols={DASHABORD_GRID_COLUMN}
                  containerPadding={[0, 0]}
                  isDraggable={isEditMode}
                  isResizable={isEditMode}
                  layout={layout}
                  margin={[10, 10]}
                  width={width}
                  onLayoutChange={handleLayoutChange}
                >
                  {children}
                </GridLayout>
              );
            }}
          </ParentSize>
        </Container>
      </div>
    </div>
  );
};

export default Layout;

const Container = styled.div`
  & {
    .react-grid-layout {
      position: relative;
      transition: height 200ms ease;
    }

    .card {
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      box-shadow: rgba(0, 0, 0, 0.13) 0px 1px 3px;
      border-radius: ${GRID_CARD_BORDER_RADIUS}px;
      z-index: 1;
      overflow: hidden;
    }

    .react-grid-item {
      transition: all 200ms ease;
      transition-property: left, top, width, height;

      img {
        pointer-events: none;
        user-select: none;
      }

      &.react-draggable.card {
        cursor: move;
      }

      &.cssTransforms {
        transition-property: transform, width, height;
      }

      &.resizing {
        transition: none;
        z-index: 1;
        will-change: width, height;
      }

      &.react-draggable-dragging {
        transition: none;
        z-index: 3;
        will-change: transform;

        &.card {
          background-color: #edf2f5;
          border: 1px solid #509ee3;
        }
      }

      &.dropping {
        visibility: hidden;
      }

      &.react-grid-placeholder {
        z-index: 2;
        background-color: #509ee3;
        opacity: 0.2;
        transition-duration: 100ms;
        z-index: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
        border-radius: 8px;
      }

      &.react-grid-placeholder.placeholder-resizing {
        transition: none;
      }
    }

    .react-resizable-hide > .react-resizable-handle {
      display: none;
    }

    .react-grid-item > .react-resizable-handle {
      position: absolute;
      width: 40px;
      height: 40px;
    }

    .react-grid-item > .react-resizable-handle::after {
      content: '';
      position: absolute;
      right: 6px;
      bottom: 6px;
      width: 14px;
      height: 14px;
      border-right: 3px solid rgba(225, 225, 225, 0.6);
      border-bottom: 3px solid rgba(225, 225, 225, 0.6);
      border-bottom-right-radius: 4px;
      opacity: 0;
      transition: opacity 0.2s;
    }

    .react-grid-item:hover > .react-resizable-handle::after {
      opacity: 1;
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-sw {
      bottom: 0;
      left: 0;
      cursor: sw-resize;
      transform: rotate(90deg);
    }
    .react-grid-item > .react-resizable-handle.react-resizable-handle-se {
      bottom: 0;
      right: 0;
      cursor: se-resize;
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-nw {
      top: 0;
      left: 0;
      cursor: nw-resize;
      transform: rotate(180deg);
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-ne {
      top: 0;
      right: 0;
      cursor: ne-resize;
      transform: rotate(270deg);
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-w,
    .react-grid-item > .react-resizable-handle.react-resizable-handle-e {
      top: 50%;
      margin-top: -10px;
      cursor: ew-resize;
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-w {
      left: 0;
      transform: rotate(135deg);
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-e {
      right: 0;
      transform: rotate(315deg);
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-n,
    .react-grid-item > .react-resizable-handle.react-resizable-handle-s {
      left: 50%;
      margin-left: -10px;
      cursor: ns-resize;
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-n {
      top: 0;
      transform: rotate(225deg);
    }

    .react-grid-item > .react-resizable-handle.react-resizable-handle-s {
      bottom: 0;
      transform: rotate(45deg);
    }
  }
`;