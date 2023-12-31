import classNames from 'classnames';
import styled from 'styled-components';
import { objectEntries } from '~/lib/object';
import type { ChartData } from '~t/chart';
import SidebarCard from './SidebarCard';
import type { LayoutData } from '~t/layout';
import { useCallback, useMemo } from 'react';

interface Props {
  layout: LayoutData;
  chartData: Record<string, ChartData>;
  onAddItem?: (chartId: string) => void;
}

// 데이터를 사용자가 만든 차트 종류를 가져와야 함
// 차트에 표현되는 데이터 테이블 종류와 관계 없이 불러올 수 있어야 함
const Sidebar = ({ chartData, layout, onAddItem }: Props) => {
  const layoutArr = useMemo(() => {
    return objectEntries(layout);
  }, [layout]);

  const checkIsAdded = useCallback(
    (sliceId: string) => {
      return !!layoutArr.find(([, value]) => value.sliceId === sliceId);
    },
    [layoutArr]
  );

  return (
    <Container>
      <h2 className={classNames('font-bold', 'text-xl')}>요소 추가하기</h2>
      <div className={classNames('mt-4')}>
        {objectEntries(chartData).map(([sliceId, value]) => {
          return (
            <SidebarCard
              key={sliceId}
              chartType={value.type}
              dataset={value.dataset}
              isAdded={checkIsAdded(sliceId)}
              title={value.displayName}
              onClick={() => {
                onAddItem?.(sliceId);
              }}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Sidebar;

const Container = styled.div`
  flex-shrink: 0;
  position: absolute;
  top: 0;
  right: 0;
  width: 25rem;
  min-height: 1200px;
  padding: 1rem;
  background-color: white;
  border-left: 1px solid #e4e4e4;

  & {
    .sidebar-card {
      margin-top: 16px;
      transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      user-select: none;

      &:first-of-type {
        margin-top: 0;
      }

      .title {
        font-size: 1.15rem;
      }

      .card-body {
        font-size: 0.86rem;

        .card-body__left {
          color: var(--gray-10);
        }

        .card-body__right {
          color: var(--gray-11);
        }
      }

      .added-indicator {
        padding: 0.125rem 0.5rem;
        border-radius: 4px;
        font-size: 0.86rem;
        font-weight: 500;
        background-color: rgb(244, 251, 246);
        color: rgb(33, 131, 88);
        box-shadow: rgb(142, 206, 170) 0px 0px 0px 1px inset;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__default {
        cursor: pointer;
        &:hover {
          background-color: var(--gray-2);
        }
      }

      &__added {
        cursor: default;
        color: var(--gray-9);
      }
    }
  }
`;
