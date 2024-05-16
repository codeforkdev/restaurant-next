

export type Dish = {
  id: number;
  name: string
  price: number;
  category: { id: number, name: string } | null
  status: string
  description: string | null
}
