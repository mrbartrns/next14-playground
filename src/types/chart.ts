// NOTE - 변경될 여지 있음

export interface ChartData {
  id: string;
  displayName: string;
  type: 'bar' | 'dounut' | 'barGroup';
  dataset: string;
}

export type Dashboard = {
  id: string;
  displayName: string;
  charts: Record<string, ChartData>; // 실제로 참고할 때는 charts가 아닌 layout의 데이터를 참고해야 함
  layout?: string; // TODO - will be stringified json, change it to reqired field
};
