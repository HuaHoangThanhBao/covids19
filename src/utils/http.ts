import axios, { AxiosInstance } from 'axios'
import { baseURL, baseCountryURL } from '../constants'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: 10000
    })
  }
}

class HttpCountry {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: baseCountryURL,
      timeout: 10000
    })
  }
}

export const http = new Http().instance
export const httpCountry = new HttpCountry().instance
