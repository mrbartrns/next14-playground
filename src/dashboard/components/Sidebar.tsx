import classNames from 'classnames';

const Sidebar = () => {
  return (
    <div
      className={classNames(
        'absolute',
        'top-0',
        'right-0',
        'w-[400px]',
        'shrink-0',
        'min-h-[1200px]',
        'bg-blue-50'
      )}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
