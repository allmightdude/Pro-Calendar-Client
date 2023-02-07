<template>
  <div class="form">
    <FormKit
      type="form"
      id="registration-example"
      :form-class="submitted ? 'hide' : 'show'"
      submit-label="Register"
      @submit="submitHandler"
      :actions="false"
    >
      <h1>Register!</h1>

      <FormKit
        type="email"
        name="email"
        label="E-Mail"
        placeholder="test@gmail.com"
        help="What's your Email?"
        validation="required|email"
      />
      <FormKit
        type="text"
        name="name"
        label="Your Name"
        placeholder="Farid Sabzi"
        help="What's your nickname or name?"
        validation="required"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|length:6|matches:/[^a-zA-Z]/"
        :validation-messages="{
          matches: 'Please include at least one symbol',
        }"
        placeholder="Your password"
        help="Choose a password"
      />

      <FormKit
        type="file"
        label="Drivers license"
        name="license"
        help="Please add a scan of your driver’s license"
        accept=".jpg,.png,.pdf"
        validation="required"
        multiple="false"
      />

      <FormKit type="submit" label="Register" />
    </FormKit>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>

<script>
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { uuid } from "vue-uuid";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const store = useStore();


    const submitHandler = async (data) => {
      const body = new FormData();
      const imageName = uuid.v4();
      const storage = getStorage();

      const storageRef = ref(storage, `images/${imageName}`);
      const snapshot = await uploadBytes(storageRef, data.license[0].file);
      const url = await getDownloadURL(snapshot.ref);

      body.append("email", data.email);
      body.append("name", data.name);
      body.append("password", data.password);
      body.append("photo", url);

      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        await updateProfile(user, { displayName: data.name, photoURL: url });

        store.dispatch("login", {
          id: user.uid,
          token: user.accessToken,
          tokenExpiration: user.stsTokenManager.expirationTime
        });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      submitHandler,
    };
  },
};
// import { ref } from 'vue';
//
//     const submitted = ref(false);

//     const submitHandler = async () => {
//       // Let's pretend this is an ajax request:
//       await new Promise((r) => setTimeout(r, 1000));
//       submitted.value = true;
//     };
//   },
</script>

<style lang="scss" scoped>
.form {
  width: 420px;
  padding: 1.5em;
  border: 1px solid #e4e4e4;
  border-radius: 1em;
  margin: 10rem auto 1em auto;
}

button {
  background-color: #5da3fa !important;
}
</style>
