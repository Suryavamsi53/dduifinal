// import axios from 'axios';

// // Create an axios instance with default configuration
// const apiClient = axios.create({
//   baseURL: 'http://localhost:5097/LookupService.svc', // Ensure this matches your WCF service base URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default {
//   // Function to get all lookups
//   async getLookups() {
//     try {
//       const response = await apiClient.get('/GetLookups');
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching lookups:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   },

//   // Function to get a specific lookup by ID
//   async getLookup(id) {
//     try {
//       const response = await apiClient.get(`/GetLookup/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error fetching lookup with ID ${id}:`, error.response ? error.response.data : error.message);
//       throw error;
//     }
//   },

//   // Function to add a new lookup
//   async addLookup(lookup) {
//     try {
//       const response = await apiClient.post('/AddLookup', lookup);
//       return response.data;
//     } catch (error) {
//       console.error('Error adding lookup:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   },

//   // Function to update an existing lookup
//   async updateLookup(lookup) {
//     try {
//       const response = await apiClient.put('/UpdateLookup', lookup);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating lookup:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   },

//   // Function to delete a lookup
//   async deleteLookup(id) {
//     try {
//       const response = await apiClient.delete(`/DeleteLookup/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error(`Error deleting lookup with ID ${id}:`, error.response ? error.response.data : error.message);
//       throw error;
//     }
//   },
// };import api from '../api';
// Import the Axios instance
// import axios from 'axios';

// // Create the Axios instance with the base URL and timeout
// const api = axios.create({
//   baseURL: 'http://localhost:5113/api/lookup', // Replace with your API base URL
//   timeout: 10000, // Optional: request timeout in milliseconds
// });

// // Exported functions for interacting with the Lookup API
// export const getAllLookups = () => {
//   return api.get('/lookup');
// };


// export const getLookupById = (id) => {
//   return api.get(`/lookup/${id}`);
// };

// export const addLookup = (lookup) => {
//   return api.post('/lookup', lookup);
// };

// export const updateLookup = (id, lookup) => {
//   return api.put(`/lookup/${id}`, lookup);
// };

// export const deleteLookup = (id) => {
//   return api.delete(`/lookup/${id}`);
// };

// // Default export of the API instance if needed elsewhere
// export default api;





import axios from 'axios';

// Create an Axios instance with the base URL and timeout
const api = axios.create({
  baseURL: 'http://localhost:5113/api/lookup',
  timeout: 10000,
});

// Exported functions for interacting with the Lookup API
export const getAllLookups = () => api.get('/');
export const getLookupById = (id) => api.get(`/${id}`);
export const addLookup = (lookup) => api.post('/', lookup);
export const updateLookup = (id, lookup) => api.put(`/${id}`, lookup);
export const deleteLookup = (id) => api.delete(`/${id}`);

export default api;
