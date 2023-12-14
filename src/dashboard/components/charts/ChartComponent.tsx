import classNames from 'classnames';
import BarChart from './BarChart';
import BarGroupChart from './BarGroupChart';
import PieChart from './PieChart';

interface Props {
  id: string;
  width: number;
  height: number;
  borderRadius?: number;
}

const componentLookup: Record<string, (...args: any[]) => JSX.Element | null> =
  {
    bar: BarChart,
    barGroup: BarGroupChart,
    dounut: PieChart,
  };

const ChartComponent = ({ id, ...rest }: Props) => {
  const MockChart = componentLookup[id] || null;
  return MockChart ? (
    <div className={classNames('overflow-hidden')}>
      <MockChart {...rest} />
    </div>
  ) : null;
};

export default ChartComponent;
