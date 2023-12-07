export interface Car {
  [key: string]: any;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  contactName: string;
  contactNumber: number;
  price: number;
  description?: string;
  imagelink: string;
  auctionDateTime: string;
}
