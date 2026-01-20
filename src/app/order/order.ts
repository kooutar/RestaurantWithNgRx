export interface Plat {
  id: string;
  img: string;
  name: string;
  dsc: string;
  price: number;
  rate: number;
  country: string;
}
interface Pagination {
  bbqs: number;
  'best-foods': number;
  breads: number;
  burgers: number;
  chocolates: number;
  desserts: number;
  drinks: number;
  'fried-chicken': number;
  'ice-cream': number;
  pizzas: number;
  porks: number;
  sandwiches: number;
  sausages: number;
  steaks: number;
  'our-foods': number;
}
export interface ApiResponse {
  bbqs: Plat[];
  'best-foods': Plat[];
  breads: Plat[];
  burgers: Plat[];
  chocolates: Plat[];
  desserts: Plat[];
  drinks: Plat[];
  'fried-chicken': Plat[];
  'ice-cream': Plat[];
  pizzas: Plat[];
  porks: Plat[];
  sandwiches: Plat[];
  sausages: Plat[];
  steaks: Plat[];
  'our-foods': Plat[];

  pagination: Pagination;
}

export interface Order {
  orderId: string;
  items: Plat[];
}
