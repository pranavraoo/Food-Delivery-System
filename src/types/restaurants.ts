export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isVeg: boolean;
}

export interface Restaurant {
  id: string;
  name: string;            
  cuisine: string;         
  apiCategory: string;
  rating: number;
  deliveryTime: string;
  menu: MenuItem[];
}
