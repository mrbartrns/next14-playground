import classNames from 'classnames';

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={classNames('max-w-4xl', 'mx-auto', 'mt-2')}>{children}</div>
  );
};

export default Layout;
