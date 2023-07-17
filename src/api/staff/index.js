import axios from "axios";
import { applyPagination } from "src/utils/apply-pagination";
import { applySort } from "src/utils/apply-sort";
class StaffApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getStaff(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    let data = null;
    try {
      const response = await axios.get(`${this.baseUrl}/user/staff`);
      data = response.data.filter((customer) => customer.is_deleted !== true);
    } catch (error) {
      console.error("Error while fetching staff:", error);
      window.location.href = "/500";
      return null;
    }
    let count = data.length;

    if (typeof filters !== "undefined") {
      data = data.filter((user) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties = ["email", "first_name", "last_name"];

          properties.forEach((property) => {
            if (user[property].toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.role !== "undefined") {
          if (user.role !== filters.role) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== "undefined" && typeof sortDir !== "undefined") {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  async getStaffById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while fetching staff with ID ${id}:`, error);
      return null;
    }
  }

  async createStaff(newStaff) {
    try {
      const response = await axios.post(`${this.baseUrl}/user/register`, newStaff);
      return response.data;
    } catch (error) {
      console.error("Error while creating staff:", error);
      return null;
    }
  }

  async updateStaffById(updateStaff) {
    try {
      const response = await axios.patch(`${this.baseUrl}/user/`, updateStaff);
      return response.data;
    } catch (error) {
      console.error(`Error while updating staff:`, error);
      return null;
    }
  }

  async deleteStaffById(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/user/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error while deleting staff with ID ${id}:`, error);
      return false;
    }
  }
}

const staffApi = new StaffApi("http://localhost:8081");

export default staffApi;
