import { Card, Text, Strong } from '@radix-ui/themes';
import classNames from 'classnames';

interface Props {
  title: string;
  dataset: string;
  chartType: 'bar' | 'dounut' | 'barGroup';
  isAdded?: boolean;
  onClick?: () => void;
}

const noop = () => {};

const SidebarCard = ({
  title,
  dataset,
  chartType,
  isAdded = false,
  onClick,
}: Props) => {
  return (
    <Card
      className={classNames('sidebar-card', {
        'sidebar-card__default': !isAdded,
        'sidebar-card__added': isAdded,
      })}
      onClick={isAdded ? noop : onClick}
    >
      <div className={classNames('flex', 'justify-between', 'items-center')}>
        <Text as="div" className={classNames('title')}>
          <Strong>{title}</Strong>
        </Text>
        <div className={classNames('added-indicator', { invisible: !isAdded })}>
          Added
        </div>
      </div>

      <div className={classNames('mt-2', 'card-body')}>
        <div className={classNames('flex', 'justify-between')}>
          <Text as="div" className={classNames('card-body__left')}>
            Dataset
          </Text>
          <Text as="div" className={classNames('card-body__right')}>
            {dataset}
          </Text>
        </div>
        <div className={classNames('flex', 'justify-between')}>
          <Text as="div" className={classNames('card-body__left')}>
            Type
          </Text>
          <Text as="div" className={classNames('card-body__right')}>
            {chartType}
          </Text>
        </div>
      </div>
    </Card>
  );
};

export default SidebarCard;
