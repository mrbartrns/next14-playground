import type { ChartData } from '~t/chart';

const mockData: Record<string, ChartData> = {
  '1': {
    id: '1',
    displayName: '차트 1',
    type: 'bar',
    dataset: 'table1',
  },
  '2': {
    id: '2',
    displayName: '차트 2',
    type: 'barGroup',
    dataset: 'table2',
  },
  '3': {
    id: '3',
    displayName: '차트 3',
    type: 'dounut',
    dataset: 'table3',
  },
  '4': {
    id: '4',
    displayName: '차트 4',
    type: 'bar',
    dataset: 'table1',
  },
  '5': {
    id: '5',
    displayName: '차트 5',
    type: 'barGroup',
    dataset: 'table2',
  },
  '6': {
    id: '6',
    displayName: '차트 6',
    type: 'dounut',
    dataset: 'table3',
  },
};

export default mockData;
