export interface IUser {
  _id: string
  name: string
  email: string
  address: string
  mobile: string
}

export interface IProduct {
  _id: string
  name: string
  image: string
  rating: number
  price: number
  category: string
  ingredients: string[]
  nutritions: Nutrition[]
}

interface Nutrition {
  name: string
  amount: string
}