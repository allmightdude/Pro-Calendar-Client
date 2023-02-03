<template>
  <div class="backdrop" v-if="show" @click="close">
    <div class="close" @click="close">
      <i class="fa fa-times"></i>
    </div>
  </div>
  <div class="event" v-if="show" open>
    <base-card>
      <h2 class="event__title">
        {{ event.value.name }}

        <button class="checkEvent">Check</button>
      </h2>
      <div class="actions mt-1">
        <span>
          <i class="fa fa-trash"></i>
        </span>
        <span>
          <i class="fa fa-edit"></i>
        </span>
      </div>
      <hr />
      <p class="event__description mt-1">
        {{ event.value.details }}
      </p>

      <div class="date mt-3">
        <b>Date</b> : <span>{{ event.value.start }}</span>
      </div>

      <h4 class="mt-2">Friends Added to event</h4>
      <div class="event__friends mt-1">
        <div class="event__friends-item">
          <div class="event__friends-img">
            <img src="@/assets/images/ErnestHemingway.jpg" alt="" />
          </div>
        </div>

        <div class="event__friends-item"></div>
        <div class="event__friends-img">
          <img src="@/assets/images/asd.jpg" alt="" />
        </div>
        <div class="event__friends-item">
          <div class="event__friends-img">
            <img src="@/assets/images/images.jpg" alt="" />
          </div>
        </div>
        <div class="event__friends-item">
          <div class="event__friends-img">
            <img src="@/assets/images/images3.jpg" alt="" />
          </div>
        </div>
        <div class="event__friends-item">
          <div class="event__friends-img">
            <img src="@/assets/images/imageser.jpg" alt="" />
          </div>
        </div>

        <div class="event__friends-item">
          <div class="event__friends-plus">
            <i class="fa fa-plus"></i>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>
<script>
export default {
  props: ["show", "event"],
  emits: ["close"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
html {
  overflow: hidden;
}
.backdrop {
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}
.event {
  text-align: left;
  &__friends {
    display: flex;
    align-items: center;
    &-img {
      width: 4rem;
      height: 4rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        border: 3px solid #fff;
        box-sizing: content-box;
      }
    }
  }

  &__friends-item {
    margin-left: -1rem;
    &:nth-child(1) {
      margin: 0;
    }
  }

  &__friends-plus {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #120e43;
    font-size: 0.7rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
p {
  font-size: 1.2rem;
  line-height: 1.4;
  color: #929292;
}

.date {
  font-size: 1.2rem;

  span {
    background-color: #edc126;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    color: white;
    letter-spacing: 0.5px;
    position: relative;
    font-size: 1.5rem;

    &::before{
      position: absolute;
      content: 'yyyy-mm-dddd';
      top: -1.5rem;
      color: #929292;
      font-size: 1rem;;
    }
  }
}

h4 {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    background-color: #edc126;
    left: -0.5rem;
  }
}

.actions {
  display: flex;
  gap: 0.5rem;
  cursor: pointer;
}

.fa-trash {
  color: #d82e2f;
}

.close {
  background-color: #e5d68a;
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  line-height: 2rem;
  color: white;
  border: 1px solid #f4be2c;
}
.fa-edit {
  color: #66ad47;
  background-color: grey;
}
.checkEvent {
  border: 1px solid #22cb5c;
  background-color: transparent;
  color: #22cb5c;
  border-radius: 50px;
  padding: 0.2rem 1rem;
  float: right;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #22cb5c;
    transform-origin: bottom left;
    transform: rotate(-90deg);
    transition: transform 0.5s;
    z-index: -1;
    color: white;
  }

  &:hover::after {
    transform: rotate(0deg);
  }

  &:hover {
    color: white;
  }
}

.event-enter-from {
  transform: translateY(-30px);
  opacity: 0;
  z-index: 100;
}
.event-enter-active {
  transition: 1s all ease;
}
.event-enter-to {
  transform: translateY(0);

  opacity: 1;
}
</style>
