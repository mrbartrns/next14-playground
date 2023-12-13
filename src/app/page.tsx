import classNames from 'classnames';
import DashboardDataFetcher from '~/dashboard/components/DashboardDataFetcher';

const Page = () => {
  return (
    <div className={classNames('max-w-4xl', 'mx-auto', 'mt-2')}>
      <DashboardDataFetcher />
    </div>
  );
};

export default Page;
