let timer;

export default {
  getEvents(context, payload) {
    context.commit("storeEvents", payload.events);
    console.log(payload.events);
  },
  setUser(context, payload) {
    context.commit("setUser", payload);
  }
};
