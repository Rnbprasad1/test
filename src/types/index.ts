export type User = {
  id: string;
  email: string;
  role: 'admin' | 'restaurant_owner';
};

export type Restaurant = {
  id: string;
  restaurantName: string;
  location: string;
  area: string;
  isOpen: boolean;
  imageUrl: string;
  isVegOnly: boolean;
  isNonVegOnly: boolean;
  isBothVegNonVegOnly: boolean;
  ownerId: string;
};

export type FoodCategory = {
  id: string;
  name: string;
  iconURL: string;
  restaurantId: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageURL: string;
  isVeg: boolean;
  isAvailable: boolean;
  categoryId: string;
  restaurantId: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: boolean;
  unit: string;
  city: string;
  quantity: number;
  lastUpdated: string;
};