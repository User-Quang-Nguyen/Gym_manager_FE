import axios from 'axios';
import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
class PackagesApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPackages(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/package/`);
      data = response.data;
    } catch (error) {
      console.error('Error while fetching packages:', error);
      return [];
    }
    data = deepCopy(data);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((user) => {
        if (typeof filters.query !== 'undefined' && filters.query !== '') {
          let queryMatched = false;
          const properties = ['email', 'name'];

          properties.forEach((property) => {
            if ((user[property]).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.member !== 'undefined') {
          if (user.role !== filters.member) {
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

  async getPackageById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/package/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching package with ID ${id}:`, error);
      return null;
    }
  }

  async createPackage(newPackage) {
    try {
      const response = await axios.post(`${this.baseUrl}/package`, newPackage);
      return response.data;
    } catch (error) {
      console.error('Error while creating package:', error);
      return null;
    }
  }

  async updatePackageById(id, updatedPackage) {
    try {
      const response = await axios.patch(`${this.baseUrl}/package/${id}`, updatedPackage);
      return response.data;
    } catch (error) {
      console.error(`Error while updating package with ID ${id}:`, error);
      return null;
    }
  }

  async deletePackageById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/package/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting package with ID ${id}:`, error);
      return false;
    }
  }
}

const packagesApi = new PackagesApi('http://localhost:8081');

export default packagesApi;
