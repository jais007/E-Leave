import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
  getAllEmployee(){
    return axios.get(API_URL + 'admin/employees', { headers: authHeader() })
  }
  activateAccount(empId){
    return axios.put(API_URL + 'admin/employees/' + empId , { headers: authHeader() });
  }

  deleteEmployee(empId){
    return axios.delete(API_URL + 'admin/employees/' + empId);
  }
 
}

export default new UserService();
