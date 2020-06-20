import * as types from '../mutations-types';

export default {
  state: {
    categoryList: [],
  },
  getters: {
    categoryList: (state) => state.categoryList,
  },
  mutations: {
    [types.GET_CATEGORY_LIST](state, categoryList) {
      state.categoryList = categoryList;
    },
  },
};
