import classNames from 'classnames';
import DashboardDataFetcher from '~/dashboard/components/DashboardDataFetcher';

const Page = () => {
  return (
    <div className={classNames('bg-[var(--gray-2)]', 'min-h-[1200px]')}>
      <DashboardDataFetcher />
    </div>
  );
};

export default Page;
