export type SortType = 'asc' | 'desc';
export type MileageType = 'km' | 'mi';
export type FuelType = 'Diesel' | 'Petrol';

export interface CarsAPI {
  getCars(options?: CarsRequest): Promise<CarsResponse>;
  getCar(stockNumber: number): Promise<Car>;
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
  models: { name: string }[];
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
  cars: Car[];
  totalPageCount: number;
  totalCarsCount: number;
}
