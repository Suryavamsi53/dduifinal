import axios from 'axios';

// Create an Axios instance with the base URL of your API
const api = axios.create({
  baseURL: 'http://localhost:5113/api/account', // Update with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all accounts
export const getAllAccounts = () => {
  return api.get('/');
};

// Fetch a single account by ID
export const getAccountById = (id) => {
  return api.get(`/${id}`);
};

// Create a new account
export const createAccount = (account) => {
  return api.post('/', account);
};

// Update an existing account
export const updateAccount = (id, account) => {
  return api.put(`/${id}`, account);
};

// Delete an account by ID
export const deleteAccount = (id) => {
  return api.delete(`/${id}`);
};

export default {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};
