<template>
  <div class="lookup-container">
    <h1 class="title">Lookups</h1>
    
    <!-- Table to display lookups -->
    <table class="lookup-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Description</th>
          <th>Active</th>
          <th>Created By</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lookup in paginatedLookups" :key="lookup.lookup_id">
          <td>{{ lookup.lookup_id }}</td>
          <td>{{ lookup.lookup_type }}</td>
          <td>{{ lookup.lookup_desc }}</td>
          <td>{{ lookup.is_active }}</td>
          <td>{{ lookup.createdby }}</td>
          <td>{{ new Date(lookup.createdDATE).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Pagination controls -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage <= 1" class="pagination-button">Previous</button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages" class="pagination-button">Next</button>
    </div>
  </div>
</template>

<script>
import api from '../APIs/Lookupapi'; // Adjust the import path if needed

export default {
  data() {
    return {
      lookups: [],
      currentPage: 1,
      pageSize: 10, // Number of items per page
    };
  },
  computed: {
    paginatedLookups() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.lookups.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.lookups.length / this.pageSize);
    },
  },
  methods: {
    async fetchLookups() {
      try {
        const response = await api.get('/');
        this.lookups = response.data;
      } catch (error) {
        console.error('Failed to load lookups:', error);
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
  created() {
    this.fetchLookups();
  },
};
</script>

<style scoped>
.lookup-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.lookup-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.lookup-table th,
.lookup-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.lookup-table th {
  background-color: #f4f4f4;
  color: #333;
}

.lookup-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.pagination-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.pagination-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 16px;
}
</style>
