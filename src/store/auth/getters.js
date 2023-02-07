export default {
  getEvents(state) {
    return state.events;
  },
  isLoggedin(state) {
    return state.token && state.userId;
  },
};
