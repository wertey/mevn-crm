import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import store from '../store/index';
import * as domains from './domain';

export default {
  addNewCategory(id, category) {
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.post('/newCategory', { id, category });
  },
  changeCategory(categoryId, name, limit) {
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.patch(`editCategory/${categoryId}`, { name, limit });
  },
  getCategoryList() {
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.get('/getCategoryList');
  },
};
