export interface Car {
  [key: string]: any;
  brand: string;
  model: string;
  year: number;
  mileAge: number;
  fuelType: string;
  transmission: string;
  contactName: string;
  contactNumber: number;
  price: number;
  description?: string;
  imagelink?: Uint8Array | null;
  auctionDateTime: Date;
}
