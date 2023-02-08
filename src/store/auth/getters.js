export default {
  getEvents(state) {
    return state.events;
  },
  isLoggedin(state) {
    return !!state.user;
  },
  user(state){
    return state.user
  }
};
