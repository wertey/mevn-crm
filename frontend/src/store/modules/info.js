import * as types from '../mutations-types';

export default {
  state: {
    info: {},
  },
  getters: {
    info: (state) => state.info,
  },
  mutations: {
    [types.SET_USER_NAME](state, user) {
      state.info = user;
    },
  },
};
