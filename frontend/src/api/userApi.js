import axios from 'axios';
import * as domains from './domain';


export default {
  sendSignUp(user) {
    console.log('user', user);
    const instWithCred = axios.create({
      baseURL: domains.AUTH_REQUESTS,
    });
    return instWithCred.post('/', user);
  },
  sendLogin(email, password) {
    const token = JSON.parse(localStorage.getItem('token'));
    const instWithCred = axios.create({
      baseURL: domains.USER_LOG_IN,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return instWithCred.post('login', { email, password });
  },
  updateUserName(oldName, newName) {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('oldName', oldName);
    console.log('name', newName);
    const instWithCred = axios.create({
      baseURL: domains.USER_UPDATE_NAME,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return instWithCred.patch(`updateName/${oldName}`, { newName });
  },
};
