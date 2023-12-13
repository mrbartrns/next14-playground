'use client';
import { useMemo } from 'react';
import { ParentSize } from '@visx/responsive';
import classNames from 'classnames';
import GridLayout from 'react-grid-layout';
import { styled } from 'styled-components';
import { DASHABORD_GRID_COLUMN, GRID_CARD_BORDER_RADIUS } from '../constants';
import ChartWrapper from './charts/ChartWrapper';

interface Props {
  layoutData: GridLayout.Layout[];
  isEditMode: boolean;
  onLayoutChange?: (newLayout: GridLayout.Layout[]) => void;
}

const DashboardGrid = ({
  layoutData: layout,
  isEditMode,
  onLayoutChange,
}: Props) => {
  // prevent performance issue
  // 여기에 type에 대한 정보도 우선 넣기,, 임시
  const children = useMemo(
    () =>
      layout?.map((layoutItem) => (
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
                onLayoutChange={onLayoutChange}
              >
                {children}
              </GridLayout>
            );
          }}
        </ParentSize>
      </Container>
    </div>
  );
};

export default DashboardGrid;

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
