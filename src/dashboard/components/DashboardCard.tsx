import classNames from 'classnames';
import styled from 'styled-components';
import DashCardActionsPanel from './DashCardActionsPanel';
import ChartWrapper from './charts/ChartWrapper';
import { GRID_CARD_BORDER_RADIUS } from '../constants';
import type { ChartData } from '~t/chart';

interface Props {
  isEditMode: boolean;
  chartData: ChartData;
  onRemove?: () => void;
}

const DashboardCard = ({ isEditMode, chartData, onRemove }: Props) => {
  return (
    <Container className={classNames('dashcard')}>
      {isEditMode && (
        <DashCardActionsPanel dashcard={chartData} onRemove={onRemove} />
      )}
      <ChartWrapper
        borderRadius={GRID_CARD_BORDER_RADIUS}
        chartId={chartData.type}
        isEditing={isEditMode}
      />
    </Container>
  );
};

export default DashboardCard;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: ${GRID_CARD_BORDER_RADIUS}px;
`;
