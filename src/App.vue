<template>
  <router-view />
</template>

<script>
import { onAuthStateChanged } from "firebase/auth";

import { getAuth } from "firebase/auth";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const auth = getAuth();
    const store = useStore();
    const router = useRouter();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.dispatch("setUser", auth.currentUser);
        // ...
      } else {
        router.replace('/login')
      }
    });
  },
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

*,
::before,
::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  background: #f5f7fa;
  box-sizing: border-box;
  font-family: Montserrat, "sans-serif";
  color: #51565d;
  font-size: 1.5rem;
}

ul,
li {
  list-style: none;
}

.mt-1 {
  margin-top: 1rem;
}
.mt-2 {
  margin-top: 2rem;
}
.mt-3 {
  margin-top: 3rem;
}
.mt-4 {
  margin-top: 4rem;
}

.d-flex {
  display: flex;
}
</style>
