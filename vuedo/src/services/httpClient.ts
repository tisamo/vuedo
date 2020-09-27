import axios from 'axios-observable';

export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    "Content-Type": "application/json",
    // anything you want to add to the headers
  }
})
