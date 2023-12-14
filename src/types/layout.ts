export type LayoutData = Record<string, Card>;

export interface Card {
  id: string;
  meta: CardMeta;
}

export interface CardMeta {
  width: number;
  height: number;
  startY: number;
  startX: number;
}
