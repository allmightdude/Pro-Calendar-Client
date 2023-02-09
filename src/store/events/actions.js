export default {
  getEvents(context , payload){
    context.commit('storeEvents' , payload.events)
  }
};
