import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://development.test:8000";

export default {
  setUser(state, user) {
    state.commit("setUser", user);
  },

  removeUser(state){
    state.commit("removeUser");
  },


  setIsLoggedIn(state, payload) {
    state.commit("setLoggedIn", payload);
  },

  async loadUser(state) {
    if (localStorage.getItem("isLoggedIn") == "true") {
      try {
        axios
          .get("/sanctum/csrf-cookie")
          .then(() => {
            axios
              .get("api/user")
              .then((response) => {
                // get user data from response
                const user = response.data;

                state.commit("setUser", user);

                state.commit("setLoggedIn", true);
              })
              .catch((getUserError) => {
                console.log(getUserError);
              });
          })
          .catch((sanctumError) => {
            console.log(sanctumError);
          });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
