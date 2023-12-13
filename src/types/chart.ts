export interface ChartData {
  id: string;
  displayName: string;
  type: 'bar' | 'dounut' | 'barGroup';
  dataset: string;
}

export type Dashboard = {
  id: string;
  displayName: string;
  charts: Record<string, ChartData>;
  layout?: string; // TODO - will be stringified json, change it to reqired field
};
