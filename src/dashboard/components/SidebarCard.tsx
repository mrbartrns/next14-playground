import { Card, Text, Strong } from '@radix-ui/themes';
import classNames from 'classnames';

interface Props {
  title: string;
  dataset: string;
  chartType: 'bar' | 'dounut' | 'barGroup';
  isAdded?: boolean;
  onClick?: () => void;
}

const SidebarCard = ({
  title,
  dataset,
  chartType,
  isAdded = false,
  onClick,
}: Props) => {
  return (
    <Card className={classNames('sidebar-card')} onClick={onClick}>
      <div className={classNames('flex', 'justify-between')}>
        <Text as="div" className={classNames('text-md')}>
          <Strong>{title}</Strong>
        </Text>
        <div>{isAdded ? 'added' : ''}</div>
      </div>

      <div className={classNames('mt-2')}>
        <div className={classNames('flex', 'justify-between')}>
          <Text as="div">dataset</Text>
          <Text as="div">{dataset}</Text>
        </div>
        <div className={classNames('flex', 'justify-between')}>
          <Text as="div">type</Text>
          <Text as="div">{chartType}</Text>
        </div>
      </div>
    </Card>
  );
};

export default SidebarCard;
