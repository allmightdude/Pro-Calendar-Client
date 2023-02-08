import { getAuth } from "firebase/auth";
const auth = getAuth();
export default {
  getEvents(context, payload) {
    context.commit("storeEvents", payload.events);
    console.log(payload.events);
  },
  setUser(context, payload) {
    context.commit("setUser", payload);
  },
  async logout(context){
    await auth.signOut();
    context.commit("setUser" , null);
  }
};
