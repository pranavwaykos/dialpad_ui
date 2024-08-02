import axios from "axios";

class BaseService {
    constructor(baseURL) {
      this.fetcher = axios.create({
        baseURL: baseURL,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Request interceptor
      this.fetcher.interceptors.request.use(
        config => {
          // Modify the request config before sending it
          // For example, add an authentication token
          // const token = localStorage.getItem('authToken');
          // if (token) {
          //   config.headers.Authorization = `Bearer ${token}`;
          // }
          return config;
        },
        error => {
          // Handle request error
          return Promise.reject(error);
        }
      );

      // Response interceptor
      this.fetcher.interceptors.response.use(
        response => {
          // Handle successful response
          return response.data;
        },
        error => {
          // Handle response error
          console.error('Response error:', error.response || error.message);
          return Promise.reject(error);
        }
      );
    }

    // async get(endpoint, params = {}) {
    //   try {
    //     const response = await this.fetcher.get(endpoint, { params });
    //     return response;
    //   } catch (error) {
    //     this.handleError(error);
    //   }
    // }

    // async post(endpoint, data = {}) {
    //   try {
    //     const response = await this.fetcher.post(endpoint, data);
    //     return response;
    //   } catch (error) {
    //     this.handleError(error);
    //   }
    // }

    // async put(endpoint, data = {}) {
    //   try {
    //     const response = await this.fetcher.put(endpoint, data);
    //     return response;
    //   } catch (error) {
    //     this.handleError(error);
    //   }
    // }

    // async delete(endpoint) {
    //   try {
    //     const response = await this.fetcher.delete(endpoint);
    //     return response;
    //   } catch (error) {
    //     this.handleError(error);
    //   }
    // }

    handleError(error) {
      // Handle errors here (e.g., logging, notification)
      console.error('API error:', error.response || error.message);
      throw error; // Re-throw error to be handled by calling code
    }
  }

  export default BaseService;

