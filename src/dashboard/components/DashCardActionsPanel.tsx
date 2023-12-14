import classNames from 'classnames';
import styled from 'styled-components';
import { RxCross2 } from 'react-icons/rx';
import type { ChartData } from '~t/chart';

interface Props {
  dashcard: ChartData;
  onRemove?: () => void;
}

const DashCardActionsPanel = ({ dashcard, onRemove }: Props) => {
  return (
    <Container className={classNames('dashboard-card-actions-panel')}>
      <button
        type="button"
        className={classNames(
          'rounded-full',
          'p-2',
          'border',
          'bg-white',
          'hover:bg-[var(--gray-4)]',
          'transition-colors'
        )}
        onClick={onRemove}
      >
        <RxCross2 />
      </button>
    </Container>
  );
};

export default DashCardActionsPanel;

const Container = styled.div`
  padding: 0 8px;
  line-height: 1;
  position: absolute;
  top: 0;
  left: 50%;
  border-radius: 8px;
  cursor: default;
  z-index: 3;
  /* box-shadow: 0px 1px 3px rgb(0 0 0 / 13%); */
  transform: translate(-50%, -50%);
  /* background-color: white; */
  transition: opacity 200ms;
  opacity: 0;
  pointer-events: none;

  .dashcard:hover &,
  .dashcard:focus-within & {
    opacity: 1;
    pointer-events: all;
  }

  .layout__dragging & {
    display: none;
  }
`;
