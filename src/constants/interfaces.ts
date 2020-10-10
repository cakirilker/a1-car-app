export type SortType = 'asc' | 'desc';
export type MileageType = 'km' | 'mi';
export type FuelType = 'Diesel' | 'Petrol';

export interface Auto1API {
  getCars(options?: CarsRequest): Promise<CarsResponse>;
  getColors(): Promise<string[]>;
  getManufacturers(): Promise<Manufacturer[]>;
}

export interface CarsRequest {
  page?: number;
  manufacturer?: string;
  color?: string;
  sort?: SortType;
}

export interface Mileage {
  number: number;
  unit: MileageType;
}

export interface Manufacturer {
  name: string;
  models: Array<{ name: string }>;
}

export interface Car {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: Mileage;
  fuelType: FuelType;
  color: string;
  pictureUrl: string;
}

export interface CarsResponse {
  cars: Array<Car>;
  totalPageCount: number;
  totalCarsCount: number;
}
