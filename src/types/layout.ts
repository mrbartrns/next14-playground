export type LayoutData = Record<string, Card>;

export interface Card {
  id: string; // chart data와는 다른 id값으로 클라이언트에서 만들어진 값을 사용한다
  sliceId: string; // 실제 chart 객체의 id
  meta: CardMeta;
}

export interface CardMeta {
  width: number;
  height: number;
  startY: number;
  startX: number;
}
