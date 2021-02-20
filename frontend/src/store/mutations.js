export default{
    setUser(state, payload) {
        state.user = payload;
    },
    removeUser(state){
        state.user = null;
    },
    setLoggedIn(state, payload) {
        state.isLoggedIn = payload;
    }
}