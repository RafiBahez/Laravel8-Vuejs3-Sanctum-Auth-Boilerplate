import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://development.test:8000";

export default {
  getIsLoggedIn(state) {
    return state.isLoggedIn;
  },

  getUser(state) {
    return state.user;
  },
};
