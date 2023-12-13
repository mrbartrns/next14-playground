import { Card, Strong, Text } from '@radix-ui/themes';
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
        'bg-white',
        'border-l',
        'border-[var(--gray-4)]',
        'p-4'
      )}
    >
      <h2 className={classNames('font-bold', 'text-xl')}>요소 추가하기</h2>
      <div className={classNames('mt-4')}>
        <Card
          className={classNames(
            'cursor-pointer',
            'hover:bg-[var(--gray-2)]',
            'transition-colors'
          )}
        >
          <Text as="div" className={classNames('text-md')}>
            <Strong>샘플 요소 1</Strong>
          </Text>
          <div className={classNames('mt-2')} />
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
