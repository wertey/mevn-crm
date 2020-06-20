import axios from 'axios';
import * as domains from './domain';

export default {
  addNewCategory(category) {
    console.log('category', category);
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.post('/newCategory', category);
  },
  changeCategory(oldname, name, limit) {
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.patch(`editCategory/${oldname}`, { oldname, name, limit });
  },
  getCategoryList() {
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.get('/getCategoryList');
  },
};
