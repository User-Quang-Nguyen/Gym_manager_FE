import axios from 'axios';
import { deepCopy } from 'src/utils/deep-copy';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';

class RegistersApi {

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getRegisters(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/register/`);

      data =  response.data;
    } catch (error) {
      console.error('Error while fetching registers:', error);
      return [];
    }
    data = deepCopy(data);

    data = applySort(data, 'created_at', 'desc');
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((register) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          // Checks only the register number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (register.customer_name || '')
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!containsQuery) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }

  async getRegisterById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/register/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching register with ID ${id}:`, error);
      return null;
    }
  }

  async createRegister(newRegister) {
    try {
      const response = await axios.post(`${this.baseUrl}/register`, newRegister);
      return response.data;
    } catch (error) {
      console.error('Error while creating register:', error);
      return null;
    }
  }

  async updateRegisterById(id, updatedRegister) {
    try {
      const response = await axios.put(`${this.baseUrl}/register/${id}`, updatedRegister);
      return response.data;
    } catch (error) {
      console.error(`Error while updating register with ID ${id}:`, error);
      return null;
    }
  }

  async deleteRegisterById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/register/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting register with ID ${id}:`, error);
      return false;
    }
  }
}

const registersApi = new RegistersApi('http://localhost:8081');

export default registersApi;

