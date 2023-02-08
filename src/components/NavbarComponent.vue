<template>
  <div class="navbar">
    <nav>
      <div class="left">
        <div class="logo">
          <h2>Cleiary</h2>
        </div>
      </div>
      <div class="right" v-if="isLoggedin">
        <div class="navbar__icon">
          <img :src="user.photoURL" alt="" class="profile-img" />
        </div>

        <div class="navbar__icon">
          <i class="fas fa-user-friends"></i>
          <div class="submenu-holder friends-menu">
            <h3>Friends</h3>

            <div class="submenu">
              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                </div>
                <div class="user-minus-icon">
                  <i class="fa-solid fa-user-minus"></i>
                </div>
              </li>
              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                </div>
                <div class="user-minus-icon">
                  <i class="fa-solid fa-user-minus"></i>
                </div>
              </li>
              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                </div>
                <div class="user-minus-icon">
                  <i class="fa-solid fa-user-minus"></i>
                </div>
              </li>
            </div>
          </div>
        </div>

        <div class="navbar__icon">
          <i class="fas fa-bell"></i>
          <div class="badge">10</div>

          <div class="submenu-holder notification-menu">
            <h3>Notifications</h3>

            <div class="submenu">
              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                  <div class="name">Added you to a event with her friends!</div>
                </div>
              </li>

              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                </div>
                <div class="user-plus-icon">
                  <i class="fas fa-user-plus"></i>
                </div>
              </li>

              <li class="friend__item">
                <div class="friend__img">
                  <img src="@/assets/images/asd.jpg" alt="" />
                </div>
                <div class="detail">
                  <div class="name">
                    <b>aklsdla</b>
                  </div>
                  <div class="name">Added you to a event with her friends!</div>
                </div>
              </li>
            </div>
          </div>
        </div>
        <div class="navbar__icon">
          <i class="fas fa-user-plus"></i>
        </div>

        <div class="navbar__icon" @click="logout">
          <i class="fas fa-sign-out"></i>
        </div>
      </div>
      <div class="register" v-else>
        <div class="navbar__icon">
          <i class="fas fa-sign-in"></i>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedin() {
      return this.$store.getters["isLoggedin"];
    },
    user() {
      return this.$store.getters["user"];
    },
  },

  methods: {
    logout(){
      this.$store.dispatch('logout');
    }
  },
};
</script>

<style lang="scss" scoped>
.profile-img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
}
.navbar__icon:hover > .submenu-holder {
  display: block;
}
.notification-menu {
  left: -20rem;
  min-width: 25rem;
  height: auto;
  max-height: 20rem;
}
.badge {
  background-color: #b4161b;
  top: -1rem;
  border-radius: 50%;
  position: absolute;
  font-size: 0.8rem;
  width: 1.8rem;
  height: 1.8rem;
  text-align: center;
  line-height: 1.8rem;
  color: white;
}
.friends-menu {
  width: 15rem;
  left: -11rem;
}
.submenu-holder {
  padding: 0.5rem 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  position: absolute;
  z-index: 10000;
  background-color: #fff;

  border-radius: 4px;
  display: none;

  h3 {
    font-size: 1.2rem;
    border-bottom: 1px solid #000;
    padding: 0.5rem 0;
  }

  &::before {
    position: absolute;
    content: "";
    border: 0.7rem solid transparent;
    border-bottom-color: #fff;
    top: -1.2rem;
    right: 3rem;
  }
}

.submenu {
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: 2px;
  margin-top: 1rem;
  overscroll-behavior: contain;
  scrollbar-color: #242b2e transparent;
  scrollbar-width: thin;
  li {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem 0.5rem 0;
    font-size: 1rem;
    gap: 1rem;
    transition: all 0.3s ease-in;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(#5c5c5c, 0.1);
    }

    img {
      width: 3rem;
      height: 3rem;
      align-items: center;
      border-radius: 50%;
    }
  }

  .user-plus-icon:hover {
    .fa-user-plus:hover {
      color: #1faa59;
    }
  }

  .detail {
    margin-right: auto;
  }
}
.navbar {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin-bottom: 2rem;
  background-color: #cad5e2;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 7rem;
    max-width: 120rem;
    margin: auto;
  }

  &__icon {
    cursor: pointer;
    position: relative;
  }
}

.logo {
  font-size: 1.7rem;
  font-weight: bold;
  background: -webkit-linear-gradient(
    to right,
    #4e54c8,
    #8f94fb
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4e54c8,
    #8f94fb
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.right {
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 1.5rem;
  margin-left: auto;
  margin-right: 1rem;
}

.fa-user-minus:hover {
  color: #d82e2f;
}
</style>
