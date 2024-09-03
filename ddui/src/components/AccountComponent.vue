<template>
    <div class="account-container">
      <h1 class="title">Accounts</h1>
  
      <!-- Form to add/update an account -->
      <form @submit.prevent="saveAccount">
        <input v-model="currentAccount.AccId" type="hidden" />
        <label for="AccountNumber">Account Number:</label>
        <input v-model="currentAccount.AccountNumber" type="text" id="AccountNumber" required />
        <label for="AccountStatus_id">Account Status ID:</label>
        <input v-model="currentAccount.AccountStatus_id" type="number" id="AccountStatus_id" required />
        <label for="CreatedDate">Created Date:</label>
        <input v-model="currentAccount.CreatedDate" type="date" id="CreatedDate" />
        <label for="CreatedBy">Created By:</label>
        <input v-model="currentAccount.CreatedBy" type="text" id="CreatedBy" />
        <label for="UpdatedDate">Updated Date:</label>
        <input v-model="currentAccount.UpdatedDate" type="date" id="UpdatedDate" />
        <label for="UpdatedBy">Updated By:</label>
        <input v-model="currentAccount.UpdatedBy" type="text" id="UpdatedBy" />
        <button type="submit">{{ isEdit ? 'Update' : 'Add' }} Account</button>
      </form>
  
      <!-- Table to display accounts -->
      <table class="account-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Account Number</th>
            <th>Account Status ID</th>
            <th>Created Date</th>
            <th>Created By</th>
            <th>Updated Date</th>
            <th>Updated By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.AccId">
            <td>{{ account.AccId }}</td>
            <td>{{ account.AccountNumber }}</td>
            <td>{{ account.AccountStatus_id }}</td>
            <td>{{ new Date(account.CreatedDate).toLocaleDateString() }}</td>
            <td>{{ account.CreatedBy }}</td>
            <td>{{ new Date(account.UpdatedDate).toLocaleDateString() }}</td>
            <td>{{ account.UpdatedBy }}</td>
            <td>
              <button @click="editAccount(account)">Edit</button>
              <button @click="deleteAccount(account.AccId)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import api from '../APIs/Accountapi'; // Adjust the import path if needed
  
  export default {
    data() {
      return {
        accounts: [],
        currentAccount: {},
        isEdit: false,
      };
    },
    methods: {
      async fetchAccounts() {
        try {
          const response = await api.get('/');
          this.accounts = response.data;
        } catch (error) {
          console.error('Failed to load accounts:', error);
        }
      },
      async saveAccount() {
        try {
          if (this.isEdit) {
            await api.put(`/${this.currentAccount.AccId}`, this.currentAccount);
          } else {
            await api.post('/', this.currentAccount);
          }
          this.fetchAccounts();
          this.currentAccount = {};
          this.isEdit = false;
        } catch (error) {
          console.error('Failed to save account:', error);
        }
      },
      async deleteAccount(id) {
        try {
          await api.delete(`/${id}`);
          this.fetchAccounts();
        } catch (error) {
          console.error('Failed to delete account:', error);
        }
      },
      editAccount(account) {
        this.currentAccount = { ...account };
        this.isEdit = true;
      },
    },
    created() {
      this.fetchAccounts();
    },
  };
  </script>
  
  <style scoped>
  .account-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .title {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .account-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .account-table th,
  .account-table td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .account-table th {
    background-color: #f4f4f4;
    color: #333;
  }
  
  .account-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  form {
    margin-bottom: 20px;
  }
  
  form label {
    display: block;
    margin-top: 10px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  