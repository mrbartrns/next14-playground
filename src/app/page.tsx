import classNames from 'classnames';
import DashboardBuilder from '~/dashboard/components/DashboardBuilder';

const Page = () => {
  return (
    <div className={classNames('bg-[var(--gray-2)]', 'min-h-[1200px]')}>
      <DashboardBuilder />
    </div>
  );
};

export default Page;
