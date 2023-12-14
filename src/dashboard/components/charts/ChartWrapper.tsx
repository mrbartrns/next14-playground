import { ParentSize } from '@visx/responsive';
import classNames from 'classnames';
import ChartComponent from './ChartComponent';
import { styled } from 'styled-components';
import { GRID_CARD_BORDER_RADIUS } from '~/dashboard/constants';

interface Props {
  borderRadius?: number;
  chartId: string;
  isEditing: boolean;
}

const ChartWrapper = ({ chartId, isEditing, borderRadius }: Props) => {
  return (
    <Container>
      <ParentSize>
        {({ width, height }) => {
          return (
            <div className={classNames({ 'pointer-events-none': isEditing })}>
              <ChartComponent
                borderRadius={borderRadius}
                height={height}
                id={chartId}
                width={width}
              />
            </div>
          );
        }}
      </ParentSize>
    </Container>
  );
};

export default ChartWrapper;

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: ${GRID_CARD_BORDER_RADIUS}px;
`;
