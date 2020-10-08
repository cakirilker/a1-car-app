import axios, { AxiosResponse } from 'axios';
import {
  CarsRequest,
  CarsResponse,
  Manufacturer,
} from '../constants/interfaces';

const client = axios.create({
  baseURL: 'https://auto1-mock-server.herokuapp.com/api/',
});

const api = {
  getCars: (options: CarsRequest = { page: 1, sort: 'asc' }) =>
    client
      .get('/cars', { params: options })
      .then((response: AxiosResponse<CarsResponse>) => response.data),

  getColors: () =>
    client
      .get('/colors')
      .then(
        (response: AxiosResponse<{ colors: Array<string> }>) => response.data,
      ),

  getManufacturers: () =>
    client
      .get('/manufacturers')
      .then(
        (response: AxiosResponse<{ manufacturers: Array<Manufacturer> }>) =>
          response.data,
      ),
};
export default api;
