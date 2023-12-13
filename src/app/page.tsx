import classNames from 'classnames';
import GridDataFetcher from '~/dashboard/components/GridDataFetcher';

const Page = () => {
  return (
    <div className={classNames('max-w-4xl', 'mx-auto', 'mt-2')}>
      <GridDataFetcher />
    </div>
  );
};

export default Page;
