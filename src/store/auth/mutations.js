export default {
  storeEvents(state, events) {
    state.events = events;
  },
  setUser(state, payload) {
    state.userId = payload.id;
    state.token = payload.token;
  },
};
