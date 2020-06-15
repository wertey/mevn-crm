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
  changeCategory(id, category) {
    console.log('category', category);
    const instWithCred = axios.create({
      baseURL: domains.CATEGORY_REQUEST,
    });
    return instWithCred.patch(`contacts/${id}`, { category });
  },
};
