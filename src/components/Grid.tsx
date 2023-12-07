'use client';
import { useState } from 'react';
import classNames from 'classnames';
import GridLayoutContainer, { WidthProvider } from 'react-grid-layout';
import { styled } from 'styled-components';

const _layout: ReactGridLayout.Layout[] = [
  { i: 'a', x: 0, y: 0, w: 1, h: 2 },
  { i: 'b', x: 1, y: 0, w: 3, h: 2 },
  { i: 'c', x: 4, y: 0, w: 1, h: 2 },
];

// 부모 넓이에 맞게 처리하기 위해서는 WidthProvider로 감싸야 함
const GridLayout = WidthProvider(GridLayoutContainer);

// TODO - button을 추가하여 editMode에 따른 설정 추가하기
const Layout = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [handlerId, setHandlerId] = useState<string | undefined>(undefined);
  const [layout, setLayout] = useState(_layout);

  const handleDragStart = (id: string) => {
    setHandlerId(id);
  };

  const handleDragStop = () => {
    setHandlerId(undefined);
  };

  const handleLayoutChange = (newLayout: ReactGridLayout.Layout[]) => {
    setLayout(newLayout);
  };

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className={classNames('max-w-4xl', 'mx-auto')}>
      <button type="button" onClick={toggleEditMode}>
        EditMode: {isEditMode ? 'true' : 'false'}
      </button>
      <Container>
        <GridLayout
          className="layout"
          cols={12}
          isDraggable={isEditMode}
          isResizable={isEditMode}
          layout={layout}
          width={1200}
          onDragStop={handleDragStop}
          onLayoutChange={handleLayoutChange}
          onResizeStop={handleDragStop}
          onDrag={(_, oldItem) => {
            handleDragStart(oldItem.i);
          }}
          onResizeStart={(_, oldItem) => {
            handleDragStart(oldItem.i);
          }}
        >
          {layout.map((layoutItem) => (
            <div key={layoutItem.i} className={classNames('card')} />
          ))}
        </GridLayout>
      </Container>
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
      border-radius: 8px;
      z-index: 1;
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
      width: 10px;
      height: 10px;
      border-right: 2px solid rgba(0, 0, 0, 0.12);
      border-bottom: 2px solid rgba(0, 0, 0, 0.12);
      border-bottom-right-radius: 2px;
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
