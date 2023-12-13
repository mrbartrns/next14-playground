import { Card, Strong, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import type ReactGridLayout from 'react-grid-layout';
import styled from 'styled-components';
import type { ChartData } from '~t/chart';

interface Props {
  layout: ReactGridLayout.Layout[];
  chartData: Record<string, ChartData>;
}

// 데이터를 사용자가 만든 차트 종류를 가져와야 함
// 차트에 표현되는 데이터 테이블 종류와 관계 없이 불러올 수 있어야 함
const Sidebar = ({ chartData, layout }: Props) => {
  return (
    <Container>
      <h2 className={classNames('font-bold', 'text-xl')}>요소 추가하기</h2>
      <div className={classNames('mt-4')}>
        <Card className={classNames('sidebar-card')}>
          <Text as="div" className={classNames('text-md')}>
            <Strong>샘플 요소 1</Strong>
          </Text>
          <div className={classNames('mt-2')} />
        </Card>
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
      cursor: pointer;
      transition-property: color, background-color, border-color,
        text-decoration-color, fill, stroke;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;

      &:first-of-type {
        margin-top: 0;
      }

      &:hover {
        background-color: var(--gray-2);
      }
    }
  }
`;
