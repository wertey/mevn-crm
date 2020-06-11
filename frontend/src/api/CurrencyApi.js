import axios from 'axios';
import * as domains from './domain';

export default {
  getFixerCurrency() {
    const instWithCred = axios.create({
      baseURL: domains.FIXER_CURRENCY_SERVER,
    });
    const key = process.env.VUE_APP_FIXER;
    const url = `latest?access_key=${key}&format=1&symbols=USD,EUR,BYN,RUB`;
    return instWithCred.get(`/${url}`);
  },
};
