export interface Filter {
    [key: string]: any;
    yearMin: number;
    yearMax: number;
    mileageMin: number;
    mileageMax: number;
    priceMin: number;
    priceMax: number;
    fuelType: string;
    transmission: string;  
  }
  