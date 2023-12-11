import classNames from 'classnames';
import GridLayout from '~/dashboard/components/Grid';

const Page = () => {
  return (
    <div className={classNames('max-w-4xl', 'mx-auto', 'mt-2')}>
      <GridLayout />
    </div>
  );
};

export default Page;
