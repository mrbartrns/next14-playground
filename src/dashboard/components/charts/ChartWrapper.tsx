import { ParentSize } from '@visx/responsive';
import classNames from 'classnames';
import ChartComponent from './ChartComponent';

interface Props {
  borderRadius?: number;
  chartId: string;
  isEditing: boolean;
}

const ChartWrapper = ({ chartId, isEditing, borderRadius }: Props) => {
  return (
    <ParentSize>
      {({ width, height }) => {
        return (
          <div
            className={classNames(
              { 'pointer-events-none': isEditing },
              'overflow-hidden'
            )}
          >
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
  );
};

export default ChartWrapper;
