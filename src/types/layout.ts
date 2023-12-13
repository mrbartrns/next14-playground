export interface Card {
  id: string;
  type: string;
  meta: CardMeta;
}

export interface CardMeta {
  width: number;
  height: number;
  startY: number;
  startX: number;
}

export interface ChartData {
  id: string;
  type: 'bar' | 'dounut';
}
