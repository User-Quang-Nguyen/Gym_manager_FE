import { applyPagination } from 'src/utils/apply-pagination';
import { deepCopy } from 'src/utils/deep-copy';

class EquipmentsApi {
  getEquipments(request = {}) {
    const { filters, page, rowsPerPage } = request;

    let data = deepCopy(equipments);
    let count = data.length;

    if (typeof filters !== 'undefined') {
      data = data.filter((equipment) => {
        if (typeof filters.name !== 'undefined' && filters.name !== '') {
          const nameMatched = equipment.name.toLowerCase().includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple category options
        if (typeof filters.category !== 'undefined' && filters.category.length > 0) {
          const categoryMatched = filters.category.includes(equipment.category);

          if (!categoryMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (typeof filters.status !== 'undefined' && filters.status.length > 0) {
          const statusMatched = filters.status.includes(equipment.status);

          if (!statusMatched) {
            return false;
          }
        }

        // Present only if filter required
        if (typeof filters.inStock !== 'undefined') {
          const stockMatched = equipment.inStock === filters.inStock;

          if (!stockMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count
    });
  }
}

export const equipmentsApi = new EquipmentsApi();
