import axios from 'axios';
import authService from './auth-service';

class AxiosService {

  axiosInstance = {};

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: '/',
      timeout: 5000
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = authService.getToken('x-auth-user-token');

        // if (token) {
        //   config.headers.x-auth-user-token = ${token}
        // }

        return config;
      });

    return this.axiosInstance;
  }

  getInstance() {
    return this.axiosInstance || this.initInstance();
  }
}

export default new AxiosService();
