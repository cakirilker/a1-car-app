import axios, { AxiosResponse } from 'axios';
import { CarsRequest, CarsResponse } from '../constants/interfaces';

const client = axios.create({
  baseURL: 'https://auto1-mock-server.herokuapp.com/api/',
});

const api = {
  getCars: (options: CarsRequest = { page: 1, sort: 'asc' }) =>
    client
      .get('/cars', { params: options })
      .then((response: AxiosResponse<CarsResponse>) => response.data),
};
export default api;
