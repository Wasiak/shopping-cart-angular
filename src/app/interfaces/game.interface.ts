export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  thumb: string;
  basePrice: number;
  discountInPercent: number;
  currentPrice: number;
}

export interface HomeGame extends Game {
  inCart?: boolean;
  owned?: boolean;
}
